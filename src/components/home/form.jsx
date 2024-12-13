import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button} from "baseui/button";
import axios, {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {triggerRefresh, updateGraph} from "../../tableSlice"


function CoordinateForm() {
    const [error, setError] = useState("");
    const dispatch = useDispatch()


    const onSubmit = async (values) => {
        console.log("Values: ", values)
        setError("")

        try {
            const response = await axios.post(
                "http://localhost:8080/dot/check",
                values
            );

            dispatch(triggerRefresh())

        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);

            console.log("Error: ", err);
        }

    }


    const formik = useFormik({
        initialValues: {
            x: "0", // Начальное значение для ComboBox
            y: "", // Начальное значение для TextInput
            r: "3", // Начальное значение для ComboBox
        },
        validationSchema: Yup.object({
            y: Yup.number()
                .required("Y is required")
                .min(-3, "Y must be greater than or equal to -3")
                .max(3, "Y must be less than or equal to 3"),
            x: Yup.string().required("X is required"),
            r: Yup.number().required("Radius is required").min(1, "R must be greater than or equal to 1"),
        }),
        onSubmit
    });


    const handleRadiusChange = (e) => {
        formik.handleChange(e);
        dispatch(updateGraph(e.target.value))
    }

    return (
        <form id="forms" onSubmit={formik.handleSubmit}>

            {formik.touched.y && formik.errors.y && (
                <div style={{color: "red"}}>{formik.errors.y}</div>
            )}

            {formik.touched.x && formik.errors.x && (
                <div style={{color: "red"}}>{formik.errors.x}</div>
            )}

            {formik.touched.r && formik.errors.r && (
                <div style={{color: "red"}}>{formik.errors.r}</div>
            )}


            {/* ComboBox for X */}

            <div className="type-form">
                <label htmlFor="x-coordinate">X Coordinate:</label>
                <select id="x-coordinate" className="type-form"
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
            </div>


            {/* TextInput for Y */}
            <div className="type-form">
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
            </div>


            <div className="type-form">
                {/* ComboBox for Radius */}
                <label htmlFor="radius">Radius:</label>
                <select id="radius"
                        className="type-form"
                        name="r"
                        value={formik.values.r}
                        onChange={handleRadiusChange}
                        onBlur={formik.handleBlur}
                >
                    {["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <Button type="submit" isLoading={formik.isSubmitting}>
                Submit</Button>
        </form>
    );
}

export default CoordinateForm;
