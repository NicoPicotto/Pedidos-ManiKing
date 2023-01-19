import React from 'react';
import { Link, useDisclosure, Button, Flex, Heading } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link as ReachLink } from 'react-router-dom';

const Sidebar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [placement, setPlacement] = React.useState('left');

	return (
		<Flex alignItems='center' left={0} position='fixed' zIndex={10}>
			<Link
				as={ReachLink}
				to='/'
				w='100%'
				p={2}
				margin='0'
				_hover={{ textDecor: 'none' }}
			>
				<Button
					size='md'
                    bgColor="color.secundario"
					color='white'
					transition='0.2s'
					_hover={{ bgColor: 'color.primario' }}
				>
					<AddIcon marginRight={2} fontSize='sm' />
					Nuevo pedido
				</Button>
			</Link>
		</Flex>
	);
};

export default Sidebar;
