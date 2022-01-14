import { useState, useEffect } from 'react';
import {
    Box, Container, FormControl, FormLabel, Input, Heading, Button
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { useHistory } from "react-router-dom";

const ShippingPage = () => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    }

    return (
        <Container maxW="container.sm">
            <Box maxW="450px" mx="auto">
                <Heading my={5}>Shipping</Heading>
                <form onSubmit={submitHandler}>
                    <FormControl id="address" isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="city" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="postalCode" isRequired>
                        <FormLabel>Postal Code</FormLabel>
                        <Input placeholder="Enter Postal Code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="country" isRequired>
                        <FormLabel>Country</FormLabel>
                        <Input placeholder="Enter Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </FormControl>
                    <Button my={3} width="100%" type="submit">Continue</Button>
                </form>
            </Box>
        </Container>
    )
}

export default ShippingPage;
