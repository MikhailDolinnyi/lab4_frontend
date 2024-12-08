import React from "react";

function CoordinatePlate() {
    const width = 500;
    const height = 500;
    const r = 100;

    return (
        <svg id="coordinate-plate" width={width} height={height} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            {/* Оси X и Y */}
            <line x1="50" y1="250" x2="450" y2="250" stroke="silver" strokeWidth="2" />
            <line x1="250" y1="50" x2="250" y2="450" stroke="silver" strokeWidth="2" />

            {/* Стрелки на концах осей */}
            <polygon points="450,245 450,255 460,250" fill="silver" />
            <polygon points="245,50 255,50 250,40" fill="silver" />

            {/* Прямоугольник */}
            <rect x="251" y="251" width="100" height="50" fill="white" />

            {/* Полукруг в 4-й четверти */}
            <path d="M 150 249 A 100 100 0 0 1 249 150 L 249 249 Z" fill="white" />

            {/* Треугольник в 1-й четверти */}
            <polygon points="251,249 251,150 300,249" fill="white" />

            {/* Метки на осях */}
            <line x1="150" y1="245" x2="150" y2="255" stroke="silver" strokeWidth="2" />
            <line x1="350" y1="245" x2="350" y2="255" stroke="silver" strokeWidth="2" />
            <line x1="245" y1="150" x2="255" y2="150" stroke="silver" strokeWidth="2" />
            <line x1="245" y1="350" x2="255" y2="350" stroke="silver" strokeWidth="2" />

            {/* Подписи к меткам */}
            <text x="128" y="245" className="small" fill="white">-R</text>
            <text x="353" y="245" className="small" fill="white">R</text>
            <text x="260" y="360" className="small" fill="white">-R</text>
            <text x="260" y="154" className="small" fill="white">R</text>

            {/* Подписи осей */}
            <text x="260" y="50" fill="white">Y</text>
            <text x="450" y="240" fill="white">X</text>
        </svg>
    );
}

export default CoordinatePlate;
