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
			w='300px'
			h="150px"
			alignItems='center'
			bgColor='white'
			p={2}
			borderRadius={5}
			shadow='md'
		>
			<Flex  >
			<Image src={data.imagen} />
			</Flex>
			<Flex flexDir="column">
			<Text as='b' fontSize="sm" color="white" p={1} bgColor={data.color} lineHeight="short" borderRadius={5} textAlign="center">{data.nombre}</Text>
			
			<Flex alignItems='center' w='100%' marginBottom={1}>
				<Button
					colorScheme='gray'
					_hover={{ bgColor: 'color.primario' }}
					onClick={() => restar(cantidad)}
					margin={1}
					size="sm"
				>
					-
				</Button>
				<Input
					type='number'
					value={cantidad}
					textAlign='center'
					margin={1}
					onChange={() => null}
					size="sm"
				/>

				<Button
					colorScheme='gray'
					_hover={{ bgColor: 'color.primario' }}
					onClick={() => sumar(cantidad)}
					margin={1}
					size="sm"
				>
					+
				</Button>
			</Flex>
			<Button
				size="sm"
				colorScheme='green'
				onClick={() => {
					agregar(cantidad);
				}}
			>
				Agregar
			</Button>
			</Flex>
			
		</Flex>
	);
};

export default CardProducto;
