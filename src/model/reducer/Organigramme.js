import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loaddata } from "../../services/OrganigrammeService"

function formatToTree(data, parentId = null, k=0) {
    const tree = [];
    data.forEach(item => {
        if (item.organigrammeNplus1 === parentId) {
            const children = formatToTree(data, item.id, (k+1));
            if (children.length > 0) {
                item.children = children;
            }
            item.postion = k
            tree.push(item);
        }
    });

    return tree;
}

const formatagedata = function(data){
    console.log(data)
    let postorg = data.organigramme.map((poste) => {
        let titre = poste.orgIntitulePoste
        if (poste.organigrammeNplus1 !== null) {
            poste.organigrammeNplus1 = "P_"+poste.organigrammeNplus1
        } else {
            poste.organigrammeNplus1 = "P_0"
        }
        let metiertitre = null
        if (poste.fichesPostes !== null) {
            metiertitre = poste.fichesPostes.fiches_postes_titre
        }
        let personne = ""
        let personneid = ""
        if (poste.personnes !== null) {
            personne = poste.personnes.personneNom
            personneid = poste.personnes.id
        }
        return {
            titre: titre,
            personne: personne,
            id: "P_"+poste.id,
            _id: poste.id,
            organigrammeNplus1: poste.organigrammeNplus1,
            imageUrl: '',
            personneid: personneid,
            metiertitre: metiertitre
        }
    })
    postorg.unshift(
    {titre: "",
        id: 'P_0',
        _id: 0,
        personne: "",
        organigrammeNplus1: null
    });
    postorg = formatToTree(postorg, null)
    return postorg[0]
}

export const fetchPoste = createAsyncThunk("organigramme/fetchPoste", async () => {
    const response = await loaddata();
    const datareponse = await response
    return datareponse;
});

const organigrammeSlice = createSlice({
    name: "organigramme",
    initialState: {
        data: {},
        titrelist: [],
        ficheposte: [],
        dataPersonne: [],
        status: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPoste.pending, (state) => {
            state.status = true;
        })
        .addCase(fetchPoste.fulfilled, (state, action) => {
            state.status = false;
            state.data = formatagedata(action.payload);
            state.titrelist = action.payload.organigramme.map(poste=> poste.orgIntitulePoste);
            state.ficheposte = action.payload.organigramme;
            state.dataPersonne = action.payload.personnelist.map((personne) => {
                return {
                    label:
                        personne.personneNom +
                        ' ' +
                        personne.personnePrenom,
                    id: personne.id,
                }
            })
        })
        .addCase(fetchPoste.rejected, (state, action) => {
            state.status = false;
            state.error = action.error.message;
        });
    },
});


export default organigrammeSlice.reducer;