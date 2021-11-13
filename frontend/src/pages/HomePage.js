import products from '../products';
import { Flex, Container } from "@chakra-ui/react";
import Product from '../components/Product';

const HomePage = () => {
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
