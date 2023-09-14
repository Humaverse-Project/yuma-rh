import { base_url } from './BaseUrl'


export async function postentreprise(formdata) {
    const url = `${base_url}/competance/new`;

    const body = new URLSearchParams();
    body.append('code', formdata.code);
    body.append('class', formdata.class);
    body.append('description_c', formdata.description_c);
    body.append('description_l', formdata.description_l);

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