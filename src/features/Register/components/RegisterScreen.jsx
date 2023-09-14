import { useState } from 'react'

import ScreenOne from './ScreenOne'
import ScreenTwo from './ScreenTwo'

export default function RegisterScreen() {
    const [screen, setScreen] = useState(1);
    const [formData, setFormData] = useState({
        "siret": "",
        "naf": "",
        "nom_entreprise": "",
        "url":'',
        'rue_numero': '',
        'code_postal': '',
        'ville': '',
        'pays':'',
        'telephone':'',
        'email':"",
        'effectif':0,
        'nomrh': "",
        'prenomrh': '',
        'fonctionrh': '',
        'servicerh': '',
        'telephonerh':'',
        'etablissement':'',
        'emailrh':"",
        'password':"",
        "password2":""
    });

    return (
        <>
            {screen === 1 && <ScreenOne setScreen={setScreen} setFormData={setFormData} formData={formData} />}
            {screen === 2 && <ScreenTwo formData={formData} setScreen={setScreen} setFormData={setFormData}/>}
        </>
    )
}
