import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box, Container, FormControl, FormLabel, Input, Heading, Button, Text, Link
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from '../actions/userActions';
import { useHistory } from "react-router-dom";

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const { loading, userInfo, error } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password))
    }

    return (
        <Container maxW="container.sm">
            <Box maxW="450px" mx="auto">
                <Heading my={5}>Sign Up</Heading>
                {error && <Message status="error" description={error} />}
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
                    <Button my={3} width="100%" type="submit">Sign Up</Button>
                </form>
                <Text>Already signed up? <Link as={ReactRouterLink} to="/login">Click here to Sign In</Link></Text>
            </Box>

        </Container>
    )
}

export default RegisterPage;
