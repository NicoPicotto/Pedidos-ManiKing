import React from 'react';
import { Flex } from '@chakra-ui/react';
import AdminLayout from '../Components/AdminLayout/AdminLayout';

const Admin = () => {
	return (
		<Flex
			h='100vh'
			w='100vw'
			bgColor='color.fondo'
			overflow='hidden'
			justifyContent='space-between'
		>
			<AdminLayout />
		</Flex>
	);
};

export default Admin;
