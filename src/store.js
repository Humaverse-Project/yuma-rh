import { configureStore } from "@reduxjs/toolkit";
import Organigramme from "./model/reducer/Organigramme";
import FichesMetiers from "./model/reducer/FichesMetiers";

export default configureStore({
    reducer: {
        organigramme: Organigramme,
        fichesmetiers: FichesMetiers
    },
});