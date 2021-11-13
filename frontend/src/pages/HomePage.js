import { Flex, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from '../components/Product';
import axios from 'axios';

const HomePage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        }

        fetchProducts();
    }, []);

    return (
        <Container maxW="container.xl">
            <Flex flexWrap="wrap" justify="space-between" mx="auto">
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </Flex>
        </Container>
    )
}

export default HomePage;
