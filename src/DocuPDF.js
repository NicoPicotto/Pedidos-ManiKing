import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';

const DocuPDF = ({ nombre, nota, pedido, fecha }) => {
	return (
		<Document>
			<Page size='A4'>
				<View style={{ padding: '20px', width: '100%' }} wrap='true'>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'flex-start',
							width: '100%',
							justifyContent: 'space-between',
							marginBottom: '10px',
							borderBottomWidth: '3px',
							padding: '10px',
						}}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '60%',
							}}
						>
							<Text
								style={{
									fontSize: '12px',
									fontWeight: 'bold',
									marginBottom: '10px',
									textDecoration: 'underline',
								}}
							>
								DATOS GENERALES DEL PEDIDO
							</Text>
							<Text
								style={{
									fontSize: '12px',
									marginBottom: '10px',
								}}
							>
								Nombre: {nombre}
							</Text>
							<Text
								style={{
									fontSize: '12px',
									marginBottom: '10px',
								}}
							>
								Fecha: {fecha}
							</Text>
							<Text
								style={{
									fontSize: '12px',
									marginBottom: '10px',
								}}
							>
								Notas adicionales: {nota}
							</Text>
						</View>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								width: '30%',
							}}
						>
							<Image
								source={'./logo-mk.png'}
								style={{ width: '40%', marginBottom: '10px' }}
							/>
							<Text
								style={{
									fontSize: '10px',
									marginBottom: '5px',
								}}
							>
								pedidos@maniking.com.ar
							</Text>
							<Text
								style={{
									fontSize: '10px',
									marginBottom: '5px',
								}}
							>
								www.maniking.com.ar
							</Text>
						</View>
					</View>
					<View
						style={{
							width: '100%',
							padding: '10px',
							marginBottom: '5px',
						}}
					>
						{pedido.map((ped) => (
							<View
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									padding: '5px',
									marginBottom: '5px',
									justifyContent: 'space-between',
									borderBottom: '1px',
									borderBottomColor: 'black',
								}}
								key={ped.codigo}
							>
								<Text
									style={{
										fontSize: '12px',
										width: '50%',
									}}
								>
									{ped.nombre}
								</Text>
								<Text
									style={{
										fontSize: '12px',
									}}
								>
									{ped.codigo}
								</Text>
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
