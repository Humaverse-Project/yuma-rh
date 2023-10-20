import { base_url } from './BaseUrl'

export async function gettokeninfo() {
    const url = `${base_url}/entreprise/sirettoken`;

    const response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
      throw new Error('erreur backend');
    }
    return await response.json();
}

export async function getInfoSirret(sirret, token) {
    const url = `https://api.insee.fr/entreprises/sirene/V3/siret/${sirret}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return await response.json()
}

export async function getNaflist(naf) {
    const url =
        naf === ''
            ? 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/nomenclature-dactivites-francaise-naf-rev-2-code-ape@datailedefrance/records?select=code_naf,intitule_naf&limit=100'
            : `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/nomenclature-dactivites-francaise-naf-rev-2-code-ape@datailedefrance/records?select=code_naf%2C%20intitule_naf&where=code_naf%20like%20%22${naf}*%22&limit=100`

    const response = await fetch(url, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return await response.json()
}
