import { HStack } from '@chakra-ui/react'
import React from 'react'

const Rating = ({ value, text }) => {
    return (
        <HStack mt={2}>
            <i style={{ color: "#e0ce02" }} color="red" className={value >= 1 ?
                "fa-solid fa-star" : value >= 0.5 ?
                    "fa-solid fa-star-half-stroke" :
                    "fa-regular fa-star"}>
            </i>
            <i style={{ color: "#e0ce02" }} className={value >= 2 ?
                "fa-solid fa-star" : value >= 1.5 ?
                    "fa-solid fa-star-half-stroke" :
                    "fa-regular fa-star"}>
            </i>
            <i style={{ color: "#e0ce02" }} className={value >= 3 ?
                "fa-solid fa-star" : value >= 2.5 ?
                    "fa-solid fa-star-half-stroke" :
                    "fa-regular fa-star"}>
            </i>
            <i style={{ color: "#e0ce02" }} className={value >= 4 ?
                "fa-solid fa-star" : value >= 3.5 ?
                    "fa-solid fa-star-half-stroke" :
                    "fa-regular fa-star"}>
            </i>
            <i style={{ color: "#e0ce02" }} className={value >= 5 ?
                "fa-solid fa-star" : value >= 4.5 ?
                    "fa-solid fa-star-half-stroke" :
                    "fa-regular fa-star"}>
            </i>
            <p>{text && text}</p>
        </HStack>
    )
}

export default Rating
