import { Box, VStack, Flex, Heading, Text, Container, Image, Button, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import products from "../products";
import { Link as ReactRouterLink } from "react-router-dom";
import Rating from "../components/Rating";

const ProductDetailsPage = () => {

    const { id } = useParams();
    const product = products.find(p => p._id === id);

    return (
        <Container maxW="container.xl">
            <Button as={ReactRouterLink} to={"/"} leftIcon={<i class="fa-solid fa-arrow-left"></i>} mt={7}>GO BACK</Button>
            <Flex direction={{ base: "column", lg: "row" }} alignItems={{ base: "center", lg: "flex-start" }} my={7}>
                <Image src={product.image} boxSize={{ base: "400px", lg: "100%" }} flex={{ lg: "1" }} />
                <Flex flex={{ lg: "1" }}>
                    <VStack maxW={{ base: "400px", lg: "500px" }} alignItems="flex-start" mx={{ lg: "auto" }}>
                        <Heading >{product.name}</Heading>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <Table variant="simple">
                            <Tbody>
                                <Tr>
                                    <Td>Price</Td>
                                    <Td>$ {product.price}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Stock</Td>
                                    <Td>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        <Button isDisabled={product.countInStock < 1}>ADD TO CART</Button>
                        <Text>{product.description}</Text>
                    </VStack>
                </Flex>
            </Flex>
        </Container>
    )
}

export default ProductDetailsPage;
