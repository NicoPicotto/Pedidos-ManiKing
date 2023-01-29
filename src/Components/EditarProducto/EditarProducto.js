import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc, orderBy } from 'firebase/firestore';
import { Flex, Button, Checkbox, useToast } from '@chakra-ui/react';

const EditarProducto = ({ data }) => {
	const [nuevoEstado, setNuevoEstado] = useState(data.estado);

	const toast = useToast();

	const handleUpdate = async (estado) => {
		const entradaRef = doc(db, 'productos', data.id);
		await updateDoc(entradaRef, {
			estado: nuevoEstado,
		});

		{
			data.estado
				? toast({
						title: 'El producto no se mostrará',
						description: `"El producto ${data.nombre} ya no se mostrará como disponible."`,
						status: 'error',
						duration: 7000,
						isClosable: true,
						variant: 'top-accent',
				  })
				: toast({
						title: 'Producto visible',
						description: `"El producto ${data.nombre} ahora se muestra disponible."`,
						status: 'success',
						duration: 7000,
						isClosable: true,
						variant: 'top-accent',
				  });
		}
	};

	return (
		<Flex
			flexDir='column'
			opacity={nuevoEstado ? 1 : 0.4}
			shadow='md'
			w="350px"
			borderRadius={5}
			p={3}
			transition='0.2s'
			_hover={{ shadow: 'lg' }}
			bgColor={data.color}
		>
			<Flex>
				<Checkbox
					key={data.id}
					marginBottom={2}
					colorScheme='whiteAlpha'
					color='white'
					isChecked={nuevoEstado}
					value={nuevoEstado}
					onChange={(e) => setNuevoEstado(!nuevoEstado)}
				>
					{data.nombre}
				</Checkbox>
			</Flex>
			<Button
				onClick={() => handleUpdate(data.id, nuevoEstado)}
				colorScheme='gray'
				size='sm'
			>
				Actualizar
			</Button>
		</Flex>
	);
};

export default EditarProducto;
