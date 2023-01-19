import React, { useState } from 'react';
import {
	Flex,
	Image,
	Text,
	Heading,
	useMediaQuery,
	Input,
	Button,
} from '@chakra-ui/react';

const CardProducto = ({ nombre, codigo, imagen, multiplo }) => {
	const [cantidad, setCantidad] = useState(0);

	const sumar = (cantidad) => {
		let sumado = cantidad + multiplo;
		setCantidad(sumado);
	};

	const restar = (cantidad) => {
		if (cantidad >= multiplo) {
			let restado = cantidad - multiplo;
			setCantidad(restado);
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
            shadow="md"
		>
			<Text as="b">{nombre}</Text>
			<Text fontSize="sm" as="i">{codigo}</Text>
			<Image src={imagen} w="150px" p={2}/>
			<Flex alignItems='center' w="80%" marginBottom={1}>
				<Button
					bgColor='color.secundario'
					color='white'
					_hover={{ bgColor: 'color.primario' }}
					onClick={() => restar(cantidad)}
                    margin={1}
				>
					-
				</Button>
				<Input type='number' value={cantidad} textAlign='center' margin={1}/>

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
            <Button w="100%" colorScheme="green">Agregar</Button>
		</Flex>
	);
};

export default CardProducto;
