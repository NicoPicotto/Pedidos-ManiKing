import React from "react";
import { Flex } from "@chakra-ui/react";
import Login from "../Components/AuthLayout/Login";

const LoginView = () => {
    return (
        <Flex
            h="100vh"
            w="100vw"
            bgColor="color.fondo"
            overflow="hidden"
            alignItems="center"
            justifyContent="center"
        >
            <Login />
        </Flex>
    );
};

export default LoginView;
