import React, { useContext, useState } from "react";
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
    Select,
} from "@chakra-ui/react";
import { renderToStaticMarkup } from "react-dom/server";
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
    const [ejecutivo, setEjecutivo] = useState("");
    const [nroReferencia, setNroReferencia] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    let timestamp = Date.now();

    //Genera tabla para pasarla como variable a EmailJs
    const tablaHTML = (
        <table
            border="1"
            cellpadding="5"
            style={{ borderCollapse: "collapse" }}
        >
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Código</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {pedido.map((prod) => (
                    <tr key={prod.codigo}>
                        <td>{prod.nombre}</td>
                        <td style={{ textAlign: "center" }}>{prod.codigo}</td>
                        <td style={{ textAlign: "center" }}>{prod.cantidad}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const output = document.createElement("p");
    const staticElement = renderToStaticMarkup(tablaHTML);

    //Calcula la cantidad por producto
    const totalItems = pedido.reduce((total, item) => total + item.cantidad, 0);

    //Función para enviar los correos/pedido
    const sendEmail = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const templateParams = {
            nota: nota,
            nombre: nombre,
            direccion: direccion,
            email: email,
            ejecutivo: ejecutivo,
            nroReferencia: nroReferencia,
            timestamp: timestamp,
            productos: staticElement,
        };

        emailjs
            .send(
                "service_s3msikc",
                "template_hhc91se",
                templateParams,
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
                    <Flex flexDir="column" p={1} marginBottom={2}>
                        <Divider borderColor="color.primario" marginBlock={2} />
                        <Flex w="100%">
                            <Input
                                bgColor="white"
                                size="sm"
                                borderRadius={5}
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
                                size="sm"
                                borderRadius={5}
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
                                size="sm"
                                borderRadius={5}
                                type="email"
                                value={email}
                                name="email_id"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email del cliente"
                                focusBorderColor="color.primario"
                                isRequired
                                margin={1}
                            />
                            <Select
                                bgColor="white"
                                size="sm"
                                borderRadius={5}
                                value={ejecutivo}
                                name="ejecutivo"
                                onChange={(e) => setEjecutivo(e.target.value)}
                                placeholder="Ejecutivo a cargo"
                                focusBorderColor="color.primario"
                                margin={1}
                                isRequired
                            >
                                <option value="gkember@prodeman.com.ar">
                                    Gastón Kember
                                </option>
                                <option value="ecereijo@prodeman.com.ar">
                                    Eugenio Cereijo
                                </option>
                                <option value="gcastillo@prodeman.com.ar">
                                    Gabriel Castillo
                                </option>
                                <option value="cbritos@prodeman.com.ar">
                                    Carlos Britos
                                </option>
                            </Select>
                            <Input
                                bgColor="white"
                                size="sm"
                                borderRadius={5}
                                value={nroReferencia}
                                name="user_ref"
                                onChange={(e) =>
                                    setNroReferencia(e.target.value)
                                }
                                placeholder="N° Referencia/OC/Pedido (opcional)"
                                focusBorderColor="color.primario"
                                margin={1}
                            />
                        </Flex>
                        <Flex w="100%">
                            <Textarea
                                bgColor="white"
                                size="sm"
                                borderRadius={5}
                                type="text"
                                value={nota}
                                name="user_observations"
                                onChange={(e) => setNota(e.target.value)}
                                margin={1}
                                noOfLines={10}
                                placeholder="Aclaraciones que quieras agregar a tu pedido (opcional)"
                                focusBorderColor="color.primario"
                            />
                        </Flex>
                        <Textarea
                            display="none"
                            defaultValue={output}
                            name="tabla_html"
                        />
                        {nombre && direccion && email && ejecutivo !== "" ? (
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
