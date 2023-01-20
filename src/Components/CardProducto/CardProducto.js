import React, { useState, useContext } from 'react';
import { Flex, Image, Text, Input, Button } from '@chakra-ui/react';
import { PedidoContext } from '../../Context';

const CardProducto = ({ data }) => {
	const [cantidad, setCantidad] = useState(0);
	const [pedido, setPedido] = useContext(PedidoContext);

	//Función para sumar al contador según múltiplo
	const sumar = (cantidad) => {
		let sumado = cantidad + data.multiplo;
		setCantidad(sumado);
	};

	//Función para restar al contador según múltiplo
	const restar = (cantidad) => {
		if (cantidad >= data.multiplo) {
			let restado = cantidad - data.multiplo;
			setCantidad(restado);
		}
	};

	//Función para agregar cantidad al pedido y llevarlo al Context
	const agregar = (cantidad) => {
		const repetido = pedido.find((rep) => rep.id === data.id);
		if (repetido) {
			setPedido(
				pedido.map((rep) =>
					rep.id === data.id
						? { ...repetido, cantidad: repetido.cantidad + cantidad }
						: rep
				)
			);
			console.log('Hizo lo del repetido');
		} else {
			setPedido([...pedido, { ...data, cantidad: cantidad }]);
		}
	};

	return (
		<Flex
			w='250px'
			flexDir='column'
			alignItems='center'
			bgColor='white'
			p={2}
			borderRadius={5}
			shadow='md'
		>
			<Text as='b'>{data.nombre}</Text>
			<Image src={data.imagen} w='150px' p={2} />
			<Flex alignItems='center' w='80%' marginBottom={1}>
				<Button
					bgColor='color.secundario'
					color='white'
					_hover={{ bgColor: 'color.primario' }}
					onClick={() => restar(cantidad)}
					margin={1}
				>
					-
				</Button>
				<Input
					type='number'
					value={cantidad}
					textAlign='center'
					margin={1}
					onChange={() => null}
				/>

				<Button
					bgColor='color.secundario'
					color='white'
					_hover={{ bgColor: 'color.primario' }}
					onClick={() => sumar(cantidad)}
					margin={1}
				>
					+
				</Button>
			</Flex>
			<Button
				w='100%'
				colorScheme='green'
				onClick={() => {
					agregar(cantidad);
				}}
			>
				Agregar
			</Button>
		</Flex>
	);
};

export default CardProducto;
