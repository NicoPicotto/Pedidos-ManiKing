import { useEffect, useState, createContext, useContext } from 'react';
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
	const [pedido, setPedido] = useState([]);

    const [user, setUser] = useState({});

	const login = (loginEmail, loginPassword) => {
		return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsuscribed = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsuscribed();
		};
	}, []);


	return (
		<PedidoContext.Provider value={{pedido, setPedido, login, logout, user}}>
			{children}
		</PedidoContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(PedidoContext);
};
