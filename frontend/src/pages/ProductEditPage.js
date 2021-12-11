import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box, Container, FormControl, FormLabel, Input, Heading, Button
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails, updateProduct } from '../actions/productActions';
import { useParams, useHistory } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditPage = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const { id: productId } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate,
        success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/admin/productlist');
        }
        else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            }
            else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, history, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    return (
        <Container maxW="container.sm">
            <Box maxW="450px" mx="auto">
                <Button as={ReactRouterLink} to={"/admin/productlist"} leftIcon={<i class="fa-solid fa-arrow-left"></i>} mt={7}>GO BACK</Button>
                <Heading my={5}>Edit Product</Heading>
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
                            <FormControl id="price">
                                <FormLabel>Price</FormLabel>
                                <Input type='number' placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="image">
                                <FormLabel>Image</FormLabel>
                                <Input placeholder="Enter Image url"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="brand">
                                <FormLabel>Brand</FormLabel>
                                <Input placeholder="Enter Image url"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="countInStock">
                                <FormLabel>Count In Stock</FormLabel>
                                <Input type='number' placeholder="Enter Brand"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="category">
                                <FormLabel>Category</FormLabel>
                                <Input placeholder="Enter Brand"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="description">
                                <FormLabel>Description</FormLabel>
                                <Input placeholder="Enter Brand"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>
                            <Button my={3} width="100%" type="submit">Update</Button>
                        </form>
                    )}
            </Box>

        </Container>
    )
}

export default ProductEditPage;
