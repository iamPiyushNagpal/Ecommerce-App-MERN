import { Flex, Alert, AlertDescription } from "@chakra-ui/react";

const Message = ({ status, description }) => {
    return (
        <Flex mt={3}>
            <Alert status={status}>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Alert>
        </Flex>
    )
}

export default Message;
