import React, { useState, useEffect, Fragment } from 'react';
import { OrgChartComponent } from './OrgChart';
import * as d3 from 'd3';
import HeaderInScreen from '../../header/HeaderInScreen'
import { useTheme } from '@mui/material/styles'
import { Button, Box, Modal } from '@mui/material'
import Grid from '@mui/material/Grid';
import './mylink.css'
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Ajouter un poste
            </Button>
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
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    
                  </Box>
                </Fade>
              </Modal>
            </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default OrganigrammeScreen
