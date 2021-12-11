import { useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box, Container, Heading, Button, Table, Tbody, Thead, Tr, Td, Th, HStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts, deleteProduct } from '../actions/productActions';
import { useHistory } from "react-router-dom";

const ProductListPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure?'))
            dispatch(deleteProduct(productId));
    }

    const createProductHandler = (product) => {

    }

    return (
        <Container maxW="container.xl">
            <Box>
                <HStack justify='space-between' my={5}>
                    <Heading>Products</Heading>
                    <Button onClick={createProductHandler} leftIcon={<i className="fa-solid fa-plus"></i>}>ADD PRODUCT</Button>
                </HStack>
                {loadingDelete && <Loader />}
                {errorDelete && <Message description={errorDelete} status="error" />}
                {loading ? <Loader /> : error ?
                    <Message description={error} status="error" /> : (
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>NAME</Th>
                                    <Th>PRICE</Th>
                                    <Th>CATEGORY</Th>
                                    <Th>BRAND</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {products.map(product => (
                                    <Tr key={product._id}>
                                        <Td>{product._id}</Td>
                                        <Td>{product.name}</Td>
                                        <Td>{product.price}</Td>
                                        <Td>{product.category}</Td>
                                        <Td>{product.brand}</Td>
                                        <Td>
                                            <Button as={ReactRouterLink} to={`/admin/product/${product._id}/edit`}><i className="fa-solid fa-edit"></i></Button>
                                            <Button onClick={() => deleteHandler(product._id)}><i className="fa-solid fa-trash"></i></Button>
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

export default ProductListPage
