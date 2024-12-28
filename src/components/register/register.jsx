import {Button} from "baseui/button";

import {
    CenteredHeadingXXLarge,
    Container,
    ErrorText,
    Head,
    InnerContainer,
    InputWrapper,
    StyledInput
} from "../commons";

import {useFormik} from "formik";
import * as Yup from "yup"; // Импорт Yup
import axios, {AxiosError} from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/login");
    };

    // Определение схемы валидации
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required"), // Поле обязательно
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long") // Минимум 8 символов
            .required("Password is required"), // Поле обязательно
    });

    const onSubmit = async (values) => {
        console.log("Values: ", values);
        setError(""); // Сбрасываем предыдущую ошибку

        try {
            await axios.post("http://localhost:8080/auth/signup", values);
            navigate("/login"); // Перенаправление при успешной регистрации
        } catch (err) {
            if (err && err instanceof AxiosError) {
                // Извлекаем сообщение об ошибке из ответа сервера
                const serverMessage = err.response?.data || "An unexpected error occurred.";
                setError(serverMessage); // Сохраняем сообщение об ошибке
            } else if (err && err instanceof Error) {
                setError(err.message);
            }
            console.log("Error: ", err);
        }
    };


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema, // Подключаем схему валидации
        onSubmit,
    });

    return (
        <>
            <Head>Долинный Михаил Владимирович, P3232, 8934</Head>
            <Container>

                <InnerContainer>
                    <form onSubmit={formik.handleSubmit}>
                        <CenteredHeadingXXLarge>Let's register</CenteredHeadingXXLarge>

                        <ErrorText>{error}</ErrorText>
                        <InputWrapper>
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <StyledInput
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Отслеживание фокуса
                                    placeholder="Username"
                                    clearOnEscape
                                    size="large"
                                    type="text"
                                />
                                {formik.touched.username && formik.errors.username && (
                                    <ErrorText>{formik.errors.username}</ErrorText>
                                )} </div>
                        </InputWrapper>
                        <InputWrapper>
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <StyledInput
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Отслеживание фокуса
                                    placeholder="Password"
                                    clearOnEscape
                                    size="large"
                                    type="password"
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <ErrorText>{formik.errors.password}</ErrorText>
                                )} </div>
                        </InputWrapper>
                        <InputWrapper>
                            <Button type="submit" isLoading={formik.isSubmitting}>
                                Register
                            </Button>
                            <Button onClick={handleRedirect}>
                                Go login
                            </Button>
                        </InputWrapper>
                    </form>
                </InnerContainer>
            </Container>
        </>
    );
}

export {Register};
