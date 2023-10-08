import { base_url } from './BaseUrl'

export async function listformation() {
    const url = `${base_url}/formation`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function postformation(formdata) {
    const url = `${base_url}/formation/new`;

    const body = new URLSearchParams();
    body.append('nom', formdata.nom);
    body.append('genre', formdata.genre);
    body.append('categorie', formdata.categorie);
    body.append('type', formdata.type);
    body.append('tarif', formdata.tarif);
    body.append('durrer', formdata.durrer);

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

export async function updateformation(formdata) {
    const url = `${base_url}/formation/${formdata.id}/edit`;

    const body = new URLSearchParams();
    body.append('nom', formdata.nom);
    body.append('genre', formdata.genre);
    body.append('categorie', formdata.categorie);
    body.append('type', formdata.type);
    body.append('tarif', formdata.tarif);
    body.append('durrer', formdata.durrer);

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

export async function deleteformation(id) {
    const url = `${base_url}/formation/${id}`;

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