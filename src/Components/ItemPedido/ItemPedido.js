import React, { useContext } from 'react';
import { Flex, Text, Divider, Button } from '@chakra-ui/react';
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
			bgColor={items.color}
			justifyContent='space-between'
			p={2}
			borderRadius={5}
			alignItems='center'
		>
			<Flex h='100%' alignItems='center'>
				<Text as='b' marginRight={2} color='white'>
					{items.nombre}
				</Text>
				<Divider
					orientation='vertical'
					marginRight={2}
					marginLeft={2}
					h='90%'
					borderColor='white'
				/>
				<Text color='white'>{items.cantidad} cajas</Text>
			</Flex>
			<Flex h='100%' alignItems='center'>
				<Button colorScheme="red" marginLeft={2} onClick={() => borrar()}>
					<DeleteIcon color="white" />
				</Button>
			</Flex>
		</Flex>
	);
};

export default ItemPedido;
