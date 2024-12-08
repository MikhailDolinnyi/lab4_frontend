import "./index.css"
import {Button} from "baseui/button";
import {useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CoordinatePlate from "./plate";
import {useFormik} from "formik";
import axios, {AxiosError} from "axios";


import {
    Container,
    ErrorText,
    InnerContainer,
    InputWrapper,
    StyledInput,
    Head
} from "../commons";
import {Combobox} from "baseui/combobox";
import Form from "./form";
import CoordinateForm from "./form";

function Home() {
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const logout = () => {

        navigate("/login");
    };

    async function fetchContent() {

        try {

            const response = await axios.get(
                "http://localhost:8080/secured/user", {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")

                    }

                }
            );


        }catch (err) {
            console.log("Error")
            logout()
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);

            console.log("Error: ", err);
        }


    }

    useEffect(() => {
        fetchContent();
    }, []);


    return (
        <>
            <Button id="logout-button" kind="primary" onClick={logout}>
                Logout
            </Button>

            <div id="main-container">
                <CoordinatePlate/>
                <ErrorText>{error}</ErrorText>
                <CoordinateForm></CoordinateForm>
            </div>
        </>

    );
}

export {Home};
