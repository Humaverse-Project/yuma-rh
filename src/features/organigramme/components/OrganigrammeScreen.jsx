import React, { useState, useEffect, Fragment, useRef } from 'react'
import OrganizationChart from "@dabeng/react-orgchart";
import { DynamicHeadNav, Row } from '../../../shared'
import { Button, Box, Grid, Divider, Typography, FormControlLabel, Checkbox, ListItemText } from '@mui/material'
import './mycss.css'
import { Snackbar, Alert } from '@mui/material'
import NodeTempate from './Part/NodeTempate';
import {
    postdata,
    postupdate,
    deleteNodeserveur
} from '../../../services/OrganigrammeService'
import JSONDigger from "json-digger";
import CreationPosteModal from './Modal/CreationPosteModal';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPoste } from "../../../model/reducer/Organigramme";
import { CircularProgressElement } from "../../../shared"
import SearchCustom from './Part/SearchCustom';

function OrganigrammeScreen() {
    const theme = useTheme()
    const dispatch = useDispatch();
    const { data, status, titrelist, ficheposte, dataPersonne } = useSelector((state) => state.organigramme);
    const [ org, setOrg ] = useState({});
    let dsDigger = new JSONDigger(org, "id", "children");
    const [loadingrome, setloadingrome] = useState(false);
    let source = {}
    let target = {}
    const orgchart = useRef();

    useEffect(() => {
        dispatch(fetchPoste());
    }, [dispatch]);
    
    useEffect(() => {
        if (data) {
            setOrg(JSON.parse(JSON.stringify(data)));
        }
    }, [data]);

    const sendupdateposte = async (e) => {
        await dsDigger.updateNode({...source, postion: (target.postion+1)});
        let obj = {
            nodeId: source._id,
            parentNodeId: target._id
        }
        const datametierexistant = await postupdate(obj)
        await datametierexistant
        dispatch(fetchPoste());
        source = {}
        target = {}
    }
    
    const colors = ['#6E6B6F','#18A8B6','#F45754','#96C62C','#BD7E16','#802F74','#34ebeb',"#7a39e3", "#f507a6", "#ebdc0c", "#eb170c", "#0515fa", "#070921", "#29d419"];
      
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
                affichepersonnelle={affichepersonnelle}
                affichemetier={affichemetier}
                afficheposte={afficheposte}
            />
          </div>
        );
    }
    const [nodeselected, setNodeselected] = useState({
        titre: '',
    })

    const [open, setOpen] = useState(false)
    const [affichepersonnelle, setaffichepersonnelle] = useState(true)
    const [affichemetier, setaffichemetier] = useState(false)
    const [afficheposte, setafficheposte] = useState(true)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
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
        return true
    }
    async function deleteNode(e){
        setloadingrome(true)
        deleteNodeserveur(nodeselected._id).then(async (datametierexistant) => {
            if(nodeselected.postion !== 0){
                await dsDigger.removeNode(nodeselected.id);
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

    const onClickNode = (e) => {
        setNodeselected(e)
    } 
    return (
        <Fragment>
            <CircularProgressElement
                open={(status === true || loadingrome === true)}
            />
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
                            <SearchCustom />
                            <FormControlLabel
                                checked={affichepersonnelle}
                                control={
                                    <Checkbox
                                        onChange={(event) => {
                                            const isChecked = event.target.checked;
                                            if (isChecked) {
                                                setaffichepersonnelle(true)
                                            } else {
                                                setaffichepersonnelle(false)
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <ListItemText
                                        primary={"Personnel"}
                                    />
                                }
                                sx={{
                                    width: "90%",
                                    ml:1,
                                    mt:1
                                }}
                            />
                            <FormControlLabel
                                checked={afficheposte}
                                control={
                                    <Checkbox
                                        onChange={(event) => {
                                            const isChecked = event.target.checked;
                                            if (isChecked) {
                                                setafficheposte(true)
                                            } else {
                                                setafficheposte(false)
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <ListItemText
                                        primary={"Poste"}
                                    />
                                }
                                sx={{
                                    width: "90%",
                                    ml:1,
                                }}
                            />
                            <FormControlLabel
                                checked={affichemetier}
                                control={
                                    <Checkbox
                                        onChange={(event) => {
                                            const isChecked = event.target.checked;
                                            if (isChecked) {
                                                setaffichemetier(true)
                                            } else {
                                                setaffichemetier(false)
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <ListItemText
                                        primary={"Métier"}
                                    />
                                }
                                sx={{
                                    width: "90%",
                                    ml:1,
                                }}
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
                        { org.hasOwnProperty("titre") &&
                            <OrganizationChart
                                ref={orgchart}
                                datasource={org}
                                draggable={true}
                                zoom={true}
                                pan={true}
                                NodeTemplate={(node)=> TreeNode(node)}
                                onClickNode={onClickNode}
                                onClickChart={(e)=> setNodeselected({titre: ''})}
                            />
                        }
                    </Grid>
                    {
                        open && 
                        <CreationPosteModal
                            open={open}
                            onClose={handleClose}
                            onSubmit={addNode}
                            dataPersonne={dataPersonne}
                            titreexistant={titrelist}
                            ficheposte={ficheposte}
                            nodeselected={nodeselected}
                        />
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
