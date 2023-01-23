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
  Divider,
  useMediaQuery,
  Spinner,
} from "@chakra-ui/react";
import CardProducto from "../CardProducto/CardProducto";

const Lista = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDesktop] = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "productos"),
      where("estado", "==", true),
      orderBy("nombre", "asc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let productosArray = [];
      querySnapshot.forEach((doc) => {
        productosArray.push({ ...doc.data(), id: doc.id });
      });
      setProductos(productosArray);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <Flex w="65%" flexDir="column" >
      <Heading bgColor="color.primario" color="color.fondo" p={5}>Seleccioná tus productos</Heading>
      {loading ? (
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
          <Spinner color="color.primario" size="lg" />
        </Flex>
      ) : (
        <Flex wrap="wrap" gap={5} p={2} overflowY="scroll">
          {productos.map((producto) => (
            <CardProducto key={producto.codigo} data={producto} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Lista;
