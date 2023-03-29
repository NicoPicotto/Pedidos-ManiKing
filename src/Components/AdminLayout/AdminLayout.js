import React, { useEffect, useState } from "react";
import { Flex, Heading, Spinner, Stack, Link, useMediaQuery, Button } from "@chakra-ui/react";
import { db } from "../../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import EditarProducto from "../EditarProducto/EditarProducto";
import { Link as ReachLink } from "react-router-dom";

const AdminLayout = () => {
    const [productos, setProductos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile] = useMediaQuery("(max-width: 1100px)");

    useEffect(() => {
        const q = query(collection(db, "productos"), orderBy("orden", "asc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let productosArray = [];
            querySnapshot.forEach((doc) => {
                productosArray.push({ ...doc.data(), id: doc.id });
            });
            setProductos(productosArray);
            setIsLoaded(true);
        });

        return () => unsub();
    }, []);

    return (
        <Flex w="100%" flexDir="column">
            <Stack
                direction={isMobile ? "column" : "row"}
                bgColor="color.primario"
                align="center"
                justify="space-between"
                p={5}
            >
                <Heading color="color.fondo">
                    Editar disponibilidad de productos
                </Heading>
                <Stack direction="row" align="center">
                    <Stack direction="row" align="center">
                        <Link as={ReachLink} to="/lista">
                            <Button color="white" variant="link">
                                Volver al panel principal
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
            {!isLoaded ? (
                <Flex
                    w="100%"
                    h="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Spinner color="color.primario" size="lg" />
                </Flex>
            ) : (
                <Flex wrap="wrap" gap={5} p={2} overflowY="scroll">
                    {productos.map((producto) => (
                        <EditarProducto
                            key={producto.codigo}
                            data={producto}
                            isLoaded={isLoaded}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

export default AdminLayout;
