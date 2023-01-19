import { extendTheme } from '@chakra-ui/react';

const colors = {
	color: {
		primario: '#eb5d1c',
		secundario: '#f5b138',
		fondo: '#F2F2F2',
		fondoClaro: '#F6E4C4',
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
