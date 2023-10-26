import { configureStore } from "@reduxjs/toolkit";
import Organigramme from "./model/reducer/Organigramme";
import FichesMetiers from "./model/reducer/FichesMetiers";
import FichesRome from "./model/reducer/FichesRome";

export default configureStore({
    reducer: {
        organigramme: Organigramme,
        fichesmetiers: FichesMetiers,
        fichesrome: FichesRome
    },
});