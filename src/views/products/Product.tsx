import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

let initialProducts: Product[] = [
  {
    name: "Mercedes",
    description: "Luxury car",
    price: 100000,
    image:
      "https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg",
    id: "1",
  },
  {
    name: "BMW",
    description: "Luxury car",
    price: 100000,
    image:
      "https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg",
    id: "2",
  },
  {
    name: "Lamborghini",
    description: "Luxury car",
    price: 100000,
    image:
      "https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg",
    id: "3",
  },
];

const axiosInstance = axios.create({
  baseURL: "http://localhost:5025",
  headers: {
    "Content-Type": "application/json", // Set your desired headers
  },
});
const headerStyle = { fontWeight: 600 };

export default function Products() {
  const [product, setProduct] = useState<Product>();

  const params = useParams();

  const loadProduct = () => {
    axiosInstance
      .get<Product>(`/api/product/${params.id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        const foundProduct = initialProducts.find(
          (prod) => prod.id === params.id
        );
        if (foundProduct) setProduct(foundProduct);
      });
  };

  useEffect(loadProduct, []);

  if (!product) {
    return (
      <Box>
        <Typography color="red" variant="subtitle1" fontWeight={600}>
          Product not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <img
        alt="sell"
        src={product.image}
        style={{ width: "100%", display: "block", objectFit: "cover", height: '500px' }}
      />
      <header style={headerStyle}>{product.name}</header>

      <Typography variant="subtitle2" fontWeight={600}>
       Price: {product.price}
      </Typography>
      {product.description && (
        <Typography variant="body2" color="text.secondary">
         {product.description}
        </Typography>
      )}
    </Box>
  );
}
