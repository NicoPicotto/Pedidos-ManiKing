import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
    collection,
    query,
    onSnapshot,
    where,
    orderBy,
} from "firebase/firestore";
import {
    Flex,
    Heading,
    useMediaQuery,
    Spinner,
    Button,
    Stack,
    Link,
    Divider,
} from "@chakra-ui/react";
import { useNavigate, Link as ReachLink } from "react-router-dom";
import CardProducto from "../CardProducto/CardProducto";
import { UserAuth } from "../../Context";
import {ExternalLinkIcon} from "@chakra-ui/icons"

const Lista = () => {
    const [productos, setProductos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDesktop] = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();
    const { logout, user } = UserAuth();

    useEffect(() => {
        const q = query(
            collection(db, "productos"),
            where("estado", "==", true),
            orderBy("orden", "asc")
        );
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

    //Logout function
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (e) {
            console.log("Logout");
        }
    };

    return (
        <Flex w="65%" flexDir="column">
            <Stack
                direction="row"
                bgColor="color.primario"
                align="center"
                justify="space-between"
                p={5}
            >
                <Heading color="color.fondo">Seleccioná tus productos</Heading>
                <Stack direction="row" align="center">
                    {user.uid === "aF9sUzMaHPMdtpYwT4n4Gm9woNs2" && (
                        <Stack direction="row" align="center">
                            <Link as={ReachLink} to="/admin">
                                <Button color="white" variant="link">
                                    Panel de admin
                                </Button>
                            </Link>
                            <Divider
                                orientation="vertical"
                                h="25px"
                                borderColor="white"
                            />
                        </Stack>
                    )}
                    <Button leftIcon={<ExternalLinkIcon />} color="white" variant="link" onClick={handleLogout}>
                        Salir de mi cuenta
                    </Button>
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
                        <CardProducto
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

export default Lista;
