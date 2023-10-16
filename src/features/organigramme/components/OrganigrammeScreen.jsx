import React, { useState, useEffect, Fragment, useLayoutEffect, useRef } from 'react'
import { OrgChart } from 'd3-org-chart';
// import { OrgChartComponent } from './OrgChart'
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

function OrganigrammeScreen() {
    const [data, setData] = useState([])
    const [loadingrome, setloadingrome] = useState(true);
    const [dataPersonne, setDataPersonne] = useState([])
    const [titreexistant, setTitreexistant] = useState([])
    const d3Container = useRef(null);
    const [mychart, setChart] = useState(null);
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
        } else {
            mychart.addNode(newnode);
        }
        setTitreexistant([...titreexistant, newnode.titre])
        return true
    }
    async function deleteNode(e){
        setloadingrome(true)
        deleteNodeserveur(nodeselected.nodeId).then((datametierexistant) => {
            setTitreexistant(datametierexistant.organigramme.map(poste=> poste.orgIntitulePoste))
            if(nodeselected.parentNodeId !== ""){
                mychart.removeNode(nodeselected.nodeId)
            } else{
                setData([])
            }
            setNodeselected({titre: ''})
            setloadingrome(false)
        })
        .catch((error) => {
            console.log(error);
            setloadingrome(false)
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await loaddata()
                const reponsemetie = await datametierexistant
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
    useLayoutEffect(() => {
        if (d3Container.current) {
          const chart = new OrgChart();
          chart
            .container(d3Container.current)
            .data(data)
            .svgWidth(500)
            .initialZoom(0.5)
            .rootMargin(100)
            .nodeWidth((d) => 210)
            .nodeHeight((d) => 140)
            .childrenMargin((d) => 130)
            .compactMarginBetween((d) => 75)
            .compactMarginPair((d) => 80)
            .onNodeClick((d, i, arr) => {
              //props.onNodeClick(d);
                setNodeselected(d)
                if(d._totalSubordinates > 0){
                    chart.expand(d)
                }
                // 
                console.log(d)
                const containerHTMLElementall = d3Container.current.querySelector(".selectednodecuststype");
                if (containerHTMLElementall !== null) {
                    containerHTMLElementall.classList.remove("selectednodecuststype");
                }
                const containerHTMLElement = d3Container.current.querySelector('#circle'+d.nodeId);
                containerHTMLElement.classList.add("selectednodecuststype");
            //   containerHTMLElement.innerHTML = '';
            })
            .onNodeDrop((source, target)=>{
            //   chart.removeNode(source.nodeId)
            //   ()
            //   chart.addNode()
                let index = data.indexOf(source)
                data[index] = {
                    "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
                    "titre": source.titre,
                    "parentNodeId": target.nodeId,
                    "personne": source.personne,
                    "nodeId": source.nodeId,
                    "personneid": source.personneid
                }
                setData([...data])
                // 
                chart.setCentered(target.nodeId)
                chart.setExpanded(target.nodeId, true)
                sendupdateposte(source, target)
                chart.render()
              //
            })
            .nodeContent(function (d, i, arr, state) {
              const colors = [
                '#6E6B6F',
                '#18A8B6',
                '#F45754',
                '#96C62C',
                '#BD7E16',
                '#802F74',
              ];
              const color = colors[d.depth % colors.length];
              const imageDim = 80;
              const lightCircleDim = 95;
              const outsideCircleDim = 110;
    
              return (`
                  <div style="background-color:white; position:absolute;width:${
                    d.width
                  }px;height:${d.height}px;"  id="circle${d.data.nodeId}"  class="contentstyle">
                    <div style="background-color:${color};position:absolute;margin-top:-${outsideCircleDim / 2}px;margin-left:${d.width / 2 - outsideCircleDim / 2}px;border-radius:100px;width:${outsideCircleDim}px;height:${outsideCircleDim}px;"></div>
                    <div style="background-color:#ffffff;position:absolute;margin-top:-${
                      lightCircleDim / 2
                    }px;margin-left:${d.width / 2 - lightCircleDim / 2}px;border-radius:100px;width:${lightCircleDim}px;height:${lightCircleDim}px;"></div>
                    <img src=" ${
                      d.data.imageUrl
                    }" style="position:absolute;margin-top:-${imageDim / 2}px;margin-left:${d.width / 2 - imageDim / 2}px;border-radius:100px;width:${imageDim}px;height:${imageDim}px;" />
                    <div class="card" style="top:${
                      outsideCircleDim / 2 + 10
                    }px;position:absolute;height:30px;width:${d.width}px;background-color:#3AB6E3;">
                        <div style="background-color:${color};height:28px;text-align:center;padding-top:10px;color:#ffffff;font-weight:bold;font-size:16px">
                            ${d.data.personne} 
                        </div>
                        <div style="background-color:#F0EDEF;height:28px;text-align:center;padding-top:10px;color:#424142;font-size:16px">
                            
                            ${d.data.titre} 
                        </div>
                    </div>
                </div>
              `);
            })
          .render()
          setChart(chart)
          
        }
      }, [data]);
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
                            disabled={(data.length > 0 && nodeselected.titre === '')
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
                            data.length > 0 && 
                            <div ref={d3Container} />
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
