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


function Login(props) {
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/register")
    }

    const onSubmit = async (values) => {
        console.log("Values: ", values);
        setError("");


        try {
            const response = await axios.post(
                "http://localhost:8080/auth/signin",
                values
            );
            console.log(response.status)
            const token = response.data

            console.log(token)
            localStorage.setItem("token", token)



            navigate("/home")

        } catch (err) {

            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);

            console.log("Error: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit,
    });

    return (
        <><Head>Долинный Михаил Владимирович, P3232, 8934</Head><Container>
            <InnerContainer>
                <form onSubmit={formik.handleSubmit}>
                    <HeadingXXLarge>Welcome Back!</HeadingXXLarge>
                    <ErrorText>{error}</ErrorText>
                    <InputWrapper>
                        <StyledInput
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            placeholder="Username"
                            clearOnEscape
                            size="large"
                            type="text"/>
                    </InputWrapper>
                    <InputWrapper>
                        <StyledInput
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Password"
                            clearOnEscape
                            size="large"
                            type="password"/>
                    </InputWrapper>
                    <InputWrapper>
                        <Button primary isLoading={formik.isSubmitting}>
                            Login
                        </Button>
                        <Button type="submit" primary onClick={handleRedirect}>
                            Register
                        </Button>
                    </InputWrapper>

                </form>
            </InnerContainer>
        </Container></>

    );
}

export {Login};
