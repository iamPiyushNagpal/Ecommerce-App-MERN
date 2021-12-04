import { useState } from 'react';
import {
    Box, Container, FormControl, FormLabel, Heading, Button, Radio, RadioGroup, VStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import { useHistory } from "react-router-dom";

const PaymentPage = () => {
    const history = useHistory();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <Container maxW="container.sm">
            <Box maxW="450px" mx="auto">
                <Heading my={5}>Payment Method</Heading>
                <form onSubmit={submitHandler}>
                    <FormControl as='fieldset'>
                        <FormLabel as='legend'>Select Method</FormLabel>
                        <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                            <VStack spacing='15px' alignItems='flex-start'>
                                <Radio
                                    value='Paypal'
                                >PayPal or Credit Card</Radio>
                                <Radio
                                    value='Stripe'
                                >Stripe</Radio>
                            </VStack>
                        </RadioGroup>
                    </FormControl>
                    <Button my={3} width="100%" type="submit">Continue</Button>
                </form>
            </Box>
        </Container>
    )
}

export default PaymentPage;
