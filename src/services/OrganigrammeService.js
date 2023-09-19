import { base_url } from './BaseUrl'
import { getCookie } from './CoockieService'

export async function loaddata() {
    const url = `${base_url}/organigramme/`;
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