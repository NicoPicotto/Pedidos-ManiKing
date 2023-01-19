import React from 'react';
import { Flex, Heading, Text, Image, Divider } from '@chakra-ui/react';

const Seleccionados = () => {
	return (
		<Flex w='35%' flexDir='column' p={5} bgColor="color.fondoClaro">
			<Heading>Tu pedido</Heading>
			<Divider borderColor='color.primario' marginBlock={2} />
		</Flex>
	);
};

export default Seleccionados;
