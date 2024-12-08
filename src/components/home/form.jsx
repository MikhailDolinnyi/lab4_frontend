import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button} from "baseui/button";
import axios, {AxiosError} from "axios";


function CoordinateForm() {
    const [error, setError] = useState("");
    const onSubmit = async (values) => {
        console.log("Values: ", values)
        setError("")

        try {
            const response = await axios.post(
                "http://localhost:8080/api/check-dot",
                values
            );

        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);

            console.log("Error: ", err);
        }

    }


    const formik = useFormik({
        initialValues: {
            x: "-5", // Начальное значение для ComboBox
            y: "", // Начальное значение для TextInput
            r: "1", // Начальное значение для ComboBox
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
                <label htmlFor="x">X Coordinate:</label>
                <select className="type-form"
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
                <label htmlFor="y">Y Coordinate (-3 to 3):</label>
                <input
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
                <label htmlFor="r">Radius:</label>
                <select className="type-form"
                        name="r"
                        value={formik.values.r}
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

            {/* Submit Button */}
            <Button primary isLoading={formik.isSubmitting}>
                Submit</Button>
        </form>
    );
}

export default CoordinateForm;
