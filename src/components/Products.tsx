//import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
//import type { Product } from "../models/Product.model";
import { addToCart } from "../redux/CartActionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllProducts } from "../firestore/productService";

interface ProductsProps {
  filterCategory?:string;
}

/* const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
}; */



const Products: React.FC<ProductsProps> = ({  filterCategory }) => {
  /* const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  }); */

  const { data, isLoading, error } = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
  });
 
  const products = data ?? [];
  const filtered = filterCategory === "" ? products : products.filter((p) => p.category === filterCategory);


  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  console.log(cartItems);

  if (isLoading) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: "15px" }}
            role="status"
          />
          Loading Products...
        </h3>
      </Container>
    );

    
  }

  if (error) return <p>Error loading posts</p>;

  return (
    <Container>
      <h1 className="text-center mt-5" style={{ fontFamily: "Arial" }}>
        Products
      </h1>
      <p className="text-center">Choose from a variety of stylish products</p>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
        {filtered?.map((product) => (
          <Col key={product.id} className="d-flex align-items-stretch">
            <Card className="d-flex flex-column">
              <Card.Body className="d-flex flex-column flex-grow-1 shadow">
                <Card.Title className="text-center">{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  {product.category}
                </Card.Subtitle>
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                

                <Button
                  //href={`/productdetails/${product.id}`}
                  variant="primary"
                  className="mt-auto d-block mx-auto"
                  onClick={()=>
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                      })
                    )
                  }
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
