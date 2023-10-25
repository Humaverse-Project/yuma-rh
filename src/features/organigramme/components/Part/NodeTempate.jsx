import { Grid, Typography } from "@mui/material"

const NodeTempate  = ({ data, affichepersonnelle, affichemetier, afficheposte  }) => {
    console.log(data)
    return (
        <>
            <Grid container>
                {/* <Grid item xs={2}>
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '100px',
                            width: `55px`,
                            height: `55px`,
                        }}
                    >
                        <img
                            src={data.imageUrl}
                            style={{
                                borderRadius: '100px',
                                width: `55px`,
                                height: `55px`,
                            }}
                        />
                    </div>
                </Grid> */}
                <Grid item xs={12} sx={{ py:1, px: 2, flexBasis: "unset !important", maxWidth: "unset !important", textAlign:"center", width:"100%" }}>
                    {
                        affichepersonnelle &&
                        <Typography variant="h6" sx={{mb: 1}}>{data.personne !== '' ? data.personne: '?'}</Typography>
                    }
                    {
                        afficheposte && 
                        <><Typography  sx={{color:"black.main", fontSize:"14px" }}>{data.titre}</Typography><br></br></>
                    }
                    {
                        affichemetier &&
                        <Typography  sx={{color:"black.main", fontSize:"12px" }}>{data.metiertitre !== null ? data.metiertitre: '?'}</Typography>
                    }
                </Grid>
            </Grid>
        </>
    )
}
export default NodeTempate