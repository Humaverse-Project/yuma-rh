import { base_url } from './BaseUrl'

export async function listproposition() {
    const url = `${base_url}/proposition`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function postPropositionPoste(formdata) {
    const url = `${base_url}/proposition/new`;
    const body = new URLSearchParams();
    for (let index = 0; index < formdata.length; index++) {
        if(formdata[index].competanceid !== null){
            body.append('competanceid[]', formdata[index].competanceid);
            body.append('id[]', formdata[index].id);
            body.append('metier_id[]', formdata[index].metier_id);
            body.append('niveauCompetance[]', formdata[index].niveauCompetance);
            body.append('type[]', formdata[index].type);
        }
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

export async function updateProposition(formdata) {
    const url = `${base_url}/proposition/${formdata.id}/edit`;

    const body = new URLSearchParams();
    body.append('metier_id', formdata.metier_id);
    body.append('competance_id', formdata.competance_id);
    body.append('niveau_competance', formdata.niveau_competance);

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

export async function deletProposition(id) {
    const url = `${base_url}/proposition/${id}`;

    const body = new URLSearchParams();
    body.append('id', id);

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