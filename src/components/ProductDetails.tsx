import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../models/Product.model";

const fetchProduct = async (id: number): Promise<Product> => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data as Product;
};

const ProductDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = id ? Number(id) : undefined;
  const navigate = useNavigate();
  const handleToCart = () => navigate("/cart");
  

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId as number),
    enabled: !!productId,
  });

  if (isProductLoading) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: "15px" }}
            role="status"
          />
          Loading Product...
        </h3>
      </Container>
    );
  }

  if (isProductError) return <p>Error loading product</p>;

  return (
    <Container className="mt-4">
      {product ? (
        <>
          <h1>{product.title}</h1>
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid mx-auto d-block mb-4 border p-4"
          />
          <Row className="w-75 mx-auto">
            <Col>
              <p
                className="mt-2 text-center lead"
                style={{ fontFamily: "Arial" }}
              >
                {product.description}
              </p>
              <p className="text-center" style={{ fontFamily: "Arial" }}>
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-center " style={{ fontFamily: "Arial" }}>
                <strong>Price:</strong> ${product.price}
              </p>
            </Col>
          </Row>
          <Row className="pb-4 pt-4 border-top shadow-sm">
            <Col className="text-center">
              <Button variant="primary" className="m-2" onClick={handleToCart}>
                Add to Cart
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </Container>
  );
};

export default ProductDetails;
