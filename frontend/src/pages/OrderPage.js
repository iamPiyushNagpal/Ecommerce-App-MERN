import {
    Box, Container, Heading, Flex, Text, Stack, Image, Link, Table, Tbody,
    Tr, Td
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link as ReactRouterLink } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderPage = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    }

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(id));
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            }
            else {
                setSdkReady(true);
            }
        }

    }, [dispatch, id, successPay, order])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(id, paymentResult));
    }

    return (
        <Container maxW="container.xl">
            {loading ? <Loader /> : error ?
                <Message description={error} status="error" /> :
                <Flex>
                    <Box flex="2">
                        <Box my={3}>
                            <Heading size='lg' color="gray">ORDER {id}</Heading>
                            <Heading size='lg' mt={2}>Shipping</Heading>
                            <Text mt={2}>Name : {order.user.name}</Text>
                            <a href={`mailto:${order.user.email}`}>Email : {order.user.email}</a>
                            <Text mt={2}>Address: {order.shippingAddress.address},
                                {' '}{order.shippingAddress.city},{' '}{order.shippingAddress.postalCode},
                                {' '}{order.shippingAddress.country}</Text>
                            {order.isDelivered ? <Message status="success" description={`Paid on ${order.deliveredAt}`} />
                                : <Message status="error" description={`Not Delivered`} />}
                        </Box>
                        <Box mb={3}>
                            <Heading size='lg'>Payment Method</Heading>
                            <Text mt={2}>Method: {order.paymentMethod}</Text>
                            {order.isPaid ? <Message status="success" description={`Paid on ${order.paidAt}`} />
                                : <Message status="error" description={`Not Paid`} />}
                        </Box>
                        <Box>
                            <Heading size='lg'>Order Items</Heading>
                            {order.orderItems.length === 0 ? <Message description="Order
                    is empty" status="info" /> : (
                                <Table variant="simple" >
                                    <Tbody>
                                        {order.orderItems.map((item, index) => (
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
                                        <Td>${order.itemsPrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Shipping</Td>
                                        <Td>${order.shippingPrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Tax</Td>
                                        <Td>${order.taxPrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Total</Td>
                                        <Td>${order.totalPrice}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                            {!order.isPaid && (
                                <Box>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Flex>
            }
        </Container>
    )
}

export default OrderPage
