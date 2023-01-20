import React, { useContext } from 'react';
import { Flex, Heading, Text, Divider, Button } from '@chakra-ui/react';
import { PedidoContext } from '../../Context';
import { DeleteIcon } from '@chakra-ui/icons';

const ItemPedido = ({ items }) => {
	const [pedido, setPedido] = useContext(PedidoContext);

	const borrar = () => {
        setPedido(pedido.filter((rep) => rep.id !== items.id));
	};

	return (
		<Flex
			w='100%'
			bgColor='white'
			justifyContent='space-evenly'
			p={2}
			borderRadius={5}
			alignItems='center'
		>
			<Text as='b'>{items.nombre}</Text>
			<Divider orientation='vertical' borderColor='color.primario' />
			<Text>{items.codigo}</Text>
			<Divider orientation='vertical' borderColor='color.primario' />
			<Text>{items.cantidad} cajas</Text>
			<Divider orientation='vertical' borderColor='color.primario' />
			<Button colorScheme='red' onClick={() => borrar()}>
				<DeleteIcon />
			</Button>
		</Flex>
	);
};

export default ItemPedido;
