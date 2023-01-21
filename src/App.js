import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PedidoProvider } from './Context';
import theme from './theme/theme';
import Home from './Views/Home';
import DocuPDF from './DocuPDF';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<PedidoProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</Router>
			</PedidoProvider>
		</ChakraProvider>
	);
};

export default App;
