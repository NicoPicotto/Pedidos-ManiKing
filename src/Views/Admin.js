import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import AdminLayout from "../Components/AdminLayout/AdminLayout";
import { UserAuth } from "../Context";

const Admin = () => {
    const { user } = UserAuth();

    return (
        <Flex
            h="100vh"
            w="100vw"
            bgColor="color.fondo"
            overflow="hidden"
            justifyContent="space-between"
        >
            {user && user.uid !== `${process.env.REACT_APP_ADM_KEY}` ? (
                <Stack justify="center" align="center" w="100vw" h="100vh">
                    <Heading color="color.secundario">
                        No estás autorizado.
                    </Heading>
                </Stack>
            ) : (
                <AdminLayout />
            )}
        </Flex>
    );
};

export default Admin;
