import React, { useState, useEffect, Fragment } from 'react';
import { OrgChartComponent } from './OrgChart';
import HeaderInScreen from '../../header/HeaderInScreen'
import { Button, Box, Dialog, DialogTitle, DialogContent, Stack, DialogActions, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import Grid from '@mui/material/Grid';
import './mylink.css'
import { Snackbar, Alert } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { loaddata } from '../../../services/OrganigrammeService'
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

function OrganigrammeScreen() {
  const [data, setData] = useState([]);
  const [dataPersonne, setDataPersonne] = useState([]);
  const [dataPersonneafficher, setDataPersonneafficher] = useState(null);
  const [datacompetance, setdatacompetance] = useState([]);
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
  const handleChange = (event) => {
      const { name, value } = event.target;
      setNewnode({ ...newnode, [name]: value });
  };
  function addNode() {
    if(nodeselected.name !== ""){
      newnode.parentNodeId = nodeselected.nodeId;
      addNodeChildFunc(newnode)
    } else {
      addNodeChildFunc(newnode)
    }
    handleClose()
  }
  useEffect(() => {
    const fetchData = async () => {
        try {
            const datametierexistant = await loaddata();
            const reponsemetie = await datametierexistant;
            setDataMetier(reponsemetie.rome.map(metier=> {
              return {
                label: "["+metier.rome_coderome+"]"+metier.nom,
                id: metier.id
              }
            }))
            setdatacompetance(reponsemetie.competance.map(metier=> {
              return {
                label: "[v-"+metier.ficCompVersion+"]"+metier.ficCompTitreEmploi,
                id: metier.id
              }
            }))
            console.log(reponsemetie)
        } catch (error) {
          console.error('Une erreur s\'est produite :', error);
          setShowError(true);
        }
    };
    fetchData();
  }, [loaddata, setShowError]);

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
              <Button variant="contained" onClick={handleOpen} md={2} disabled={datametier == null} size="large" fullWidth color="blue">
                Ajouter un poste
              </Button>
              {/* <Button variant="contained" color="primary" sx={{m: 2}}>
                Importer
              </Button> */}
              <Button variant="contained" sx={{mt: 2}} size="large" disabled={!etat} onClick={handleDeletenode} fullWidth color="blue">
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
              {   data.length>0 ? (
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
                  ) : (
                  null
              )}
              <ThemeProvider theme={theme}>
                <Dialog  open={open} onClose={handleClose}>
                  <DialogTitle textAlign="center"  color={"black.main"}>Formulaire de création poste</DialogTitle>
                  <DialogContent dividers={true}>
                  <Stack
                    sx={{
                      minWidth: { xs: '300px', sm: '360px', md: '400px' },
                      gap: '1.5rem',
                    }}
                  >
                      <Box
                          sx={{
                              display: 'flex',
                          }}
                      >
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          sx={{
                              display: 'flex',
                              marginRight: '5px',
                          }}
                        >
                          <Autocomplete
                            sx={{
                                width: '100%',
                            }}
                            disablePortal
                            options={datametier || []}
                            onChange={handleChangeMetier}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    label="Métier" 
                                    name="rome"
                                    variant="outlined"
                                />
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          sx={{
                              display: 'flex',
                              marginRight: '5px',
                          }}
                        >
                          <Autocomplete
                            sx={{
                                width: '100%',
                            }}
                            disablePortal
                            options={datacompetance || []}
                            onChange={handleChangeMetier}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    label="Fiche competance" 
                                    name="fiche Competance"
                                    variant="outlined"
                                />
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          sx={{
                              display: 'flex',
                              marginRight: '5px',
                          }}
                        >
                          <FormControl
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            required
                          >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Titre
                            </InputLabel>
                            <OutlinedInput
                              name="titre"
                              onChange={handleChange}
                              label="Titre"
                            />
                          </FormControl>
                        </Grid>
                      </Box>
                      <Box
                          sx={{
                              display: 'flex',
                          }}
                      >
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          sx={{
                              display: 'flex',
                              marginRight: '5px',
                          }}
                        >
                          <FormControl
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            required
                          >
                            <TextField
                              name="activite"
                              onChange={handleChange}
                              InputProps={{
                                multiline: true
                              }}
                              label="Activité"
                            />
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          sx={{
                              display: 'flex',
                              marginRight: '5px',
                          }}
                        >
                          <FormControl
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            required
                          >
                            <TextField
                              name="definition"
                              onChange={handleChange}
                              InputProps={{
                                  multiline: true
                              }}
                              label="Définition"
                            />
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          sx={{
                              display: 'flex',
                              marginRight: '5px',
                          }}
                        >
                          <FormControl
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            required
                          >
                            <TextField
                              name="agrement"
                              onChange={handleChange}
                              InputProps={{
                                  multiline: true
                              }}
                              label="Agrement"
                            />
                          </FormControl>
                        </Grid>
                      </Box>
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
                          <FormControl
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            required
                          >
                            <TextField
                              name="condition_general"
                              onChange={handleChange}
                              InputProps={{
                                  multiline: true
                              }}
                              label="Condition Génerale"
                            />
                          </FormControl>
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
                          <FormControl
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            required
                          >
                            <TextField
                              name="instruction"
                              onChange={handleChange}
                              InputProps={{
                                  multiline: true
                              }}
                              label="Instruction"
                            />
                          </FormControl>
                        </Grid>
                      </Box>
                        {/* <Grid
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
                        </Grid> */}
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button
                          variant="contained"
                          onClick={(e)=>{ setOpen(false) }}
                      >
                        Annuler
                    </Button>
                    <Button
                          variant="contained"
                          onClick={addNode}
                          color="success"
                      >
                        Continuer
                    </Button>
                  </DialogActions>
                </Dialog>
              </ThemeProvider>
            </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default OrganigrammeScreen
