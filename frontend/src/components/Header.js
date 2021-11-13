import { Box, HStack, VStack, Link, Flex, IconButton, Heading, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Header = () => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex bgColor={"gray.900"} py={{ base: 5, md: 7 }} px={{ base: 4, md: 8 }} justify="space-between" alignItems="center">
                <IconButton
                    bgColor={"gray.900"}
                    color="white"
                    onClick={onToggle}
                    display={{ md: "none" }}
                    icon={isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                    _hover={{ bgColor: "gray.700" }}
                />
                <Box color="white">
                    <Link as={ReactRouterLink} to={"/"}><Heading size="md">LOGO</Heading></Link>
                </Box>
                <HStack display={{ base: "none", md: "flex" }} color="white" spacing="20px">
                    <Text>
                        <Link as={ReactRouterLink} to={`/cart`}><i className="fa-solid fa-cart-shopping"></i> CART</Link>
                    </Text>
                    <Text>
                        <Link as={ReactRouterLink} to={`/login`}><i className="fa-solid fa-user"></i> SIGN IN</Link>
                    </Text>
                </HStack>
            </Flex>
            {isOpen && (
                <Box bgColor={"gray.900"} color="white" py={4} display={{ md: "none" }}>
                    <VStack spacing="10px">
                        <Text>
                            <Link as={ReactRouterLink} to={`/cart`}><i className="fa-solid fa-cart-shopping"></i> CART</Link>
                        </Text>
                        <Text>
                            <Link as={ReactRouterLink} to={`/login`}><i className="fa-solid fa-user"></i> SIGN IN</Link>
                        </Text>
                    </VStack>
                </Box>
            )}
        </Box>
    )
}

export default Header
