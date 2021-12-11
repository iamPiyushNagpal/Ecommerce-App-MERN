import { useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box, Container, Heading, Button, Link, Table, Tbody, Thead, Tr, Td, Th
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from '../actions/userActions';
import { useHistory } from "react-router-dom";

const UserListPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (userId) => {
        if (window.confirm('Are you sure?'))
            dispatch(deleteUser(userId));
    }

    return (
        <Container maxW="container.xl">
            <Box>
                <Heading>Users</Heading>
                {loading ? <Loader /> : error ?
                    <Message description={error} status="error" /> : (
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>NAME</Th>
                                    <Th>EMAIL</Th>
                                    <Th>ADMIN</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map(user => (
                                    <Tr key={user._id}>
                                        <Td>{user._id}</Td>
                                        <Td>{user.name}</Td>
                                        <Td><Link href={`mailto:${user.email}`}>{user.email}</Link></Td>
                                        <Td>{user.isAdmin ? <i className="fa-solid fa-check" style={{ color: "green" }}></i>
                                            : <i className="fa-solid fa-x" style={{ color: "red" }}></i>}</Td>
                                        <Td>
                                            <Button as={ReactRouterLink} to={`/admin/user/${user._id}/edit`}><i className="fa-solid fa-edit"></i></Button>
                                            <Button onClick={() => deleteHandler(user._id)}><i className="fa-solid fa-trash"></i></Button>
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

export default UserListPage
