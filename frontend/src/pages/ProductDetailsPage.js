import {
    VStack, Flex, Heading, Text, Container, Image, Button, Table, Tbody, Tr, Td,
    FormControl, Select, Box, List, ListItem, FormLabel, Textarea, useToast,
    Divider
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from "../components/Meta";

const ProductDetailsPage = () => {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const history = useHistory();
    const toast = useToast();

    const { id } = useParams();

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { error: errorProductReview, success: successProductReview } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            toast({
                title: 'Review Submitted',
                status: 'success',
                isClosable: true
            })
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(id));
    }, [dispatch, id, successProductReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`);
        console.log(qty);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }

    return (
        <Container maxW="container.xl">
            <Button as={ReactRouterLink} to={"/"} leftIcon={<i class="fa-solid fa-arrow-left"></i>} mt={7}>GO BACK</Button>
            {loading ? <Loader /> : error ? <Message status="error" description={error} /> :
                <>
                    <Meta title={product.name} />
                    <Flex direction={{ base: "column", lg: "row" }} alignItems={{ base: "center", lg: "flex-start" }} my={7}>

                        <Box flex={{ lg: "1" }} >
                            <Image src={product.image} boxSize={{ base: "400px", lg: "100%" }} />
                            <Box my={5}>
                                <Heading mb={5}>Reviews</Heading>
                                {product.reviews.length === 0 && <Message description="No Reviews" />}
                                <List>
                                    {product.reviews.map((review) => (
                                        <ListItem mb={5} key={review._id}>
                                            <Heading size="md">{review.name}</Heading>
                                            <Rating value={review.rating} />
                                            <Text mt={2}>{review.createdAt.substring(0, 10)}</Text>
                                            <Text>{review.comment}</Text>
                                            <Divider />
                                        </ListItem>
                                    ))}
                                    <ListItem>
                                        <Heading size="md">Write a Customer Review</Heading>
                                        {errorProductReview && <Message description={errorProductReview} status="error" />}
                                        {userInfo ? (
                                            <form onSubmit={submitHandler}>
                                                <FormControl id='rating'>
                                                    <FormLabel>Rating</FormLabel>
                                                    <Select placeholder="Rating" value={rating}
                                                        onChange={(e) => setRating(e.target.value)}>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Select>
                                                </FormControl>
                                                <FormControl id='comment'>
                                                    <FormLabel>Comment</FormLabel>
                                                    <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                                                </FormControl>
                                                <Button type="submit" mt={3}>Submit Review</Button>
                                            </form>
                                        ) : <Message description={`Please sign in to wrote review`} />}
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
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
                </>
            }
        </Container>
    )
}

export default ProductDetailsPage;
