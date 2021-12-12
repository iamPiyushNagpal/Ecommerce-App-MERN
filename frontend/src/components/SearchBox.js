import { useState } from "react";
import {
    FormControl, Input, Button, HStack, VStack
} from '@chakra-ui/react';
import { useHistory } from "react-router-dom";

const SearchBox = () => {

    const [keyword, setKeyword] = useState("");

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        }
        else {
            history.push('/');
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <HStack>
                <FormControl id='keyword'>
                    <Input
                        color="white"
                        placeholder="Search Products"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </FormControl>
                <Button type='submit'>Search</Button>
            </HStack>
        </form>
    )
}

export default SearchBox
