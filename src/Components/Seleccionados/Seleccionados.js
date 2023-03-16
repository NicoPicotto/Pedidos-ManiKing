import React, { useContext, useState, useRef } from "react";
import {
    Flex,
    Spinner,
    Heading,
    Input,
    Divider,
    Button,
    Textarea,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import { PedidoContext } from "../../Context";
import ItemPedido from "../ItemPedido/ItemPedido";
import { WarningTwoIcon } from "@chakra-ui/icons";
import emailjs from "@emailjs/browser";

const Seleccionados = () => {
    const [pedido, setPedido] = useContext(PedidoContext);
    const [nota, setNota] = useState("");
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [nroReferencia, setNroReferencia] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let Order = pedido.map(
        (item) =>
            `${item.nombre} \t (${item.codigo}) \t | ${item.cantidad} unidades.\n`
    );

    const form = useRef();
    const toast = useToast();

    const totalItems = pedido.reduce((total, item) => total + item.cantidad, 0);

    const sendEmail = (e) => {
        e.preventDefault();

        setIsLoading(true);
        emailjs
            .sendForm(
                "service_s3msikc",
                "template_hhc91se",
                form.current,
                "jEP7Bxf9fi3mwXKW-"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setIsLoading(false);
                    toast({
                        title: "Pedido enviado",
                        description: "Nos pondremos en contacto a la brevedad.",
                        status: "success",
                        duration: 3000,
                        isClosable: false,
                    });
                },
                (error) => {
                    console.log(error.text);
                    setIsLoading(false);
                    toast({
                        title: "Ocurrió un error",
                        description:
                            "Ponete en contacto con nosotros a la brevedad.",
                        status: "error",
                        duration: 3000,
                        isClosable: false,
                    });
                }
            );
    };

    return (
        <Flex
            w="35%"
            flexDir="column"
            bgColor="color.fondoClaro"
            position="sticky"
            h="100%"
            ref={form}
            onSubmit={sendEmail}
            as="form"
        >
            <Heading bgColor="color.secundario" color="color.fondo" p={5}>
                Tu pedido
            </Heading>
            {totalItems === 0 ? (
                <Flex
                    w="100%"
                    h="100%"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                >
                    <WarningTwoIcon
                        fontSize="4rem"
                        marginBottom={5}
                        color="color.primario"
                    />
                    <Heading
                        size="md"
                        color="color.secundario"
                        textAlign="center"
                    >
                        Todavía no hay productos en tu pedido
                    </Heading>
                </Flex>
            ) : (
                <Flex flexDir="column" h="90%" justifyContent="space-between">
                    <Flex flexDir="column" gap={2} overflowY="scroll" p={2}>
                        {pedido.map((item) => {
                            return (
                                <ItemPedido key={item.codigo} items={item} />
                            );
                        })}
                    </Flex>
                    <Flex flexDir="column" p={2}>
                        <Divider borderColor="color.primario" marginBlock={2} />
                        <Flex w="100%">
                            <Input
                                bgColor="white"
                                type="name"
                                value={nombre}
                                name="from_name"
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Razón social"
                                focusBorderColor="color.primario"
                                isRequired
                                margin={1}
                            />
                            <Input
                                bgColor="white"
                                type="address"
                                value={direccion}
                                name="user_address"
                                onChange={(e) => setDireccion(e.target.value)}
                                placeholder="Dirección/lugar de entrega"
                                focusBorderColor="color.primario"
                                isRequired
                                margin={1}
                            />
                        </Flex>
                        <Flex w="100%">
                            <Input
                                bgColor="white"
                                type="email"
                                value={email}
                                name="email_id"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Tu email"
                                focusBorderColor="color.primario"
                                isRequired
                                margin={1}
                            />
                            <Input
                                bgColor="white"
                                value={nroReferencia}
                                name="user_ref"
                                onChange={(e) =>
                                    setNroReferencia(e.target.value)
                                }
                                placeholder="Nro de referencia (opcional)"
                                focusBorderColor="color.primario"
                                margin={1}
                            />
                        </Flex>
                        <Textarea
                            bgColor="white"
                            type="text"
                            value={nota}
                            name="user_observations"
                            onChange={(e) => setNota(e.target.value)}
                            margin={1}
                            noOfLines={10}
                            placeholder="Aclaraciones que quieras agregar a tu pedido (opcional)"
                            focusBorderColor="color.primario"
                        />
                        <Textarea
                            display="none"
                            name="Order"
                            defaultValue={Order}
                        />
                        {nombre && direccion && email !== "" ? (
                            <Button
                                colorScheme="orange"
                                margin={1}
                                type="submit"
                            >
                                {isLoading ? (
                                    <Spinner color="white" />
                                ) : (
                                    "Enviar pedido"
                                )}
                            </Button>
                        ) : (
                            <Tooltip
                                hasArrow
                                label="Faltan completar datos"
                                bg="red"
                                color="white"
                            >
                                <Button
                                    isDisabled
                                    colorScheme="orange"
                                    margin={1}
                                >
                                    Enviar pedido
                                </Button>
                            </Tooltip>
                        )}
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};

export default Seleccionados;
