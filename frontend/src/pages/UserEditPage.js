import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box, Container, FormControl, FormLabel, Input, Heading, Button, Checkbox,
    CheckboxGroup
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUser } from '../actions/userActions';
import { useParams, useHistory } from "react-router-dom";
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const { id: userId } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist')
        }
        else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            }
            else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, userId, dispatch, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    }

    return (
        <Container maxW="container.sm">
            <Box maxW="450px" mx="auto">
                <Button as={ReactRouterLink} to={"/admin/userlist"} leftIcon={<i class="fa-solid fa-arrow-left"></i>} mt={7}>GO BACK</Button>
                <Heading my={5}>Edit User</Heading>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message description={errorUpdate} status="error" />}
                {loading ? <Loader /> :
                    error ? <Message status="error" description={error} /> : (
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
                            <FormControl mt={3}>
                                <CheckboxGroup>
                                    <Checkbox
                                        isChecked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    >Is Admin</Checkbox>
                                </CheckboxGroup>
                            </FormControl>
                            <Button my={3} width="100%" type="submit">Update</Button>
                        </form>
                    )}
            </Box>

        </Container>
    )
}

export default UserEditPage;
