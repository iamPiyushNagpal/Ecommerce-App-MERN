import { Box, Link, Heading, Image } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as ReactRouterLink } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <Box maxW={"320px"} my={10} p={3} mx={{ base: "auto", lg: "0" }} border="1px solid lightgray">
            <Link as={ReactRouterLink} to={`/product/${product._id}`}><Image src={product.image} /></Link>
            <Heading as="h4" size="md" mt={2}><Link as={ReactRouterLink} to={`/product/${product._id}`}>{product.name}</Link></Heading>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <Heading size="lg" mt={1}>{product.price}</Heading>
        </Box>
    )
}

export default Product
