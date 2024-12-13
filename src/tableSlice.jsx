import {createSlice} from "@reduxjs/toolkit";

export const tableSlice = createSlice({
    name: 'tableEditor',
    initialState:{
        table:[],
        refreshTable: false,
        radius:3,
    },
    reducers:{
        editTable: (state,action) => {
            state.table = action.payload

        },
        triggerRefresh: (state)  => {
            state.refreshTable = !state.refreshTable
        },
        updateGraph(state,action){
            state.radius = action.payload
        }
    }

})

export const {editTable, triggerRefresh, updateGraph} = tableSlice.actions

export default tableSlice.reducer