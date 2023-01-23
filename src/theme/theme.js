import { extendTheme } from '@chakra-ui/react';

const colors = {
	color: {
		primario: '#eb5d1c',
		secundario: '#5C3727',
		fondo: '#F7F7F7',
		fondoClaro: '#EDEDED',
	},
};

// const fonts = {
// 	fonts: {
// 		primaria: `'Rozha One', regular !important`,
// 		secundaria: `'Quicksand', sans-serif !important`,
// 	},
// };

const theme = extendTheme({ colors });

export default theme;
