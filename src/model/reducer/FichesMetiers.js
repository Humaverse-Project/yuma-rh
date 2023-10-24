import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getfichemetierentreprise } from "../../services/MetierService"

export const fetchMetier = createAsyncThunk("fichesmetiers/fetchMetier", async () => {
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
        .addCase(fetchMetier.pending, (state) => {
            state.status = true;
        })
        .addCase(fetchMetier.fulfilled, (state, action) => {
            state.status = false;
            state.fichemetierentreprise = action.payload.postelist;
            state.fichemetieryuma = action.payload.postelistyuma;
        })
        .addCase(fetchMetier.rejected, (state, action) => {
            state.status = false;
            state.error = action.error.message;
        });
    },
});


export default fichemetierSlice.reducer;