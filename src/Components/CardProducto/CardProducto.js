import React, { useState, useContext } from 'react';
import {
	Flex,
	Image,
	Text,
	Input,
	Button,
	useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { PedidoContext } from '../../Context';

const CardProducto = ({ data }) => {
	const [cantidad, setCantidad] = useState(0);
	const {pedido, setPedido} = useContext(PedidoContext);

	const toast = useToast();

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
						? {
								...repetido,
								cantidad: repetido.cantidad + cantidad,
						  }
						: rep
				)
			);
			toast({
				title: '¡Cantidad sumada al total!',
				status: 'success',
				duration: 3000,
				isClosable: false,
			});
		} else if (cantidad != 0) {
			setPedido([...pedido, { ...data, cantidad: cantidad }]);
			toast({
				title: '¡Nuevo producto agregado!',
				status: 'success',
				duration: 3000,
				isClosable: false,
			});
		}
	};

	return (
		<Flex
			w='270px'
			h='150px'
			alignItems='center'
			bgColor='white'
			p={2}
			borderRadius={5}
			shadow='md'
			transition='0.2s'
			_hover={{ shadow: 'lg' }}
		>
			<Flex>
				<Image src={data.imagen} />
			</Flex>
			<Flex flexDir='column'>
				<Text
					as='b'
					fontSize='sm'
					color='white'
					p={1}
					bgColor={data.color}
					lineHeight='shorter'
					borderRadius={5}
					textAlign='center'
					marginBottom={1}
				>
					{data.nombre}
				</Text>

				<Flex alignItems='center' w='100%' marginBottom={1}>
					<Button
						colorScheme='gray'
						onClick={() => restar(cantidad)}
						margin={1}
						size='sm'
					>
						-
					</Button>
					<Input
						type='number'
						value={cantidad}
						textAlign='center'
						margin={1}
						onChange={() => null}
						size='sm'
					/>
					<Button
						colorScheme='gray'
						onClick={() => sumar(cantidad)}
						margin={1}
						size='sm'
					>
						+
					</Button>
				</Flex>
				<Button
					size='sm'
					variant='outline'
					colorScheme='whatsapp'
					leftIcon={<AddIcon fontSize='xs' />}
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
