import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5025",
  headers: {
    "Content-Type": "application/json" // Set your desired headers
  }
});


let initialProducts: Product[] = [
  {
    name: 'Mercedes',
    description: 'Luxury car',
    price: 100000,
    image: 'https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg',
    id: '1'
  },
  {
    name: 'BMW',
    description: 'Luxury car',
    price: 100000,
    image: 'https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg',
    id: '2'
  },
  {
    name: 'Lamborghini',
    description: 'Luxury car',
    price: 100000,
    image: 'https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg',
    id: '3'
  }
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate()

  const loadProducts = () => {
    axiosInstance.get<Product[]>("/api/products").then((res) => setProducts(res.data)).catch(err => console.log(err));
  };

  useEffect(loadProducts, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    await axiosInstance.post<Product>("/api/products", {
      name,
      description,
      image,
      price,
    }).catch(err => console.log(err));
    setName("");
    setDescription("");
    setImage("");
    setPrice("");
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    await axiosInstance.delete(`/api/products/${id}`).catch(err => console.log(err));
    loadProducts();
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Create form */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
        />
        <Button variant="contained" onClick={handleAdd} disabled={!name.trim()}>
          Add Product
        </Button>
      </Box>
      {/* Products list */}
      <List>
        {products.map((product) => (
          <ListItem
            key={product.id}
            sx={{ border: "1px solid #eee", borderRadius: 1, mb: 2 }}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(product.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Box onClick={() => navigate(`/products/${product.id}`)}>
              <img
                alt="sell"
                src="/images/sell.jpg"
                style={{ width: "100%", display: "block" }}
              />
              <Typography variant="subtitle1" fontWeight={600}>
                {product.name}
              </Typography>

              <Typography variant="subtitle2" fontWeight={600}>
                {product.price}
              </Typography>
              {product.description && (
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
