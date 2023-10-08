import React, { useState, useEffect, Fragment } from 'react';
import { OrgChartComponent } from './OrgChart';
import HeaderInScreen from '../../header/HeaderInScreen'
import { Button, Box, Grid } from '@mui/material'
import './mylink.css'
import { Snackbar, Alert } from '@mui/material';
import { loaddata, postdata, postupdate } from '../../../services/OrganigrammeService'
import theme from './theme';
import NewPosteModal from './NewPosteModal';

function OrganigrammeScreen() {
  const [data, setData] = useState([]);
  const [dataPersonne, setDataPersonne] = useState([]);
  const [datacompetance, setdatacompetance] = useState([]);
  const [datametier, setDataMetier] = useState(null);
  const [datapostegenerique, setDatapostegenerique] = useState(null);
  const [etat, setEtat] = useState();
  const [nodeselected, setNodeselected] = useState({
    titre: ""
  });
  let addNodeChildFunc = null;
  let initializeChart = null;
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
  const sendupdateposte = async (source, target)=>{
    let obj = {
      nodeId: source.nodeId,
      parentNodeId: target.nodeId
    }
    const datametierexistant = await postupdate(obj);
    await datametierexistant;
  }
  const [showError, setShowError] = useState(false);

  const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }
      setShowError(false);
  };
  async function addNode(newnode) {
    console.log(nodeselected)
    if(nodeselected.personne !== ""){
      newnode.parentNodeId = nodeselected.nodeId;
    }
    if(data.length === 0){
      newnode.parentNodeId = ""
    }
    
    const datametierexistant = await postdata(newnode);
    const reponsemetie = await datametierexistant;
    newnode.nodeId = reponsemetie.id
    if(data.length === 0){
      newnode.parentNodeId = ""
      setData([...data, newnode])
      initializeChart();
    } else{
      addNodeChildFunc(newnode)
    }
    return true;
  }
  useEffect(() => {
    const fetchData = async () => {
        try {
            const datametierexistant = await loaddata();
            const reponsemetie = await datametierexistant;
            setDataMetier(reponsemetie.rome.map(metier=> {
              return {
                label: "["+metier.rome_coderome+"]"+metier.nom,
                code: metier.rome_coderome,
                nom: metier.nom,
                id: metier.id
              }
            }))
            setdatacompetance(reponsemetie.competance.map(metier=> {
              return {
                label: "[v-"+metier.ficCompVersion+"]"+metier.ficCompTitreEmploi,
                titre: metier.ficCompTitreEmploi,
                id: metier.id,
                brique: metier.briquelist,
                niveau: metier.niveau
              }
            }))
            setDataPersonne(reponsemetie.personnelist.map(personne=>{
              return {
                label: personne.personneNom+" "+personne.personnePrenom,
                id: personne.id
              }
            }))
            setDatapostegenerique(reponsemetie.poste_generique)
            var persutiliser = []
            let postorg = reponsemetie.poste.map(poste=> {
              let titre = poste.fiches_postes_titre;
              let nodeId = poste.id;
              let parentNodeId = "";
              if (poste.fiches_postes_nplus1.length != 0 ) {
                parentNodeId = poste.fiches_postes_nplus1.id;
              }
              let personne = "";
              let personneid = 0;
              var per = reponsemetie.personnelist.filter(personne =>{
                if (personne.personnePoste.id === poste.id) {
                  return true
                } return false
              })
              if (per.length>0) {
                if (per.length == 1) {
                  personne = per[0].personneNom+" "+per[0].personnePrenom
                  personneid = per[0].id
                } else {
                  for (let index = 0; index < per.length; index++) {
                    const element = per[index];
                    if (!persutiliser.includes(element.personneNom+" "+element.personnePrenom)) {
                      personne = element.personneNom+" "+element.personnePrenom
                      personneid = element.id
                      break
                    }
                  }                  
                }
              }
              return {
                titre: titre,
                nodeId: nodeId,
                personne: personne,
                personneid: personneid,
                parentNodeId: parentNodeId,
                imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
              }
            })
            setData(postorg)
            console.log(reponsemetie)
        } catch (error) {
          console.error('Une erreur s\'est produite :', error);
          setShowError(true);
        }
    };
    fetchData();
  }, [setShowError]);


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
            <Button variant="contained" onClick={handleOpen} md={2} disabled={datametier === null || (data.length>0 && nodeselected.titre === "" )} size="large" fullWidth color="blue">
              Ajouter un poste
            </Button>
            {/* <Button variant="contained" color="primary" sx={{m: 2}}>
              Importer
            </Button> 
            <Button variant="contained" sx={{mt: 2}} size="large" disabled={!etat} onClick={handleDeletenode} fullWidth color="blue">
              Supprimer { nodeselected.name }
            </Button>*/}
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
                }}
                initializeChart={(init)=> (initializeChart = init)}
                onNodeDrop={(source, target)=> {sendupdateposte(source, target)}}
                data={data}
                svgWidth ={200}
              />
          </Grid>
          <NewPosteModal
            open={open}
            onClose={handleClose}
            onSubmit={addNode}
            dataPersonne= {dataPersonne}
            datametier={datametier}
            datacompetance={datacompetance}
            datapostegenerique={datapostegenerique}
          />
        </Grid>
      </Box>
    </Fragment>
  );
}

export default OrganigrammeScreen
