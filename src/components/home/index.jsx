import "./index.css"
import {Button} from "baseui/button";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CoordinatePlate from "./plate";
import axios, {AxiosError} from "axios";


import {ErrorText} from "../commons";
import CoordinateForm from "./form";
import Table from "./table";
import {useDispatch, useSelector} from "react-redux";
import {editName} from "../../usernameSlice";

function Home() {
    const error = useSelector((state) => state.usernameEditor.error);
    const name = useSelector((state) => state.usernameEditor.username); // Access username from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        navigate("/login");
    };

    async function fetchContent() {
        try {
            const response = await axios.get("http://localhost:8080/secured/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            dispatch(editName(response.data)); // Update username in Redux
        } catch (err) {
            console.error("Error fetching user:", err);
            logout();
        }
    }

    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <>
            <h1 id="greeting">Hello, {name}</h1>
            <Button id="logout-button" kind="primary" onClick={logout}>
                Logout
            </Button>

            <div id="main-container">
                <CoordinatePlate />
                <ErrorText>{error}</ErrorText>
                <CoordinateForm />
                <Table />
            </div>
        </>
    );
}

export { Home };
