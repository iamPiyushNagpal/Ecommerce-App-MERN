import {
    Flex, Container, Heading, Image, FormControl, Select, Button, Link,
    VStack, Table, Tbody, Tr, Td
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartPage = () => {

    const { id } = useParams();

    const location = useLocation();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems);


    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, qty, id])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {

    }

    return (
        <Container maxW="container.xl">
            <Heading my={3}>SHOPPING CART</Heading>
            {cartItems.length === 0 ? <Message status="info" description="Your cart is empty"></Message> :
                <Flex>
                    <Flex flex="3">
                        <Table variant="simple" >
                            <Tbody>
                                {cartItems.map((item) => (
                                    <Tr>
                                        <Td><Image boxSize={90} src={item.image} /></Td>
                                        <Td><Heading as="h6" size="sm"><Link as={ReactRouterLink} to={`/product/${item.product}`}>{item.name}</Link></Heading></Td>
                                        <Td>{`$ ${item.price}`}</Td>
                                        <Td>
                                            <FormControl id="qty">
                                                <Select placeholder="Quantity" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <Button onClick={() => removeFromCartHandler(item.product)}><i class="fa-solid fa-trash"></i></Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex flex="1" direction="column">
                        <VStack alignItems="center" mt={10}>
                            <Heading size="lg">{`Total ${cartItems.reduce((acc, item) => acc + item.qty, 0)} items`}</Heading>
                            <Heading as="h1">{`$ ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}`}</Heading>
                            <Button width="80%" onClick={checkoutHandler}>CHECKOUT</Button>
                        </VStack>
                    </Flex>
                </Flex>
            }
        </Container>
    )
}

export default CartPage;
