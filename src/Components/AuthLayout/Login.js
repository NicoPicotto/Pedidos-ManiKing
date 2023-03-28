import React, { useState } from "react";
import {
    Stack,
    Text,
    Image,
    Input,
    Button,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context";
import logo from "../../assets/logo.png";

const Login = () => {
    const { login, resetPassword } = UserAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await login(user.email, user.password);
            setIsLoading(false);
            navigate("/lista");
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Email o contraseña incorrectas.",
                status: "error",
                duration: 7000,
                isClosable: true,
                variant: "top-accent",
            });
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email)
            return setError("Escribí un mail para recuperar tu contraseña.");
        try {
            await resetPassword(user.email);
            setError("Te enviamos un correo para resetear tu password.");
        } catch (error) {
            setError("Email inválido.");
        }
    };

    return (
        <Stack
            w="md"
            align="center"
            bgColor="white"
            justify="center"
            borderRadius={5}
            shadow="lg"
            padding={5}
            as="form"
            onSubmit={submitHandler}
        >
            <Stack direction="column" align="center" h="100%">
                <Stack w="40%" justify="center">
                    <Image src={logo} />
                </Stack>
                <Stack align="center" w="100%" spacing={5}>
                    <Stack
                        w="100%"
                        spacing={5}
                        paddingInline={5}
                        marginBottom={3}
                    >
                        <Stack>
                            <Text
                                margin={0}
                                fontSize="sm"
                                as="b"
                                color="color.secundario"
                            >
                                Correo electrónico
                            </Text>
                            <Input
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                                variant="outline"
                                placeholder="juanperez@gmail.com"
                                type="email"
                                focusBorderColor="color.primario"
                                isRequired
                            />
                        </Stack>
                        <Stack>
                            <Text
                                margin={0}
                                fontSize="sm"
                                color="color.secundario"
                                as="b"
                            >
                                Contraseña
                            </Text>
                            <Input
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                                variant="outline"
                                placeholder="*********"
                                type="password"
                                focusBorderColor="color.primario"
                                isRequired
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction="column" w="100%" paddingInline={5}>
                    <Button
                        type="submit"
                        marginBottom={2}
                        color="white"
                        colorScheme="orange"
                    >
                        {isLoading ? (
                            <Spinner color="white" />
                        ) : (
                            "Iniciá sesión"
                        )}
                    </Button>
                    <Button
                        variant="link"
                        onClick={handleResetPassword}
                        marginTop={5}
                    >
                        ¿Olvidaste tu contraseña?
                    </Button>
                </Stack>

                {error && (
                    <Text color="red" fontSize="sm">
                        {error}
                    </Text>
                )}
            </Stack>
        </Stack>
    );
};

export default Login;
