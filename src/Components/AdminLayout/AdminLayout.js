import React, { useEffect, useState } from "react";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { db } from "../../firebase";
import { UserAuth } from "../../Context";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import EditarProducto from "../EditarProducto/EditarProducto";

const AdminLayout = () => {
    const [productos, setProductos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "productos"), orderBy("nombre", "asc"));
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
            <Heading bgColor="color.primario" color="color.fondo" p={5}>
                Editar disponibilidad de productos
            </Heading>
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
