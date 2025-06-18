import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Divider, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import PhoneIcon from '@mui/icons-material/Phone';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const initialProducts: Product[] = [
  {
    name: "Mercedes",
    description: "Luxury car",
    price: 100000,
    image: "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202108/Mercedes-AMG_GLE_63_S_4Matic_f-x675.jpg?kv4Bg1gOP4fv9efHCjkbgi80orUczNG.?size=750:*",
    id: "1",
  },
  {
    name: "BMW",
    description: "Luxury car",
    price: 100000,
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg",
    id: "2",
  },
  {
    name: "Lamborghini",
    description: "Luxury car",
    price: 100000,
    image: "https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg",
    id: "3",
  },
];

const axiosInstance = axios.create({
  baseURL: "http://localhost:5025",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function Products() {
  const [product, setProduct] = useState<Product>();
  const params = useParams();

  useEffect(() => {
    axiosInstance
      .get<Product>(`/api/product/${params.id}`)
      .then((res) => setProduct(res.data))
      .catch(() => {
        const fallback = initialProducts.find(p => p.id === params.id);
        if (fallback) setProduct(fallback);
      });
  }, []);

  if (!product) {
    return (
      <Box p={4}>
        <Typography color="error" variant="h6">
          Product not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" mx="auto" mt={4}>
      <Card>
        <img
          alt={product.name}
          src={product.image}
          style={{ width: "100%", height: "400px", objectFit: "cover", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="h6" color="primary" fontWeight={700} gutterBottom>
            ${product.price.toLocaleString()}
          </Typography>

          {product.description && (
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Box display="flex" alignItems="center" gap={1}>
            <PhoneIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              Get In Touch:{" "}
              <Link href="tel:+01-4161767762" underline="hover">
                01-4161767762
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
