import { base_url } from './BaseUrl'

export async function listpost() {
    const url = `${base_url}/proposition/poste`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function postPropositionPoste(formdata) {
    const url = `${base_url}/proposition/poste/new`;

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

export async function updateProposition(formdata) {
    const url = `${base_url}/proposition/poste/${formdata.id}/edit`;

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
    const url = `${base_url}/proposition/poste/${id}`;

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