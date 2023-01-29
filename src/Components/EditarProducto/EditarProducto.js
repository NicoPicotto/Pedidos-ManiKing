import React, { useState } from 'react';
import { db } from '../../firebase';
import {
	doc,
	updateDoc,
} from 'firebase/firestore';
import {
	Flex,
	Button,
	Checkbox,
	useCheckbox,
	useToast,
} from '@chakra-ui/react';

const EditarProducto = ({ data }) => {
	const [nuevoEstado, setNuevoEstado] = useState(data.estado);

	const toast = useToast();
	const { state } = useCheckbox();

	const handleUpdate = async (estado) => {
		const entradaRef = doc(db, 'productos', data.id);
		await updateDoc(entradaRef, {
			estado: nuevoEstado,
		});

		toast({
			title: '¡Estado actualizado!',
			status: 'success',
			duration: 7000,
			isClosable: true,
			variant: 'top-accent',
		});
	};

	console.log(data.nombre, nuevoEstado);

	return (
		<Flex
			flexDir='column'
			shadow='md'
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
                    borderRadius={5}
					colorScheme='gray'
					color='white'
					isChecked={nuevoEstado}
					value={nuevoEstado}
					onChange={(e) => setNuevoEstado(!nuevoEstado)}
				>
					{data.nombre}
				</Checkbox>
			</Flex>
			<Button onClick={() => handleUpdate(data.id, nuevoEstado)} colorScheme="gray" size="sm">
				Actualizar
			</Button>
		</Flex>
	);
};

export default EditarProducto;
