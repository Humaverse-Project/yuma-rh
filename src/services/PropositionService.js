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

export async function postUpdatePropositionPoste(formdata) {
    const url = `${base_url}/proposition/update`;
    const body = new URLSearchParams();
    for (let index = 0; index < formdata.length; index++) {
        if(formdata[index].competanceid !== null){
            body.append('competanceid[]', formdata[index].competanceid);
            body.append('id[]', formdata[index].id);
            body.append('metier_id[]', formdata[index].metier_id);
            body.append('id_proposition[]', formdata[index].id_proposition);
            body.append('niveauCompetance[]', formdata[index].niveauCompetance);
            body.append('type[]', formdata[index].type);
            body.append('type2[]', formdata[index].type2);
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

export async function sendVoteProposition(data) {
    const url = `${base_url}/proposition/vote`;

    const body = new URLSearchParams();
    body.append('id', data.id);
    body.append('value', data.value);
    body.append('vote_id', data.vote_id);

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