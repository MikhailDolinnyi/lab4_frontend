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


function Register(props) {
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/login")
    }

    const onSubmit = async (values) => {
        console.log("Values: ", values);
        setError("");


        try {
            const response = await axios.post(
                "http://localhost:8080/auth/signup",
                values
            );

            navigate("/login")


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
                    <HeadingXXLarge>Let's register</HeadingXXLarge>
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
                        <Button primary type="submit" isLoading={formik.isSubmitting}>
                            Register
                        </Button>
                        <Button primary
                                onClick={handleRedirect}>
                            Login
                        </Button>

                    </InputWrapper>

                </form>
            </InnerContainer>
        </Container></>

    );
}

export {Register};
