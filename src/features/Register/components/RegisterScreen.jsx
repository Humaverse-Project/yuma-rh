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
    const [ErrorForm, setErrorForm] = useState({
        "siret": [false, ""],
        "naf": [false, ""],
        "nom_entreprise": [false, ""],
        'rue_numero': [false, ""],
        'code_postal': [false, ""],
        'ville': [false, ""],
        'pays':[false, ""],
        'telephone':[false, ""],
        'email':[false, ""],
        'effectif':[false, ""],
        'etablissement':[false, ""],
        'nomrh': [false, ""],
        'prenomrh': [false, ""],
        'fonctionrh': [false, ""],
        'servicerh': [false, ""],
        'telephonerh':[false, ""],
        'emailrh':[false, ""],
        'password':[false, ""],
        "password2":[false, ""]
    });

    return (
        <>
            {screen === 1 && 
                <ScreenOne 
                    setScreen={setScreen}
                    setFormData={setFormData}
                    formData={formData}
                    ErrorForm={ErrorForm}
                    setErrorForm={setErrorForm}
                />
            }
            {screen === 2 && 
                <ScreenTwo
                    formData={formData}
                    setScreen={setScreen}
                    setFormData={setFormData}
                    ErrorForm={ErrorForm}
                    setErrorForm={setErrorForm}
                />
            }
        </>
    )
}
