import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault } from "../auth/operations";

export const fetchAllUsers = createAsyncThunk(
    "users/fetchAll",
    async (_, thunkAPI) => {

        try {
            const res = await axiosDefault.get("/users")
            return res.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }

)