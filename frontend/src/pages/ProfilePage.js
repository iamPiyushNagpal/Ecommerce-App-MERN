import { useState, useEffect } from 'react';
import {
    Box, Flex, Container, FormControl, FormLabel, Input, Heading, Button
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useHistory } from "react-router-dom";

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

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
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

                </Box>
            </Flex>
        </Container>
    )
}

export default ProfilePage;
