import { useState, useEffect } from 'react';
import {
    Box, Flex, Container, FormControl, FormLabel, Input, Heading, Button,
    Table, Thead, Tbody, Tr, Th, Td
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useHistory } from "react-router-dom";
import { Link as ReactRouterLink } from 'react-router-dom';

const ProfilePage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            }
            else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }

    return (
        <Container maxW="container.xl">
            <Flex direction={{ base: "column", lg: "row" }}>
                <Box flex={{ lg: "1" }} w="100%" maxW={{ base: "450px", lg: "100%" }} mx="auto" >
                    <Heading my={5}>USER PROFILE</Heading>
                    {error && <Message status="error" description={error} />}
                    {success && <Message status="success" description={"Profile Updated"} />}
                    {loading && <Loader />}
                    <form onSubmit={submitHandler}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button my={3} width="100%" type="submit">Update</Button>
                    </form>
                </Box>
                <Box flex={{ lg: "2" }}>
                    <Heading my={5}>My Orders</Heading>
                    {loadingOrders ? <Loader /> : errorOrders ?
                        <Message description={errorOrders} status="error" /> : (
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>ID</Th>
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
                                            <Td>{order.createdAt.substring(0, 10)}</Td>
                                            <Td>{order.totalPrice}</Td>
                                            <Td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fa-solid fa-x" style={{ color: "red" }}></i>}</Td>
                                            <Td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fa-solid fa-x" style={{ color: "red" }}></i>}</Td>
                                            <Td><Button as={ReactRouterLink} to={`/order/${order._id}`}>Details</Button></Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                </Box>
            </Flex>
        </Container>
    )
}

export default ProfilePage;
