import {
    Box, Container, Heading, Button, Flex, Text, Stack, Image, Link, Table, Tbody,
    Tr, Td
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link as ReactRouterLink } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const cart = useSelector(state => state.cart);

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    cart.shippingPrice = cart.itemsPrice > 500 ? 0 : 50;
    cart.taxPrice = Number((0.18 * cart.itemsPrice).toFixed(2));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <Container maxW="container.xl">
            <Flex>
                <Box flex="2">
                    <Box my={3}>
                        <Heading size='lg'>Shipping</Heading>
                        <Text mt={2}>Address: {cart.shippingAddress.address},
                            {' '}{cart.shippingAddress.city},{' '}{cart.shippingAddress.postalCode},
                            {' '}{cart.shippingAddress.country}</Text>
                    </Box>
                    <Box mb={3}>
                        <Heading size='lg'>Payment Method</Heading>
                        <Text mt={2}>Method: {cart.paymentMethod}</Text>
                    </Box>
                    <Box>
                        <Heading size='lg'>Order Items</Heading>
                        {cart.cartItems.length === 0 ? <Message description="Your cart
                        is empty" status="info" /> : (
                            <Table variant="simple" >
                                <Tbody>
                                    {cart.cartItems.map((item, index) => (
                                        <Tr key={index}>
                                            <Td><Image boxSize={70} src={item.image} /></Td>
                                            <Td><Heading as="h6" size="sm"><Link as={ReactRouterLink} to={`/product/${item.product}`}>{item.name}</Link></Heading></Td>
                                            <Td>{item.qty} x ${item.price} = ${item.qty * item.price}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                    </Box>
                </Box>
                <Box flex="1">
                    <Stack mt={10} mx={"auto"} width="80%">
                        <Heading>Order Summary</Heading>
                        <Table variant="simple" >
                            <Tbody>
                                <Tr>
                                    <Td>Items</Td>
                                    <Td>${cart.itemsPrice}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Shipping</Td>
                                    <Td>${cart.shippingPrice}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Tax</Td>
                                    <Td>${cart.taxPrice}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Total</Td>
                                    <Td>${cart.totalPrice}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        {error && <Message description={error} status="error" />}
                        <Button onClick={placeOrderHandler}>PLACE ORDER</Button>
                    </Stack>
                </Box>
            </Flex>
        </Container>
    )
}

export default PlaceOrderPage
