import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const DocuPDF = ({ nombre, nota, pedido, fecha }) => {
	return (
		<Document>
			<Page size='A4'>
				<View style={{ padding: '10px', width: "100%" }}wrap="true">
					<View
						style={{
							marginBottom: '10px',
							borderBottomWidth: '1px',
							padding: '10px',
						}}
					>
						<Text style={{ fontSize: '12px' }}>Nombre: {nombre}</Text>
						<Text style={{ fontSize: '12px' }}>Fecha: {fecha}</Text>
						<Text style={{ fontSize: '12px' }}>Notas adicionales: {nota}</Text>
					</View>
					<View style={{ padding: '10px', marginBottom: '5px' }}>
						{pedido.map((ped) => (
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginBottom: '5px',
								}}
								key={ped.codigo}
							>
								<Text style={{ fontSize: '12px', marginRight: '5px' }}>
									{ped.nombre} ({ped.codigo})
								</Text>
								<Text style={{ fontSize: '12px', marginRight: '5px' }}>|</Text>
								<Text style={{ fontSize: '12px' }}>
									{' '}
									{ped.cantidad} unidades
								</Text>
							</View>
						))}
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default DocuPDF;
