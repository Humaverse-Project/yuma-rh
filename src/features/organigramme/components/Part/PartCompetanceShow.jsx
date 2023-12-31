import { Divider, Grid, Slider, Typography } from "@mui/material";

const PartCompetanceShow = ({ groupedData, type, titre }) => {
  if (groupedData === undefined) {
    return <></>;
  }

  const brqcompetanceshoxs = (brg) => {
    if (brg.niveau !== undefined) {
      return brg.briquescompetances.brqCompTitre;
    } else {
      return brg.brqCompTitre;
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, pl: 2, color: "black.main" }}>
        {titre}
      </Typography>
      <hr></hr>
      {Object.keys(groupedData[type]).map((accessitem) => (
        <div key={"deuxime" + accessitem}>
          <Grid sx={{ flexGrow: 1, mt: 1, pl: 2 }} container spacing={2}>
            <Grid item xs={4}>
              <Typography sx={{ color: "black.main", fontSize: "13px" }}>
                {accessitem}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {groupedData[type][accessitem].map((datass, index) => (
                <div key={"klemanfa" + accessitem + index}>
                  <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={datass.niveau !== undefined ? 6 : 12}>
                      <Typography sx={{ color: "black.main", fontSize: "13px" }}>
                        {brqcompetanceshoxs(datass)}
                      </Typography>
                    </Grid>
                    {datass.niveau !== undefined && (
                      <Grid item xs={6}>
                        <Slider
                          value={datass.niveau}
                          valueLabelDisplay="auto"
                          color="warning"
                          step={1}
                          min={0}
                          max={100}
                          disableSwap
                          size="small"
                          key={"slider" + accessitem + index}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Divider variant="middle" sx={{ width: "100%", my: 1 }} key={"divider" + accessitem + index} />
                </div>
              ))}
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{ width: "100%", my: 1 }} key={"hodafafakoyr" + accessitem} />
        </div>
      ))}
    </>
  );
};

export default PartCompetanceShow;
