import React, { useState, useEffect, Fragment, useRef } from 'react'
import OrganizationChart from "@dabeng/react-orgchart";
import { DynamicHeadNav, Row } from '../../../shared'
import { Button, Box, Grid, Divider, Autocomplete, TextField, CircularProgress, Backdrop, Typography } from '@mui/material'
import './mycss.css'
import { Snackbar, Alert } from '@mui/material'
import NodeTempate from './Part/NodeTempate';
import {
    loaddata,
    postdata,
    postupdate,
    deleteNodeserveur
} from '../../../services/OrganigrammeService'
import NewPosteModal from './NewPosteModal'
import JSONDigger from "json-digger";
import CreationPosteModal from './Modal/CreationPosteModal';
import { useTheme } from '@emotion/react';

function OrganigrammeScreen() {
    const theme = useTheme()
    const [data, setData] = useState({})
    let dsDigger = new JSONDigger(data, "id", "children");
    const [loadingrome, setloadingrome] = useState(true);
    const [dataPersonne, setDataPersonne] = useState([])
    const [titreexistant, setTitreexistant] = useState([])
    const [ficheposte, setficheposte] = useState([])
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
        let poste = await datametierexistant
        setficheposte(poste)
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
        const color = colors[nodeData.postion];
        return (
          <div
            style={{
              backgroundColor: 'white',
              border: "2px solid "+color,
              maxWidth: "255px",
              width: "255px"
            }}
            onDragStart={(e)=> {source = nodeData}}
            onDrop= {(e)=> {target = nodeData; sendupdateposte(e)}}
            draggable={true}
          >
            <NodeTempate
                data={nodeData}
            />
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
        let po = "P_0"
        if (nodeselected._id !== undefined) {
            newnode.parentNodeId = nodeselected._id
            newnode.postion = nodeselected.postion+1
            po = nodeselected.id
        } else {
            newnode.parentNodeId = ''
            newnode.postion = 1
        }
        const datametierexistant = await postdata(newnode)
        const reponsemetie = await datametierexistant
        newnode.id = "P_"+reponsemetie.id
        newnode._id = reponsemetie.id
        await dsDigger.addChildren(po, newnode);
        setTitreexistant([...titreexistant, newnode.titre])
        setficheposte([...ficheposte, newnode])
        return true
    }
    async function deleteNode(e){
        setloadingrome(true)
        deleteNodeserveur(nodeselected._id).then(async (datametierexistant) => {
            setTitreexistant(datametierexistant.map(poste=> poste.orgIntitulePoste))
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
            setficheposte(datametierexistant)
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
                setficheposte(reponsemetie.organigramme)
                reponsemetie.organigramme.sort((a, b) => a.organigrammeNplus1 - b.organigrammeNplus1);
               
                let postorg = reponsemetie.organigramme.map((poste) => {
                    let titre = poste.orgIntitulePoste
                    if (poste.organigrammeNplus1 !== null) {
                        poste.organigrammeNplus1 = "P_"+poste.organigrammeNplus1
                    } else {
                        poste.organigrammeNplus1 = "P_0"
                    }
                    let personne = ""
                    let personneid = ""
                    if (poste.personnes !== null) {
                        personne = poste.personnes.personneNom
                        personneid = poste.personnes.id
                    }
                    return {
                        titre: titre,
                        personne: personne,
                        id: "P_"+poste.id,
                        _id: poste.id,
                        organigrammeNplus1: poste.organigrammeNplus1,
                        imageUrl: '',
                    }
                })
                postorg.unshift(
                {titre: "",
                    id: 'P_0',
                    _id: 0,
                    personne: "",
                    organigrammeNplus1: null
                });
                postorg = formatToTree(postorg, null)
                console.log(postorg)
                setTitreexistant(reponsemetie.organigramme.map(poste=> poste.orgIntitulePoste))
                setData(postorg[0]);
                
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
            <Row
            justifyContent={'space-between'}
            px={3}
            height={'10vh'}
            backgroundColor="white"
        >
            <DynamicHeadNav title={"Organigramme"} />
                <Row
                    width={'22%'}
                    justifyContent="space-between"
                >
                    <Button
                        variant="contained"
                        color="blue"
                        fullWidth
                        sx={{ px: 2, py: 1, mx: 2 }}
                        onClick={handleOpen}
                    >
                        <Typography color="white">
                            Crée un poste
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="blue"
                        fullWidth
                        sx={{ px: 2, py: 1 }}
                    >
                        <Typography variant="button" color="white">
                            Importer
                        </Typography>
                    </Button>
                </Row>
            </Row>
            <Box
                // backgroundColor="background.paper"
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
                        <OrganizationChart
                            ref={orgchart}
                            datasource={data}
                            draggable={true}
                            zoom={true}
                            pan={true}
                            NodeTemplate={(node)=> TreeNode(node)}
                            onClickNode={onClickNode}
                            onClickChart={(e)=> setNodeselected({titre: ''})}
                        />
                    </Grid>
                    {
                        open && 
                        <CreationPosteModal
                            open={open}
                            onClose={handleClose}
                            onSubmit={addNode}
                            dataPersonne={dataPersonne}
                            titreexistant={titreexistant}
                            ficheposte={ficheposte}
                        />
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
