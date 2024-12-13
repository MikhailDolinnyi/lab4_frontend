import React from "react";
import {useDispatch, useSelector} from "react-redux";

function CoordinatePlate() {
    const table = useSelector((state) => state.tableEditor.table)
    const dispatch = useDispatch();
    const radius = useSelector((state) => state.tableEditor.radius)

    const width = 500;
    const height = 500;

    let scaleFactor = radius / 3


    const dots = table.map((dot, index) => (
        <circle key={index} cx={width / 2 + (dot.x * 33)} cy={width / 2 - (dot.y * 33)} r="2"
                fill={dot.result ? "green" : "red"}/>)
    )


    return (
        <svg id="coordinate-plate" width={width} height={height} viewBox="0 0 500 500"
             xmlns="http://www.w3.org/2000/svg">
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
