import React, { children } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../Context";

const ProtectedRoutes = ({ children }) => {
	const { user } = UserAuth();

	if (!user) {
		return <Navigate to='/' />;
	}

	return children;
};

export default ProtectedRoutes;
