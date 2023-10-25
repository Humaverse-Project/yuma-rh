import { base_url } from './BaseUrl'
import { getCookie } from './CoockieService'

export async function loaddata() {
    const url = `${base_url}/organigramme`;
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
export async function postdata(data) {
    const url = `${base_url}/organigramme/enregistrement`;
    const body = new URLSearchParams();
    body.append("entrepriseid", getCookie("entrepriseid"));
    let keylist = Object.keys(data);
    for (let index = 0; index < keylist.length; index++) {
        const element = keylist[index];
        body.append(element, data[element]);
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

export async function filtredata(key) {
    const url = `${base_url}/organigramme/filtreficheposte`;
    const body = new URLSearchParams();
    body.append("entrepriseid", getCookie("entrepriseid"));
    body.append("input", key);
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

export async function postupdate(data) {
    const url = `${base_url}/organigramme/postupdate`;
    const body = new URLSearchParams();
    body.append("nodeId", data.nodeId);
    body.append("parentNodeId", data.parentNodeId);
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

export async function postupdateposteoruser(data) {
    const url = `${base_url}/organigramme/postupdateuser`;
    const body = new URLSearchParams();
    body.append("titre", data.orgIntitulePoste);
    body.append("id", data.id);
    body.append("personneid", data.personnesid);
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

export async function deleteNodeserveur(id) {
    const url = `${base_url}/organigramme/delete/${id}`;
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
