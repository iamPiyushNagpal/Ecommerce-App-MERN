import { useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box, Container, Heading, Button, Link, Table, Tbody, Thead, Tr, Td, Th
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from '../actions/orderActions';
import { useHistory } from "react-router-dom";

const OrderListPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo])

    return (
        <Container maxW="container.xl">
            <Box>
                <Heading>Orders</Heading>
                {loading ? <Loader /> : error ?
                    <Message description={error} status="error" /> : (
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>USER</Th>
                                    <Th>DATE</Th>
                                    <Th>TOTAL</Th>
                                    <Th>PAID</Th>
                                    <Th>DELIVERED</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders.map(order => (
                                    <Tr key={order._id}>
                                        <Td>{order._id}</Td>
                                        <Td>{order.user && order.user.name}</Td>
                                        <Td>{order.createdAt.substring(0, 10)}</Td>
                                        <Td>${order.totalPrice}</Td>
                                        <Td>{order.isPaid ? order.paidAt.substring(0, 10)
                                            : <i className="fa-solid fa-x" style={{ color: "red" }}></i>}
                                        </Td>
                                        <Td>{order.isDelivered ? order.deliveredAt.substring(0, 10)
                                            : <i className="fa-solid fa-x" style={{ color: "red" }}></i>}
                                        </Td>
                                        <Td>
                                            <Button as={ReactRouterLink} to={`/order/${order._id}`}>Details</Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
            </Box>
        </Container>
    )
}

export default OrderListPage
