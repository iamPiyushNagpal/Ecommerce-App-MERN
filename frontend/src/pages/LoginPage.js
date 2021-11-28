import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box, Container, FormControl, FormLabel, Input, Heading, Button, Text, Link
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from '../actions/userActions';
import { useHistory } from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { loading, userInfo, error } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Container maxW="container.sm">
            <Box maxW="450px" mx="auto">
                <Heading my={5}>Sign In</Heading>
                {error && <Message status="error" description={error} />}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
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
                    <Button my={3} width="100%" type="submit">Sign In</Button>
                </form>
                <Text>New Customer? <Link as={ReactRouterLink} to="/register">Click here to Sign Up</Link></Text>
            </Box>

        </Container>
    )
}

export default LoginPage;
