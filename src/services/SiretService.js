export async function getInfoSirret(sirret) {
    const url = `https://data.siren-api.fr/v3/etablissements/${sirret}`

    const response = await fetch(url, {
        method: 'GET',
        //   headers: {
        //     "X-Client-Secret": `xhZZkBOp7TSweBOtSeAYudVV9D47ZzLs`,
        //   },
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return await response.json()
}

export async function getNaflist(naf) {
    const url = `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/nomenclature-dactivites-francaise-naf-rev-2-code-ape@datailedefrance/records?select=code_naf%2C%20intitule_naf&where=code_naf%20like%20%22${naf}*%22&limit=100`

    const response = await fetch(url, {
        method: 'GET',
    })
    console.log('response', response)

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return await response.json()
}
