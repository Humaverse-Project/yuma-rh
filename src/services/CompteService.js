import { base_url } from './BaseUrl'


export async function postentreprise(formdata) {
    const url = `${base_url}/entreprise/new`;
    const listinp = [
        "siret",
        "naf",
        "nom_entreprise",
        "url",
        'rue_numero',
        'code_postal',
        'ville',
        'pays',
        'telephone',
        'email',
        'effectif',
        'nomrh',
        'prenomrh',
        'fonctionrh',
        'servicerh',
        'telephonerh',
        'emailrh',
        'password',
        "password2",
        'etablissement'
    ]
    const body = new URLSearchParams();
    for (let index = 0; index < listinp.length; index++) {
        const element = listinp[index];
        body.append(element, formdata[element]);
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function postcredential(formdata) {
    const url = `${base_url}/compte/authentification`;
    const body = new URLSearchParams();
    body.append("username", formdata.username);
    body.append("password", formdata.password);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}