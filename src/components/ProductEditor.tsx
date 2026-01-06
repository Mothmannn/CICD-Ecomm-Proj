import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../firestore/productService";
import NavBar from "./NavBar";

interface Product {
  id?: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const emptyProduct: Product = {
  id:"",
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
};

export default function ProductEditor() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      const all = await getAllProducts();
      setProducts(all ?? []);
    } catch (err) {
      console.error("Failed to load products", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await getAllProducts();
        if (mounted) setProducts(all ?? []);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateProduct(editingId, formData);
    } else {
      await createProduct(formData);
    }
    setFormData(emptyProduct);
    setEditingId(null);
    await loadProducts();
  };

  return (
    <Container className="py-4">
      <NavBar />
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                {editingId ? "Edit Product" : "Add Product"}
              </Card.Title>

              <Form>
                {["title", "image", "category"].map((field) => (
                  <Form.Group className="mb-2" key={field}>
                    <Form.Control
                      name={field}
                      placeholder={field}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      value={(formData as any)[field]}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ))}

                <Form.Group className="mb-2">
                  <Form.Control
                    name="price"
                    type="number"
                    placeholder="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className="w-100" onClick={handleSubmit}>
                  {editingId ? "Update" : "Create"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Row>
            {products.map((p) => (
              <Col md={6} key={p.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <h6>{p.title}</h6>
                    <p>${p.price}</p>

                    <Button
                      size="sm"
                      variant="secondary"
                      className="me-2"
                      onClick={() => {
                        setFormData(p);
                        setEditingId(p.id!);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={async () => {
                        await deleteProduct(p.id!);
                        await loadProducts();
                      }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
