import React, { useContext, useState } from 'react';
import {
	Flex,
	Heading,
	Input,
	Divider,
	Button,
	Textarea,
	Text
} from '@chakra-ui/react';
import { PedidoContext } from '../../Context';
import ItemPedido from '../ItemPedido/ItemPedido';
import { WarningTwoIcon } from '@chakra-ui/icons';
import DocuPDF from '../../DocuPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Seleccionados = () => {
	const [pedido, setPedido] = useContext(PedidoContext);
	const [nota, setNota] = useState('');
	const [nombre, setNombre] = useState('');

	//Seteando fecha para guardarla en el PDF
	const date = new Date();
	const fecha = date.toLocaleDateString();

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
					<WarningTwoIcon fontSize='4rem' marginBottom={5} color="color.primario"/>
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
						<PDFDownloadLink
							document={<DocuPDF nombre={nombre} fecha={fecha} nota={nota} pedido={pedido} />}
							fileName='pedido.pdf'
						>
							{<Button colorScheme='orange'>Descargar pedido (PDF)</Button>
							}
						</PDFDownloadLink>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default Seleccionados;
