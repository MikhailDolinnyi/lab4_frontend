import styled from "styled-components";
import {Button} from "baseui/button";
import React, {useEffect} from "react";
import CoordinatePlate from "./plate";
import CoordinateForm from "./form";
import Table from "./table";
import {useDispatch, useSelector} from "react-redux";
import {editName} from "../../redux/usernameSlice";
import {logout as performLogout} from "../../axiosInstance";

const BackgroundContainer = styled.div`
    background-color: ${(props) => props.bgColor || "#282c34"};
    min-height: 100vh; /* Занимает весь экран по высоте */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between; /* Разместить элементы по краям */
    align-items: center;
    background-color: #1c1c1c; /* Цвет фона */
    padding: 10px 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Тень для визуального отделения */

`;

const Greeting = styled.h1`
    color: white;
    margin: 0; /* Убрать отступы по умолчанию */
    font-size: 18px;
`;

const LogoutButton = styled(Button)`
    border-radius: 20px;
    margin-right: 30px;

    :hover {
        background-color: red;
    }
`;


const MainContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 5%;

`;

function Home() {
    const name = useSelector((state) => state.usernameEditor.username);
    const dispatch = useDispatch();

    useEffect(() => {
        // Если имя пользователя отсутствует в Redux, восстановите его из localStorage
        const storedName = localStorage.getItem("username");
        if (storedName) {
            dispatch(editName(storedName));
        }
    }, [dispatch]);

    const handleLogout = () => {
        performLogout(dispatch); // Передаём dispatch в функцию logout
    };


    return (
        <BackgroundContainer bgColor="#1c1c1c">
            <HeaderContainer>
                <Greeting>Hello, {name}</Greeting>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </HeaderContainer>

            <MainContainer>
                <CoordinatePlate/>
                <CoordinateForm/>
                <Table/>
            </MainContainer>
        </BackgroundContainer>
    );
}

export {Home};
