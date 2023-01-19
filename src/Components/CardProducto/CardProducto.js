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
	const [cantidad, setCantidad] = useState(multiplo);

	const sumar = (cantidad) => {
		let sumado = cantidad + multiplo;
		setCantidad(sumado);
	};

    const restar = (cantidad) => {
        if (cantidad >= multiplo) {
            let restado = cantidad - multiplo;
            setCantidad(restado)
        }
        
    }

	return (
		<Flex w='250px' h='250px' flexDir='column' alignItems='center'>
			<Text>{nombre}</Text>
			<Text>{codigo}</Text>
			<Image src={imagen} />
			<Flex alignItems='center' p={1}>
				<Text>Cantidad: </Text>
				<Button
					bgColor='color.secundario'
					color='white'
					_hover={{ bgColor: 'color.primario' }}
					onClick={() => sumar(cantidad)}
				>
					+
				</Button>
				<Input type='number' value={cantidad} textAlign='center' />
				<Button
					bgColor='color.secundario'
					color='white'
					_hover={{ bgColor: 'color.primario' }}
                    onClick={() => restar(cantidad)}
				>
					-
				</Button>
			</Flex>
		</Flex>
	);
};

export default CardProducto;
