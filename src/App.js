import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { PedidoProvider } from "./Context";
import theme from "./theme/theme";
import Home from "./Views/Home";
import Admin from "./Views/Admin";
import LoginView from "./Views/LoginView";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <PedidoProvider>
                    <Routes>
                        <Route path="/" element={<LoginView />} />
                        <Route
                            path="/lista"
                            element={
                                <ProtectedRoutes>
                                    <Home />
                                </ProtectedRoutes>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoutes>
                                    <Admin />
                                </ProtectedRoutes>
                            }
                        />
                    </Routes>
                </PedidoProvider>
            </Router>
        </ChakraProvider>
    );
};

export default App;
