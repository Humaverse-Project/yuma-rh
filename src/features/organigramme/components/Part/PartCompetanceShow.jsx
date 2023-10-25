import { Divider, Grid, Slider, Typography } from "@mui/material";

const PartCompetanceShow = ({ groupedData, type, titre }) => {
  if (groupedData === undefined) {
    return <></>;
  }
  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, pl: 2, color:"black.main" }}>
        {titre}
      </Typography>
      <hr></hr>
      {Object.keys(groupedData[type]).map((accessitem) => (
        <>
          <Grid sx={{ flexGrow: 1, mt: 1, pl: 2 }} container spacing={2}>
            <Grid item xs={4} key={accessitem}>
                <Typography sx={{color:"black.main", fontSize:"13px" }}> {accessitem}</Typography>
            </Grid>
            <Grid item xs={8} key={accessitem + "111"}>
              {groupedData[type][accessitem].map((datass) => (
                <>
                  <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={6} key={accessitem + "44"}>
                        <Typography sx={{color:"black.main", fontSize:"13px" }} key={accessitem + "types"}>
                            {datass.briquescompetances.brqCompTitre}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} key={accessitem + "11"}>
                      <Slider
                        value={datass.niveau}
                        valueLabelDisplay="auto"
                        color="warning"
                        step={1}
                        min={0}
                        max={100}
                        disableSwap
                        size="small"
                        key={accessitem + "ds"}
                      />
                    </Grid>
                  </Grid>
                  <Divider variant="middle"/>
                </>
              ))}
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{width:"100%", my:1}}/>
        </>
      ))}
    </>
  );
};
export default PartCompetanceShow;
