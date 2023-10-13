export async function getInfoSirret(sirret) {
    const url = `https://api.insee.fr/entreprises/sirene/V3/siret/${sirret}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 4bbd4e34-e391-349f-86ce-85c573eb80cb'
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
