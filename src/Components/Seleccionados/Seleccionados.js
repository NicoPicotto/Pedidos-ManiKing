import React, { useContext, useState } from 'react';
import {
	Flex,
	Heading,
	Input,
	Divider,
	Button,
	Textarea,
} from '@chakra-ui/react';
import { PedidoContext } from '../../Context';
import ItemPedido from '../ItemPedido/ItemPedido';
import { WarningTwoIcon } from '@chakra-ui/icons';

const Seleccionados = () => {
	const [pedido, setPedido] = useContext(PedidoContext);
	const [nota, setNota] = useState('');
	const [nombre, setNombre] = useState('');

	const totalItems = pedido.reduce((total, item) => total + item.cantidad, 0);

	return (
		<Flex
			w='35%'
			flexDir='column'
			p={5}
			bgColor='color.fondoClaro'
			position='sticky'
			h='100%'
		>
			<Heading>Tu pedido</Heading>
			<Divider borderColor='color.primario' marginBlock={2} />
			{totalItems === 0 ? (
				<Flex
					w='100%'
					h='100%'
					alignItems='center'
					justifyContent='center'
					flexDir='column'
				>
					<WarningTwoIcon fontSize='4rem' marginBottom={5} />
					<Heading size='md'>Todavía no hay productos en tu pedido</Heading>
				</Flex>
			) : (
				<Flex flexDir='column' h='90%' justifyContent='space-between'>
					<Flex flexDir='column' gap={2} overflowY='scroll' p={2}>
						{pedido.map((item) => {
							return <ItemPedido key={item.codigo} items={item} />;
						})}
					</Flex>
					<Flex flexDir='column'>
						<Divider borderColor='color.primario' marginBlock={2} />
						<Input
							bgColor='white'
							type='text'
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							placeholder='Nombre completo'
							focusBorderColor='color.primario'
							marginBottom={2}
						/>
						<Textarea
							bgColor='white'
							type='text'
							value={nota}
							onChange={(e) => setNota(e.target.value)}
							marginBottom={2}
							noOfLines={10}
							placeholder='Aclaraciones que quieras agregar a tu pedido...'
							focusBorderColor='color.primario'
						/>
						<Button colorScheme='orange'>Generar pedido (PDF)</Button>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default Seleccionados;
