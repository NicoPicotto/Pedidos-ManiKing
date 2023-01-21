import React from 'react';
import { Flex } from '@chakra-ui/react';
import Lista from '../Components/Lista/Lista';
import Seleccionados from '../Components/Seleccionados/Seleccionados';

const Home = () => {
	return (
		<Flex
			h='100vh'
			w='100vw'
			bgColor='color.fondo'
			overflow='hidden'
			justifyContent='space-between'
		>
			<Lista />
			<Seleccionados />
		</Flex>
	);
};

export default Home;
