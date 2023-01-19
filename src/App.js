import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import Home from './Views/Home';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
