import React, { useState, useEffect, Fragment, useRef } from 'react'
import OrganizationChart, { async } from "@dabeng/react-orgchart";
import HeaderInScreen from '../../header/HeaderInScreen'
import { Button, Box, Grid, Divider, Autocomplete, TextField, CircularProgress, Backdrop } from '@mui/material'
import './mylink.css'
import { Snackbar, Alert } from '@mui/material'
import {
    loaddata,
    postdata,
    postupdate,
    deleteNodeserveur
} from '../../../services/OrganigrammeService'
import theme from './theme'
import NewPosteModal from './NewPosteModal'
import JSONDigger from "json-digger";

function OrganigrammeScreen() {
    const [data, setData] = useState({})
    let dsDigger = new JSONDigger(data, "id", "children");
    const [loadingrome, setloadingrome] = useState(true);
    const [dataPersonne, setDataPersonne] = useState([])
    const [titreexistant, setTitreexistant] = useState([])
    let source = {}
    let target = {}
    const orgchart = useRef();
    const sendupdateposte = async (e) => {
        await dsDigger.updateNode({...source, postion: (target.postion+1)});
        let obj = {
            nodeId: source._id,
            parentNodeId: target._id
        }
        const datametierexistant = await postupdate(obj)
        await datametierexistant
        source = {}
        target = {}
    }
    
    const colors = [
        '#6E6B6F',
        '#18A8B6',
        '#F45754',
        '#96C62C',
        '#BD7E16',
        '#802F74',
      ];
      
    const TreeNode = ({ nodeData }) => {
        var data = nodeData
        const color = colors[nodeData.postion];
        const imageDim = 80;
        const lightCircleDim = 95;
        const outsideCircleDim = 110;
        return (
          <div
            style={{
              backgroundColor: 'white',
              height: '186px'
            }}
            onDragStart={(e)=> {source = nodeData}}
            onDrop= {(e)=> {target = nodeData; sendupdateposte(e)}}
            draggable={true}
          >
            <div
              style={{
                backgroundColor: color,
                marginTop: `0`,
                marginLeft: `21.5px`,
                borderRadius: '100px',
                width: `110px`,
                height: `110px`,
              }}
            ></div>
            <div
              style={{
                backgroundColor: '#ffffff',
                marginTop: `-102px`,
                marginLeft: `30px`,
                borderRadius: '100px',
                width: `95px`,
                height: `95px`,
              }}
            >
              <img
                src={data.imageUrl}
                style={{
                  borderRadius: '100px',
                  width: `95px`,
                  height: `95px`,
                }}
              />
            </div>
            
            <div
              className="card"
              style={{
                marginTop:"15px",
                height: '30px',
                width: `153px`,
                backgroundColor: '#3AB6E3',
              }}
            >
              <div
                style={{
                  backgroundColor: color,
                  height: '28px',
                  textAlign: 'center',
                  paddingTop: '10px',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                {data.personne}
              </div>
              <div
                style={{
                  backgroundColor: '#F0EDEF',
                  height: '28px',
                  textAlign: 'center',
                  paddingTop: '10px',
                  color: '#424142',
                  fontSize: '16px',
                }}
              >
                {data.titre}
              </div>
            </div>
          </div>
        );
    }
    //const [etat, setEtat] = useState();
    const [nodeselected, setNodeselected] = useState({
        titre: '',
    })

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    /*const handleDeletenode = () => {
        deletenode(nodeselected)
        //setEtat(false)
    }*/
    
    const [showError, setShowError] = useState(false)

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setShowError(false)
    }
    async function addNode(newnode) {
        if (nodeselected._id !== undefined) {
            newnode.parentNodeId = nodeselected._id
        }
        if (data.length === 0) {
            newnode.parentNodeId = ''
        }
        const datametierexistant = await postdata(newnode)
        const reponsemetie = await datametierexistant
        newnode.id = "P_"+reponsemetie.id
        newnode._id = reponsemetie.id
        if (data.titre === undefined) {
            newnode.postion = 0
            newnode.title = newnode.titre
            await dsDigger.addRoot(newnode);
            delete dsDigger.ds["children"]; 
            setData({ ...dsDigger.ds });
            console.log(dsDigger)
        } else {
            newnode.postion = nodeselected.postion+1
            await dsDigger.addChildren(nodeselected.id, newnode);
        }
        setTitreexistant([...titreexistant, newnode.titre])
        return true
    }
    async function deleteNode(e){
        setloadingrome(true)
        deleteNodeserveur(nodeselected._id).then(async (datametierexistant) => {
            setTitreexistant(datametierexistant.organigramme.map(poste=> poste.orgIntitulePoste))
            if(nodeselected.postion !== 0){
                await dsDigger.removeNode(nodeselected.id);
                setData({ ...dsDigger.ds });
            } else {
                setData({});
            }
            setNodeselected({
                titre: '',
            })
            setloadingrome(false)
        })
        .catch((error) => {
            console.log(error);
            setloadingrome(false)
        });
    }
    function formatToTree(data, parentId = null, k=0) {
        const tree = [];
        
        data.forEach(item => {
            if (item.organigrammeNplus1 === parentId) {
                const children = formatToTree(data, item.id, (k+1));
                if (children.length > 0) {
                    item.children = children;
                }
                item.postion = k
                tree.push(item);
            }
        });
    
        return tree;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await loaddata()
                const reponsemetie = await datametierexistant
                console.log(reponsemetie)
                setDataPersonne(
                    reponsemetie.personnelist.map((personne) => {
                        return {
                            label:
                                personne.personneNom +
                                ' ' +
                                personne.personnePrenom,
                            id: personne.id,
                        }
                    })
                )
                let postorg = reponsemetie.organigramme.map((poste) => {
                    let title = poste.orgIntitulePoste
                    let name = ""
                    if (poste.personnes !== null) {
                        name = poste.personnes.personneNom
                    }
                    if (poste.organigrammeNplus1 !== null){
                        poste.organigrammeNplus1 = "P_"+poste.organigrammeNplus1
                    }
                    let titre = poste.orgIntitulePoste
                    let parentNodeId = ''
                    if (poste.organigrammeNplus1 !== null) {
                        parentNodeId = poste.organigrammeNplus1
                    }
                    let personne = ""
                    let personneid = ""
                    if (poste.personnes !== null) {
                        personne = poste.personnes.personneNom
                        personneid = poste.personnes.id
                    }
                    return {
                        title: title,
                        titre: titre,
                        name: name,
                        personne: personne,
                        id: "P_"+poste.id,
                        _id: poste.id,
                        organigrammeNplus1: poste.organigrammeNplus1,
                        imageUrl:
                            'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
                    }
                })
                postorg = formatToTree(postorg, null)
                console.log(postorg)
                setTitreexistant(reponsemetie.organigramme.map(poste=> poste.orgIntitulePoste))
                if (postorg.length>0) {
                    setData(postorg[0])
                }
                // 
                setloadingrome(false)
            } catch (error) {
                console.error("Une erreur s'est produite :", error)
                setShowError(true)
            }
        }
        fetchData()
    }, [setShowError])
    const onClickNode = (e) => {
        console.log(e)
        setNodeselected(e)
    } 
    return (
        <Fragment>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 255 }}
                open={loadingrome}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <HeaderInScreen title={'Organigramme'} />
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
            >
                <div>
                    <Snackbar
                        open={showError}
                        autoHideDuration={6000}
                        onClose={handleCloseAlert}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert onClose={handleCloseAlert} severity="error">
                            Une erreur s'est produite lors de la connexion à
                            l'API.
                        </Alert>
                    </Snackbar>
                </div>
                <Grid container>
                    <Grid item xs={12} md={2} sx={{pt:2}}>
                        <Box sx={{ my: 1, mx: 1 }}>
                        <Button
                            variant="contained"
                            onClick={handleOpen}
                            md={2}
                            disabled={(data.titre !== undefined && nodeselected.titre === '')
                            }
                            size="large"
                            fullWidth
                            color="blue"
                        >
                            Ajouter un poste
                        </Button>
                        </Box>
                        <Divider variant="middle" />
                        {
                            (nodeselected.titre !== "") &&
                                <Box sx={{ my: 1, mx: 1 }}>
                                    <Button
                                        variant="contained"
                                        onClick={deleteNode}
                                        md={2}
                                        size="large"
                                        fullWidth
                                        color="warning"
                                    >
                                        Supprimer ce poste
                                    </Button>
                                </Box>
                        }
                        
                        <Divider variant="middle" />
                        <Box sx={{ my: 1, mx: 1 }}>
                            <Autocomplete
                                disablePortal
                                options={["Hiérarchique", "Matriciel", "Plat"]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        label="Type d’organigrame" 
                                        name="rome"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Box>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            p:0
                        }}
                    >
                        {
                            data.title !== undefined &&
                            <OrganizationChart
                                ref={orgchart}
                                datasource={data}
                                draggable={true}
                                zoom={true}
                                NodeTemplate={(node)=> TreeNode(node)}
                                onClickNode={onClickNode}
                            />
                        }
                        
                    </Grid>
                    {
                        open && 
                        <NewPosteModal
                            open={open}
                            onClose={handleClose}
                            onSubmit={addNode}
                            dataPersonne={dataPersonne}
                            titreexistant={titreexistant}
                            
                        />
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
