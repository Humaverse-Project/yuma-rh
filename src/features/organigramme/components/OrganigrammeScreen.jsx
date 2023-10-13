import React, { useState, useEffect, Fragment } from 'react'
import { OrgChartComponent } from './OrgChart'
import HeaderInScreen from '../../header/HeaderInScreen'
import { Button, Box, Grid, Divider, Autocomplete, TextField, CircularProgress, Backdrop } from '@mui/material'
import './mylink.css'
import { Snackbar, Alert } from '@mui/material'
import {
    loaddata,
    postdata,
    postupdate,
} from '../../../services/OrganigrammeService'
import theme from './theme'
import NewPosteModal from './NewPosteModal'

function OrganigrammeScreen() {
    const [data, setData] = useState([])
    const [loadingrome, setloadingrome] = useState(true);
    const [dataPersonne, setDataPersonne] = useState([])
    const [datametier, setDataMetier] = useState(null)
    const [posteentreprise, setposteentreprise] = useState([])
    const [titreexistant, setTitreexistant] = useState([])
    //const [etat, setEtat] = useState();
    const [nodeselected, setNodeselected] = useState({
        titre: '',
    })
    let addNodeChildFunc = null
    let initializeChart = null
    let deletenode = null

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
    const sendupdateposte = async (source, target) => {
        let obj = {
            nodeId: source.nodeId,
            parentNodeId: target.nodeId,
        }
        const datametierexistant = await postupdate(obj)
        await datametierexistant
    }
    const [showError, setShowError] = useState(false)

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setShowError(false)
    }
    async function addNode(newnode) {
        if (nodeselected.nodeId !== undefined) {
            newnode.parentNodeId = nodeselected.nodeId
        }
        if (data.length === 0) {
            newnode.parentNodeId = ''
        }
        const datametierexistant = await postdata(newnode)
        const reponsemetie = await datametierexistant
        newnode.nodeId = reponsemetie.id
        if (data.length === 0) {
            newnode.parentNodeId = ''
            setData([...data, newnode])
            initializeChart()
        } else {
            addNodeChildFunc(newnode)
        }
        return true
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await loaddata()
                const reponsemetie = await datametierexistant
                setDataMetier(
                    reponsemetie.rome.map((metier) => {
                        return {
                            label:
                            metier.rome_coderome + ' ' + metier.nom,
                            code: metier.rome_coderome,
                            nom: metier.nom,
                            id: metier.id,
                        }
                    })
                )
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
                setposteentreprise(reponsemetie.poste)
                let postorg = reponsemetie.organigramme.map((poste) => {
                    let titre = poste.orgIntitulePoste
                    let nodeId = poste.id
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
                        titre: titre,
                        nodeId: nodeId,
                        personne: personne,
                        personneid: personneid,
                        parentNodeId: parentNodeId,
                        imageUrl:
                            'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
                    }
                })
                setTitreexistant(reponsemetie.organigramme.map(poste=> poste.orgIntitulePoste))
                setData(postorg)
                setloadingrome(false)
            } catch (error) {
                console.error("Une erreur s'est produite :", error)
                setShowError(true)
            }
        }
        fetchData()
    }, [setShowError])

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
                            disabled={
                                datametier === null ||
                                (data.length > 0 && nodeselected.titre === '')
                            }
                            size="large"
                            fullWidth
                            color="blue"
                        >
                            Ajouter un poste
                        </Button>
                        </Box>
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
                        {/* <Button variant="contained" color="primary" sx={{m: 2}}>
              Importer
            </Button> 
            <Button variant="contained" sx={{mt: 2}} size="large" disabled={!etat} onClick={handleDeletenode} fullWidth color="blue">
              Supprimer { nodeselected.name }
            </Button>*/}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            p:0
                        }}
                    >
                        <OrgChartComponent
                            setClick={(click) => (addNodeChildFunc = click)}
                            setDeletefonction={(click) => (deletenode = click)}
                            deleteNode={(d, etat) => {
                                //setEtat(etat)
                                setNodeselected(d)
                            }}
                            initializeChart={(init) => (initializeChart = init)}
                            onNodeDrop={(source, target) => {
                                sendupdateposte(source, target)
                            }}
                            data={data}
                            svgWidth={200}
                        />
                    </Grid>
                    {
                        open && 
                        <NewPosteModal
                            open={open}
                            onClose={handleClose}
                            onSubmit={addNode}
                            dataPersonne={dataPersonne}
                            datametier={datametier}
                            posteentreprise={posteentreprise}
                            titreexistant={titreexistant}
                        />
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
