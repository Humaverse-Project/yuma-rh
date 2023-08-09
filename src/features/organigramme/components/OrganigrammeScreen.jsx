import React, { useState, useEffect, Fragment } from 'react';
import { OrgChartComponent } from './OrgChart';
import * as d3 from 'd3';
import HeaderInScreen from '../../header/HeaderInScreen'
import { useTheme } from '@mui/material/styles'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid';
import './mylink.css'

function OrganigrammeScreen() {
  const theme = useTheme()
  const [textToSearh, setTextToSearh] = useState()
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;
  function onNodeClick(nodeId) {
    alert('clicked ' + nodeId);
  }

  function onNodeDrop(source, target){
    console.log(source, target)
  }

  useEffect(() => {
    d3.csv(
      'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    ).then((data) => {
      setData(data);
    });
  }, [true]);
  return (
    <Fragment>
      <HeaderInScreen
          title={'Organigramme'}
          secondSubtitle={textToSearh && 'Recherche'}
      />
      <Box
          backgroundColor="background.paper"
          display="flex"
          width="100%"
          flexDirection="row"
          sx={{
              [theme.breakpoints.down('md')]: {
                  flexDirection: 'column',
                  alignItems: 'center',
              },
          }}
          justifyContent="space-between"
          alignItems="flex-start"
          minHeight="80vh"
          py={6}
          px={4}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <TextField
              id="outlined-basic"
              value={textToSearh}
              onChange={(e) => setTextToSearh(e.target.value)}
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <SearchOutlinedIcon />
                      </InputAdornment>
                  ),
              }}
              variant="outlined"
            />
            </Grid>
            <Grid item xs={12} md={10}
                sx={{
                    [theme.breakpoints.up('lg')]: {
                        mt: 2,
                    },
                    [theme.breakpoints.down('sm')]: {
                        my: 1,
                        mx: 0,
                    },
                }}
            >
              <OrgChartComponent
                setClick={(click) => (addNodeChildFunc = click)}
                onNodeClick={onNodeClick}
                data={data}
                onNodeDrop={onNodeDrop}
                svgWidth ={200}
              />
            </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default OrganigrammeScreen
