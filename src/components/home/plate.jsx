import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {incrementScaleCounter, resetScaleCounter, triggerRefresh} from "../../redux/generalSlice";
import axiosInstance from "../../axiosInstance";

const Svg = styled.svg`
    margin-top: 3%;
    width: 100%;
    height: 500px;
`;

const Line = styled.line`
    stroke: silver;
    stroke-width: 2;
`;

const Polygon = styled.polygon`
    fill: white;
`;

const Rect = styled.rect`
    fill: white;
`;

const Path = styled.path`
    fill: white;
`;

const Text = styled.text`
    fill: white;
    font-size: 14px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
`;

function CoordinatePlate() {
    const table = useSelector((state) => state.tableEditor.table);
    const radius = useSelector((state) => state.tableEditor.radius);
    const loading = useSelector((state) => state.tableEditor.loading);
    const scaleCounter = useSelector((state) => state.tableEditor.scaleCounter);

    const dispatch = useDispatch();

    const beginPlate = 250;

    const [error, setError] = useState("");


    useEffect(() => {
        setError("")
        dispatch(resetScaleCounter());
    }, [radius, dispatch]);

    let scaleFactor = radius / 3;

    const handlePlateClick = async (event) => {
        const svg = event.currentTarget;
        const point = svg.createSVGPoint();

        point.x = event.clientX;
        point.y = event.clientY;

        const transformedPoint = point.matrixTransform(svg.getScreenCTM().inverse());

        const x = ((transformedPoint.x - beginPlate) / 33).toFixed(2);
        const y = ((beginPlate - transformedPoint.y) / 33).toFixed(2);

        const values = {
            x: parseFloat(x),
            y: parseFloat(y),
            r: radius,
        };


        // Валидация значений x и y
        if (values.x < -5 || values.x > 3) {
            setError("X must be between -5 and 3.");
            return; // Прекращаем выполнение, если x не проходит валидацию
        }
        if (values.y < -3 || values.y > 3) {
            setError("Y must be between -3 and 3.");
            return; // Прекращаем выполнение, если y не проходит валидацию
        }

        setError("")

        try {
            await axiosInstance.post("/dot/check", values);
            dispatch(incrementScaleCounter());
            dispatch(triggerRefresh());
        } catch (err) {
            console.error("Error sending dot:", err);
            setError("An error occurred while sending the dot.");
        }
    };

    const dots = loading
        ? []
        : table.map((dot, index) => {
            if (index >= table.length - scaleCounter) {
                return (
                    <circle
                        key={index}
                        cx={beginPlate + dot.x * 33}
                        cy={beginPlate - dot.y * 33}
                        r="2"
                        fill={dot.result ? "green" : "red"}
                    />
                );
            } else {
                return (
                    <circle
                        key={index}
                        cx={beginPlate + dot.x * 33 * scaleFactor}
                        cy={beginPlate - dot.y * 33 * scaleFactor}
                        r="2"
                        fill={dot.result ? "green" : "red"}
                    />
                );
            }
        });

    return (

        <>

            <Svg viewBox="0 0 500 500" onClick={handlePlateClick}>
                {/* Оси X и Y */}
                <Line x1="50" y1="250" x2="450" y2="250"/>
                <Line x1="250" y1="50" x2="250" y2="450"/>

                {/* Стрелки на концах осей */}
                <Polygon points="450,245 450,255 460,250"/>
                <Polygon points="245,50 255,50 250,40"/>

                {/* Прямоугольник */}
                <Rect x="251" y="251" width={100 * scaleFactor} height={50 * scaleFactor}/>

                {/* Полукруг в 4-й четверти */}
                <Path
                    d={`M ${250 - 100 * scaleFactor} 249 A ${100 * scaleFactor} ${100 * scaleFactor} 0 0 1 249 ${
                        250 - 100 * scaleFactor
                    } L 249 249 Z`}
                />

                {/* Треугольник в 1-й четверти */}
                <Polygon points={`251,249 251,${250 - 100 * scaleFactor} ${250 + 50 * scaleFactor},249`}/>

                {/* Метки на осях */}
                <Line x1={250 - 100 * scaleFactor} y1="245" x2={250 - 100 * scaleFactor} y2="255"/>
                <Line x1={250 + 100 * scaleFactor} y1="245" x2={250 + 100 * scaleFactor} y2="255"/>
                <Line x1="245" y1={250 - 100 * scaleFactor} x2="255" y2={250 - 100 * scaleFactor}/>
                <Line x1="245" y1={250 + 100 * scaleFactor} x2="255" y2={250 + 100 * scaleFactor}/>

                {/* Подписи к меткам */}
                <Text x={228 - 100 * scaleFactor} y="245">-R</Text>
                <Text x={253 + 100 * scaleFactor} y="245">R</Text>
                <Text x="260" y={260 + 100 * scaleFactor}>-R</Text>
                <Text x="260" y={254 - 100 * scaleFactor}>R</Text>

                {/* Подписи осей */}
                <Text x="260" y="50">Y</Text>
                <Text x="450" y="240">X</Text>

                {dots}

            </Svg>
            {error && <ErrorMessage>{error}</ErrorMessage>}

        </>
    );
}

export default CoordinatePlate;
