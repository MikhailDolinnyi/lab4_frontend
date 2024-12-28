import { Input } from "baseui/input";
import styled from "styled-components";
import {HeadingXXLarge} from "baseui/typography";

// Контейнер для всей страницы
export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #1c1c1c;


    

    
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Тень для визуального отделения */

`;

export const CenteredHeadingXXLarge = styled(HeadingXXLarge)`
  text-align: center;
  margin-bottom: 1rem;
`;



// Внутренний контейнер для формы
export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem; /* Уменьшил отступы */
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    background-color: #1c1c1c;
    width: 100%;
    max-width: 400px; /* Ограничил ширину формы */
`;

// Контейнер для полей ввода
export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1rem 0;

    // Добавлено для выравнивания кнопок рядом
    button {
        border-radius: 20px;
        margin: 0 0.5rem; /* Отступ между кнопками */
    }
    
    button:hover{
        background-color: aquamarine;
    }
`;


// Стили для поля ввода
export const StyledInput = styled(Input)`
    width: 100%;
    font-size: 16px;
    padding: 0.8rem; /* Немного больше отступов */
`;

// Стили для текста ошибок
export const ErrorText = styled.span`
    color: #eb5d5d;
    font-size: 14px;
    margin-top: 5px; /* Отступ сверху */
    width: 100%; /* Полностью под ширину поля */
    text-align: left; /* Выравнивание ошибки по левому краю */
`;


// Заголовок страницы
export const Head = styled.div`
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #ffffff;
    text-align: center;
    background-color: #1c1c1c;
    font-size: 40px;
    font-weight: bold;
    padding: 1rem 0;
`;

// Стили для кнопок
export const StyledButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1.5rem;
  font-size: 16px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;
