import { Flex, Container } from "@chakra-ui/react";
import { useEffect } from "react";
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Meta from "../components/Meta";

const HomePage = () => {

    const { keyword } = useParams();
    console.log(keyword);

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <Container maxW="container.xl">
            <Meta />
            {loading ? <Loader /> : error ? <Message status="error" description={error} /> :
                <Flex flexWrap="wrap" justify="space-between" mx="auto">
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </Flex>}
        </Container>
    )
}

export default HomePage;
