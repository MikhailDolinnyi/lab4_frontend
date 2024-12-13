import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {incrementScaleCounter, resetScaleCounter, triggerRefresh} from "../../tableSlice";

function CoordinatePlate() {
    const table = useSelector((state) => state.tableEditor.table)
    const radius = useSelector((state) => state.tableEditor.radius)
    const refreshTable = useSelector((state)=>state.tableEditor.refreshTable)
    const loading = useSelector((state) => state.tableEditor.loading)
    const scaleCounter = useSelector((state) => state.tableEditor.scaleCounter)

    const dispatch = useDispatch();

    const beginPlate = 250;
    const width = 500;
    const height = 500;

    useEffect(() => {
        dispatch(resetScaleCounter())
    }, [radius,dispatch]);

    let scaleFactor = radius / 3


    const handlePlateClick = async (event) => {

        const svg = event.currentTarget
        const point = svg.createSVGPoint()

        point.x = event.clientX
        point.y = event.clientY

        const transformedPoint = point.matrixTransform(svg.getScreenCTM().inverse())


        const x = ((transformedPoint.x - beginPlate) / 33).toFixed(2)
        const y = ((beginPlate - transformedPoint.y) / 33).toFixed(2)

        const values = {
            x: parseFloat(x),
            y: parseFloat(y),
            r: radius,
        };

        try {
            await axios.post(
                "http://localhost:8080/dot/check",
                values
            );

            dispatch(incrementScaleCounter())
            dispatch(triggerRefresh());
        } catch (err) {
            console.error("Error sending dot:", err);
        }
    }


    const dots = loading ? [] : table.map((dot, index) => {
        // Check if the dot is one of the last `scaleCounter` dots
        if (index >= table.length - scaleCounter) {
            return (
                <circle
                    key={index}
                    cx={beginPlate + (dot.x * 33)}
                    cy={beginPlate - (dot.y * 33)}
                    r="2"
                    fill={dot.result ? "green" : "red"}
                />
            );
        } else {
            // Remaining dots with scaling
            return (
                <circle
                    key={index}
                    cx={beginPlate + (dot.x * 33 * scaleFactor)}
                    cy={beginPlate - (dot.y * 33 * scaleFactor)}
                    r="2"
                    fill={dot.result ? "green" : "red"}
                />
            );
        }
    });



    return (
        <svg id="coordinate-plate" width={width} height={height} viewBox="0 0 500 500"
             xmlns="http://www.w3.org/2000/svg" onClick={handlePlateClick}>
            {/* Оси X и Y */}
            <line x1="50" y1="250" x2="450" y2="250" stroke="silver" strokeWidth="2"/>
            <line x1="250" y1="50" x2="250" y2="450" stroke="silver" strokeWidth="2"/>

            {/* Стрелки на концах осей */}
            <polygon points="450,245 450,255 460,250" fill="silver"/>
            <polygon points="245,50 255,50 250,40" fill="silver"/>

            {/* Прямоугольник */}
            <rect x="251" y="251" width={100 * scaleFactor} height={50 * scaleFactor} fill="white"/>

            {/* Полукруг в 4-й четверти */}
            <path
                d={`M ${250 - (100 * scaleFactor)} 249 A ${100 * scaleFactor} ${100 * scaleFactor} 0 0 1 249 ${250 - (100 * scaleFactor)} L 249 249 Z`}
                fill="white"/>


            {/* Треугольник в 1-й четверти */}
            <polygon points={`251,249 251,${250 - 100 * scaleFactor} ${250 + 50 * scaleFactor},249`} fill="white"/>

            {/* Метки на осях */}
            <line x1={250 - (100 * scaleFactor)} y1="245" x2={250 - (100 * scaleFactor)} y2="255" stroke="silver"
                  strokeWidth="2"/>
            <line x1={250 + (100 * scaleFactor)} y1="245" x2={250 + (100 * scaleFactor)} y2="255" stroke="silver"
                  strokeWidth="2"/>
            <line x1="245" y1={250 - (100 * scaleFactor)} x2="255" y2={250 - (100 * scaleFactor)} stroke="silver"
                  strokeWidth="2"/>
            <line x1="245" y1={250 + (100 * scaleFactor)} x2="255" y2={250 + (100 * scaleFactor)} stroke="silver"
                  strokeWidth="2"/>

            {/* Подписи к меткам */}
            <text x={228 - (100 * scaleFactor)} y="245" className="small" fill="white">-R</text>
            <text x={253 + (100 * scaleFactor)} y="245" className="small" fill="white">R</text>
            <text x="260" y={260 + (100 * scaleFactor)} className="small" fill="white">-R</text>
            <text x="260" y={254 - (100 * scaleFactor)} className="small" fill="white">R</text>

            {/* Подписи осей */}
            <text x="260" y="50" fill="white">Y</text>
            <text x="450" y="240" fill="white">X</text>

            {dots}
        </svg>
    );
}

export default CoordinatePlate;
