export async function getInfoSirret(sirret) {
    const url = `https://data.siren-api.fr/v3/etablissements/${sirret}`;
  
    const response = await fetch(url, {
      method: 'GET',
    //   headers: {
    //     "X-Client-Secret": `xhZZkBOp7TSweBOtSeAYudVV9D47ZzLs`,
    //   },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();
}

export async function getNaflist() {
    const url = `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/nomenclature-dactivites-francaise-naf-rev-2-code-ape%40datailedefrance/records?select=intitule_naf%2C%20code_naf&where=code_naf%20like%20%275%27&limit=10&offset=0&timezone=UTC&include_links=false&include_app_metas=false`;
  
    const response = await fetch(url, {
      method: 'GET'
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();
}