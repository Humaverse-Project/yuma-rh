import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getfichemetierentreprise } from "../../services/MetierService"

export const fetchItems = createAsyncThunk("fichesmetiers/fetchItems", async () => {
    const response = await getfichemetierentreprise();
    const datareponse = await response
    return datareponse;
});

const fichemetierSlice = createSlice({
    name: "fichesmetiers",
    initialState: {
        fichemetierentreprise: [],
        fichemetieryuma: [],
        status: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchItems.pending, (state) => {
            state.status = true;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
            state.status = false;
            console.log(action.payload)
            state.fichemetierentreprise = action.payload.postelist;
            state.fichemetieryuma = action.payload.postelistyuma;
        })
        .addCase(fetchItems.rejected, (state, action) => {
            state.status = false;
            state.error = action.error.message;
        });
    },
});


export default fichemetierSlice.reducer;