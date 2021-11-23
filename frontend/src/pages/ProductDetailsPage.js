import {
    VStack, Flex, Heading, Text, Container, Image, Button, Table, Tbody,
    Tr, Td, FormControl, Select
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductDetailsPage = () => {

    const [qty, setQty] = useState(1);

    const history = useHistory();

    const { id } = useParams();

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`);
        console.log(qty);
    }

    return (
        <Container maxW="container.xl">
            <Button as={ReactRouterLink} to={"/"} leftIcon={<i class="fa-solid fa-arrow-left"></i>} mt={7}>GO BACK</Button>
            {loading ? <Loader /> : error ? <Message status="error" description={error} /> :
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
                            {product.countInStock > 0 && (
                                <Table variant="simple">
                                    <Tbody>
                                        <Tr>
                                            <Td>Qty</Td>
                                            <Td>
                                                <FormControl id="qty">
                                                    <Select placeholder="Quantity" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            )}
                            <Button onClick={addToCartHandler} isDisabled={product.countInStock < 1}>ADD TO CART</Button>
                            <Text>{product.description}</Text>
                        </VStack>
                    </Flex>
                </Flex>
            }
        </Container>
    )
}

export default ProductDetailsPage;
