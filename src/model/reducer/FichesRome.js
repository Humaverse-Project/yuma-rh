import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getdataromeficheposte } from "../../services/MetierService"

export const fetchRome = createAsyncThunk("fichesrome/fetchRome", async (code) => {
    const response = await getdataromeficheposte(code);
    const datareponse = await response
    return datareponse;
});

const fichesromeSlice = createSlice({
    name: "fichesrome",
    initialState: {
        definition: [],
        rome: [],
        access: [],
        appelation: [],
        competance: {},
        context: {},
        mobilite: [],
        status: true,
        competanceupdated: false,
        extrafieldadded: false,
        error: null,
    },
    reducers: {
        updatecompetance: (state, action) => {
            state.competance = action.payload
            state.competanceupdated = true
        },
        addextracontext: (state, action) => {
            state.context = {...state.context, ...action.payload}
            state.extrafieldadded = true
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRome.pending, (state) => {
            state.status = true;
        })
        .addCase(fetchRome.fulfilled, (state, action) => {
            state.competanceupdated = false;
            state.extrafieldadded=  false;
            state.status = false;
            state.rome = action.payload.rome;
            state.definition = action.payload.rome.rome_definition.split("\\n");
            state.access = action.payload.rome.rome_acces_metier.split("\\n");
            state.appelation = action.payload.appelation;
            const groupedData = {};
            action.payload.briquecompetancerome.forEach((item) => {
                const categorie = item.compGb.compGbCategorie;
                const titre = item.compGb.compGbTitre;
                if (!groupedData[categorie]) {
                    groupedData[categorie] = {};
                }
                if (!groupedData[categorie][titre]) {
                    groupedData[categorie][titre] = [];
                }
                groupedData[categorie][titre].push(item);
            });
            state.competance = groupedData;
            const dataT = action.payload.briquecontexte;
            const groupedDataT = {};
            dataT.forEach((item) => {
                const titre = item.contexte.ctxTrvTitre;
                if (!groupedDataT[titre]) {
                    groupedDataT[titre] = [];
                }
                groupedDataT[titre].push(item);
            });
            state.context = groupedDataT
            state.mobilite = {
                romeevolution: action.payload.rome.romeevolution,
                romeproche: action.payload.rome.romeproche,
            }
        })
        .addCase(fetchRome.rejected, (state, action) => {
            state.status = false;
            state.error = action.error.message;
        });
    },
});

export const { updatecompetance, addextracontext } = fichesromeSlice.actions;

export default fichesromeSlice.reducer;