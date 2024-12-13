import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editTable} from "../../tableSlice";

function Table() {

    const table = useSelector((state) => state.tableEditor.table)
    const refreshTable = useSelector((state) => state.tableEditor.refreshTable)
    const dispatch = useDispatch();



    async function fill_table() {
        try {
            const response = await axios.get("http://localhost:8080/dot/get-list");
            dispatch(editTable(response.data))
        } catch (e) {
            console.error("Error fetching table data:", e);
        }
    }

    useEffect(() => {
        // Handle the promise returned by fill_table
        fill_table();
    }, [refreshTable]);

    // Ensure you return JSX from the map function
    const listDot = table.map((dot, index) => (
        <tr key={index}>
            <td className="results">{dot.x}</td>
            <td className="results">{dot.y}</td>
            <td className="results">{dot.r}</td>
            <td className="results">{dot.executionTime}</td>
            <td className="results">{dot.time}</td>
            <td className="results">{dot.result ? "True" : "False"}</td>
        </tr>
    ));

    return (
        <table id="result-table">

            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Time</th>
                <th>Now</th>
                <th>Result</th>
            </tr>
            </thead>
            <tbody>

            {listDot}</tbody>
        </table>
    );
}

export default Table;