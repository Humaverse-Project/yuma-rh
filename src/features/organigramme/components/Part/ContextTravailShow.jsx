import { Divider, Grid, Typography } from "@mui/material";

const ContextTravailShow = ({ context, type, titre }) => {
  if (context === undefined) {
    return <></>;
  }
  const elemtn = (elemet)=>{
    if (elemet.brqCtxTitre !== undefined) {
      return elemet.brqCtxTitre
    } else if (elemet.name !== undefined) {
      return elemet.name
    } else {
      return ""
    }
  }
  return (
    <>
        <Grid
            sx={{ flexGrow: 1 }}
            container
            spacing={2}
        >
            <Grid
            item
            xs={5}
            key={type}
            >
              <Typography sx={{color:"black.main", fontSize:"13px" }}>{titre}</Typography>
            </Grid>
            <Grid item xs={6}>
            {context[type].map(
                (accessitem) => (
                  <Typography sx={{color:"black.main", fontSize:"13px" }} key={accessitem.id}>
                    {elemtn(accessitem)}
                  </Typography>
                )
            )}
            </Grid>
        </Grid>
        <Divider variant="middle" sx={{width:"100%", my:1}}/>
    </>
  );
};
export default ContextTravailShow;
