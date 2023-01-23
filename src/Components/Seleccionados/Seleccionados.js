import React, { useContext, useState } from 'react';
import {
	Flex,
	Heading,
	Input,
	Divider,
	Button,
	Textarea,
	Tooltip,
} from '@chakra-ui/react';
import { PedidoContext } from '../../Context';
import ItemPedido from '../ItemPedido/ItemPedido';
import { WarningTwoIcon, DownloadIcon } from '@chakra-ui/icons';
import DocuPDF from '../../DocuPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Seleccionados = () => {
	const [pedido, setPedido] = useContext(PedidoContext);
	const [nota, setNota] = useState('');
	const [nombre, setNombre] = useState('');

	//Seteando fecha para guardarla en el PDF
	const date = new Date();
	const fecha = date.toLocaleDateString();
	const numeroPedido = Math.floor(Date.now() / 1000);

	const totalItems = pedido.reduce((total, item) => total + item.cantidad, 0);

	return (
		<Flex
			w='35%'
			flexDir='column'
			bgColor='color.fondoClaro'
			position='sticky'
			h='100%'
		>
			<Heading bgColor='color.secundario' color='color.fondo' p={5}>
				Tu pedido
			</Heading>
			{totalItems === 0 ? (
				<Flex
					w='100%'
					h='100%'
					alignItems='center'
					justifyContent='center'
					flexDir='column'
				>
					<WarningTwoIcon
						fontSize='4rem'
						marginBottom={5}
						color='color.primario'
					/>
					<Heading size='md' color='color.secundario'>
						Todavía no hay productos en tu pedido
					</Heading>
				</Flex>
			) : (
				<Flex flexDir='column' h='90%' justifyContent='space-between'>
					<Flex flexDir='column' gap={2} overflowY='scroll' p={2}>
						{pedido.map((item) => {
							return <ItemPedido key={item.codigo} items={item} />;
						})}
					</Flex>
					<Flex flexDir='column' p={2}>
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
							document={
								<DocuPDF
									nombre={nombre}
									fecha={fecha}
									nota={nota}
									pedido={pedido}
								/>
							}
							fileName={`Pedido ${numeroPedido} - ${nombre}`}
						>
							{nombre === '' ? (
								<Tooltip
									hasArrow
									label='Falta indicar tu nombre'
									bg='red'
									color='white'
								>
									<Button
										isDisabled
										leftIcon={<DownloadIcon />}
										colorScheme='orange'
									>
										Descargar pedido
									</Button>
								</Tooltip>
							) : (
								<Button leftIcon={<DownloadIcon />} colorScheme='orange'>
									Descargar pedido
								</Button>
							)}
						</PDFDownloadLink>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default Seleccionados;
