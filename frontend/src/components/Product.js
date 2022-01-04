import { Box, Link, Heading, Image } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as ReactRouterLink } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <Box w={"330px"} my={10} mx={{ base: "auto", lg: "0" }} border="1px solid lightgray" borderRadius={10}>
            <Link as={ReactRouterLink} to={`/product/${product._id}`}><Image maxH={280} mx={'auto'} objectFit={'cover'} borderTopRadius={10} src={product.image} /></Link>
            <Box px={3}>
                <Heading as="h4" size="md" mt={2}><Link as={ReactRouterLink} to={`/product/${product._id}`}>{product.name}</Link></Heading>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                <Heading size="lg" mt={1}>{`$ ${product.price}`}</Heading>
            </Box>
        </Box>
    )
}

export default Product
