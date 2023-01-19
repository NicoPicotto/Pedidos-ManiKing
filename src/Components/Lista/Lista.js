import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import {
	Flex,
	Heading,
	Text,
	Image,
	Divider,
	useMediaQuery,
} from '@chakra-ui/react';
import CardProducto from '../CardProducto/CardProducto';

const Lista = () => {
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isDesktop] = useMediaQuery('(min-width: 600px)');

	useEffect(() => {
		setLoading(true);
		const q = query(collection(db, 'productos'));
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
		<Flex w='65%' flexDir='column' p={5}>
			<Heading>Seleccioná tus productos</Heading>
			<Divider borderColor='color.primario' marginBlock={2} />
			<Flex flexDir='column'>
				{productos.map((producto) => (
					<CardProducto
						key={producto.codigo}
						nombre={producto.nombre}
						codigo={producto.codigo}
						imagen={producto.imagen}
                        multiplo={producto.multiplo}
					/>
				))}
			</Flex>
		</Flex>
	);
};

export default Lista;
