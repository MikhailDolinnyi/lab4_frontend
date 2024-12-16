import "./index.css";
import {Button} from "baseui/button";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import CoordinatePlate from "./plate";
import {ErrorText} from "../commons";
import CoordinateForm from "./form";
import Table from "./table";
import {useDispatch, useSelector} from "react-redux";
import {editName} from "../../usernameSlice";
import axiosInstance, {logout} from "../../axiosInstance";

function Home() {
    const error = useSelector((state) => state.usernameEditor.error);
    const name = useSelector((state) => state.usernameEditor.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // Запрос для получения данных пользователя
    async function fetchContent() {
        try {
            const response = await axiosInstance.get("/secured/user");
            dispatch(editName(response.data));
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
                <CoordinatePlate/>
                <ErrorText>{error}</ErrorText>
                <CoordinateForm/>
                <Table/>
            </div>
        </>
    );
}

export {Home};
