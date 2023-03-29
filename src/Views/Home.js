import React from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import Lista from "../Components/Lista/Lista";
import Seleccionados from "../Components/Seleccionados/Seleccionados";

const Home = () => {
    const [isMobile] = useMediaQuery("(max-width: 1100px)");

    return (
        <Flex
            h={!isMobile && "100vh"}
            w="100vw"
            bgColor="color.fondo"
            overflow={!isMobile && "hidden"}
            justifyContent="space-between"
            flexDir={isMobile ? "column" : "row"}
        >
            <Lista />
            <Seleccionados />
        </Flex>
    );
};

export default Home;
