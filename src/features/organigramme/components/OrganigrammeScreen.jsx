import React, { useState, useEffect, Fragment } from 'react';
import { OrgChartComponent } from './OrgChart';
import HeaderInScreen from '../../header/HeaderInScreen'
import { useTheme } from '@mui/material/styles'
import { Button, Box, Modal } from '@mui/material'
import Grid from '@mui/material/Grid';
import './mylink.css'
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { authenticateClient, getFicheMetierData } from './api';
import { Snackbar, Alert } from '@mui/material';
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
};

function OrganigrammeScreen() {
  const theme = useTheme()
  const [data, setData] = useState([
    {
      "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
      "name": "DG",
      "parentNodeId": "",
      "nodeId": "0",
      "metier": "PDG"
    }
  ]);
  // useEffect(() => {
  //   d3.csv(
  //     'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
  //   ).then((data) => {
  //     setData(data);
  //   });
  // }, []);
  const [dataPersonne, setDataPersonne] = useState(null);
  const [dataPersonneafficher, setDataPersonneafficher] = useState(null);
  const [datametier, setDataMetier] = useState(null);
  const [etat, setEtat] = useState();
  const [nodeselected, setNodeselected] = useState({
    name: ""
  });
  let addNodeChildFunc = null;
  let deletenode = null;
  

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeletenode = () => {
    deletenode(nodeselected)
    setEtat(false)
  };

  const [showError, setShowError] = useState(false);

  const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }
      setShowError(false);
  };

  const [newnode, setNewnode] = useState({
    imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
    name: '',
    parentNodeId: "0",
    nodeId: '',
    metier: ''
  });

  const generateRandomName = () => {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'James', 'Sophia', 'Benjamin', 'Ava'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
    return `${randomFirstName} ${randomLastName}`;
  };
  
  function addNode() {
    
    if(nodeselected.name !== ""){
      console.log(nodeselected)
      newnode.parentNodeId = nodeselected.nodeId;
      addNodeChildFunc(newnode)
    } else {
      addNodeChildFunc(newnode)
    }
    handleClose()
  }
  useEffect(() => {
    
    authenticateClient()
      .then((data) => {
        getFicheMetierData(data.access_token)
          .then((data) => {
            const formattedData = data.map((item) => ({
              'label': item.metier.libelle,
              'code' : item.code
            }));
            setDataMetier(formattedData);
            // le code suivant genere le personne avec metier pour le teste seulement
            const formattedDataPersonne = data.map(item => {
              return { label: generateRandomName(), metier: item.metier.libelle }
            });
            setDataPersonne(formattedDataPersonne);
          })
          .catch((error) => {
            setShowError(true);
          });
      })
      .catch((error) => {
        console.error('Authentication error:', error.message);
        setShowError(true);
      });
  }, []);

  const handleChangeMetier = (event, value) => {
    setNewnode({ ...newnode, metier: value.label, nodeId: Math.floor(Math.random() * 999999999999) });
    const newPersonne = dataPersonne.filter(personne=>{
      return (personne.metier === value.label)
    })
    setDataPersonneafficher(newPersonne);
  };


  return (
    <Fragment>
      <HeaderInScreen
          title={'Organigramme'}
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
        <div>
            <Snackbar 
                open={showError}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical:'top', horizontal:'right' }}
            >
                <Alert onClose={handleCloseAlert} severity="error">
                    Une erreur s'est produite lors de la connexion à l'API.
                </Alert>
            </Snackbar>
        </div>
        <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Button variant="contained" color="primary" onClick={handleOpen} md={2} disabled={datametier == null} size="large" fullWidth color="blue">
                Ajouter un poste
              </Button>
              {/* <Button variant="contained" color="primary" sx={{m: 2}}>
                Importer
              </Button> */}
              <Button variant="contained" color="primary" sx={{mt: 2}} size="large" disabled={!etat} onClick={handleDeletenode} fullWidth color="blue">
                Supprimer { nodeselected.name }
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
                setDeletefonction={(click) => (deletenode = click)}
                deleteNode={(d, etat) => {
                  setEtat(etat)
                  setNodeselected(d)
                  console.log(d)
                }}
                data={data}
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
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            mt: 2,
                            mb: 2
                        }}
                        width={'100%'}
                    >
                      Formulaire de création poste
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        sx={{
                            display: 'flex',
                            marginRight: '5px',
                        }}
                      >
                        <Autocomplete
                          sx={{
                              m: 2,
                              width: '40ch',
                          }}
                          freeSolo
                          disablePortal
                          options={datametier}
                          onChange={handleChangeMetier}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  required
                                  label="Métier" 
                                  name="metier"
                                  variant="outlined"
                              />
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        sx={{
                            display: 'flex',
                            marginRight: '5px',
                        }}
                      >
                        <Autocomplete
                          sx={{
                              m: 2,
                              width: '40ch',
                          }}
                          freeSolo
                          disablePortal
                          options={dataPersonneafficher}
                          onChange={(event, newValue) => {
                            setNewnode({ ...newnode, name: newValue.label });
                          }}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  required
                                  label="Personne" 
                                  name="personne"
                                  variant="outlined"
                              />
                          )}
                        />
                      </Grid>
                    </Box>
                    <Grid
                        item
                        xs={4}
                        sm={4}
                        ml= {33}
                        sx={{
                            display: 'flex',
                            marginRight: '5px'
                        }}
                      >
                      <Button
                          variant="contained"
                          onClick={addNode}
                          color="blue"
                          fullWidth
                      >
                        Continuer
                      </Button>
                    </Grid>
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
