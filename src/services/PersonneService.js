import { base_url } from './BaseUrl'
import { getCookie } from './CoockieService'

export async function loaddata() {
    const url = `${base_url}/personne/`;
    const body = new URLSearchParams();
    body.append("entrepriseid", getCookie("entrepriseid"));
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

export async function postpersonne(formdata){
    const url = `${base_url}/personne/new`;
    const body = new URLSearchParams();
    body.append("entrepriseid", getCookie("entrepriseid"));
    body.append("nom", formdata.nom);
    body.append("prenom", formdata.prenom);
    body.append("email", formdata.email);
    body.append("telephone", formdata.telephone);
    body.append("adresse", formdata.adresse);
    body.append("genre", formdata.genre);
    body.append("date_naissance", new Date(formdata.date_naissance).toISOString());
    body.append("role", formdata.role);
    body.append("acretitre", formdata.acretitre);
    body.append("service", formdata.service);
    body.append("password", formdata.password);
    body.append("creeuncompte", formdata.creeuncompte);
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