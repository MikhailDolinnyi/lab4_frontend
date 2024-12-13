import {configureStore} from "@reduxjs/toolkit";
import usernameReducer from './usernameSlice'
import tableReducer from './tableSlice'

export default configureStore({
    reducer: {
        usernameEditor: usernameReducer,
        tableEditor : tableReducer
    },
})

