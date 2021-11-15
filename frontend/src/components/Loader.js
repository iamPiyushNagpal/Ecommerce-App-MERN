import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
    return (
        <Flex h="75vh" alignItems="center" justify="center">
            <Spinner
                thickness="5px"
                speed="0.65s"
                size="xl"
            />
        </Flex>
    )
}

export default Loader;