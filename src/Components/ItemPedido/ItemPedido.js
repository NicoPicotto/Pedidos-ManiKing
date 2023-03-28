import React, { useContext } from "react";
import { Flex, Text, Divider, Button, useToast } from "@chakra-ui/react";
import { PedidoContext } from "../../Context";
import { DeleteIcon } from "@chakra-ui/icons";

const ItemPedido = ({ items }) => {
    const { pedido, setPedido } = useContext(PedidoContext);

    const toast = useToast();

    const borrar = () => {
        setPedido(pedido.filter((rep) => rep.id !== items.id));
        toast({
            title: "Producto eliminado.",
            status: "error",
            duration: 3000,
            isClosable: false,
        });
    };

    return (
        <Flex
            w="100%"
            bgColor={items.color}
            justifyContent="space-between"
            paddingLeft={2}
            borderRadius={5}
            alignItems="center"
        >
            <Flex alignItems="center" h="100%">
                <Text as="b" fontSize="sm" color="white">
                    {items.nombre}
                </Text>
                <Divider orientation="vertical" h="50%" marginInline={2} borderColor="white"/>
                <Text color="white">{items.cantidad} cajas</Text>
            </Flex>
            <Flex alignItems="center" p={2}>
                <Button colorScheme="gray" size="sm" onClick={() => borrar()}>
                    <DeleteIcon color={items.color} />
                </Button>
            </Flex>
        </Flex>
    );
};

export default ItemPedido;
