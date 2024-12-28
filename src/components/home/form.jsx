import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "baseui/button";
import { useDispatch } from "react-redux";
import { triggerRefresh, updateGraph } from "../../redux/generalSlice";
import axiosInstance from "../../axiosInstance";
import styled from "styled-components";

const FormContainer = styled.form`
    margin-top: 20px; /* Установить фиксированный отступ */
    width: 200px; /* фиксированная ширина */
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    
    button{
        color: black;
        border: 2px solid grey;
        border-radius: 20px;
    }
    button:hover{
        background-color: aquamarine;
    }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

function CoordinateForm() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();


    const onSubmit = async (values) => {
        console.log("Values: ", values);
        setError("");

        try {
            await axiosInstance.post("/dot/check", values);
            dispatch(triggerRefresh());
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            x: "0",
            y: "",
            r: "3",
        },
        validationSchema: Yup.object({
            y: Yup.number()
                .required("Y is required")
                .min(-3, "Y must be greater than or equal to -3")
                .max(3, "Y must be less than or equal to 3"),
            x: Yup.string().required("X is required"),
            r: Yup.number().required("Radius is required").min(1, "R must be greater than or equal to 1"),
        }),
        onSubmit,
    });

    const handleRadiusChange = (e) => {
        formik.handleChange(e);
        dispatch(updateGraph(e.target.value));
    };

    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            {formik.touched.y && formik.errors.y && <ErrorText>{formik.errors.y}</ErrorText>}
            {formik.touched.x && formik.errors.x && <ErrorText>{formik.errors.x}</ErrorText>}
            {formik.touched.r && formik.errors.r && <ErrorText>{formik.errors.r}</ErrorText>}

            <InputContainer>
                <label htmlFor="x-coordinate">X Coordinate:</label>
                <select
                    id="x-coordinate"
                    name="x"
                    value={formik.values.x}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    {["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </InputContainer>

            <InputContainer>
                <label htmlFor="y-coordinate">Y Coordinate (-3 to 3):</label>
                <input
                    id="y-coordinate"
                    type="number"
                    name="y"
                    value={formik.values.y}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="-3 to 3"
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="radius">Radius:</label>
                <select
                    id="radius"
                    name="r"
                    value={formik.values.r}
                    onChange={handleRadiusChange}
                    onBlur={formik.handleBlur}
                >
                    {["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"].map((option) => (
                        <option key={option} value={option} disabled={+option <1}>
                            {option}
                        </option>
                    ))}
                </select>
            </InputContainer>

            <Button type="submit" isLoading={formik.isSubmitting}>
                Submit
            </Button>
        </FormContainer>
    );
}

export default CoordinateForm;
