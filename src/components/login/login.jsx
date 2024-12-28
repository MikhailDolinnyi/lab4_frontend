import {Button} from "baseui/button";


import {Input} from "baseui/input";
import styled from "styled-components";
import {
    HeadingXXLarge,
    HeadingXLarge,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall,
    HeadingXSmall,
} from "baseui/typography";
import {
    Container,
    ErrorText,
    InnerContainer,
    InputWrapper,
    StyledInput,
    Head
} from "../commons";

import {useSignIn} from "react-auth-kit";
import {useFormik} from "formik";
import axios, {AxiosError} from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ref} from "yup";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {editName} from "../../redux/usernameSlice";


function Login(props) {
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const name = useSelector((state) => state.usernameEditor.username);
    const dispatch = useDispatch();

    const handleRedirect = () => {
        navigate("/register")
    }

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
        setError("");


        try {
            const response = await axios.post(
                "http://localhost:8080/auth/signin",
                values
            );
            console.log(response.status)



            const username = response.data.username
            const accessToken = response.data.accessToken
            const refreshToken = response.data.refreshTokenHash



            localStorage.setItem("username", username)
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)

            console.log(refreshToken)
            console.log(accessToken)



            navigate("/home")

        } catch (err) {

            if (err && err instanceof AxiosError)
                setError(err.response?.data.error);
            else if (err && err instanceof Error) setError(err.message);

            console.log("Error: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit,
    });

    return (
        <><Head>Долинный Михаил Владимирович, P3232, 8934</Head><Container>
            <InnerContainer>
                <form onSubmit={formik.handleSubmit}>
                    <HeadingXXLarge>Welcome Back!</HeadingXXLarge>
                    <ErrorText>{error}</ErrorText>
                    <InputWrapper>
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <StyledInput
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Username"
                                clearOnEscape
                                size="large"
                                type="text"/>
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
                                onBlur={formik.handleBlur}
                                placeholder="Password"
                                clearOnEscape
                                size="large"
                                type="password"/>
                            {formik.touched.password && formik.errors.password && (
                                <ErrorText>{formik.errors.password}</ErrorText>
                            )} </div>

                    </InputWrapper>
                    <InputWrapper>
                        <Button type="submit" isLoading={formik.isSubmitting}>
                            Login
                        </Button>
                        <Button onClick={handleRedirect}>
                            Go register
                        </Button>
                    </InputWrapper>

                </form>
            </InnerContainer>
        </Container></>

    );
}

export {Login};
