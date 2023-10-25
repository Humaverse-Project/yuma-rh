import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMetier } from "../../../../model/reducer/FichesMetiers";
import { fetchPoste } from "../../../../model/reducer/Organigramme";
import { postupdateposteoruser } from "../../../../services/OrganigrammeService"
import { CircularProgressElement } from "../../../../shared"
import { datefonctiondeux } from "../../../../services/DateFormat"
import EditPosteModal from './EditPosteModal';
import FicheMetierDetailModal from './FicheMetierDetailModal';
import { 
    Dialog,
    DialogContent,
    Grid,
    Typography,
    Tab,
    Box
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';

import PosteTable from '../Part/PosteTable'
import SearchCustom from '../Part/SearchCustom';


const CreationPosteModal = ({ open, onClose, onSubmit, dataPersonne, titreexistant, ficheposte, nodeselected  }) => {
    const [loadingrome, setloadingrome] = useState(false);
    const [showficherow, setshowficherow] = useState(false);
    const [ficherowselected, setficherowselected] = useState(false);
    const [value, setValue] = React.useState('1');
    const [fichenonassigne, setfichenonassigne] = useState([])
    const [ficheassigne, setficheassigne] = useState([])
    const [editmyposte, seteditmyposte] = useState(false)
    const [thisposte, setPosteEdition] = useState({})
    const { fichemetierentreprise, status, fichemetieryuma } = useSelector((state) => state.fichesmetiers);
    const dispatch = useDispatch();

    useEffect(() => {
        let poste = ficheposte.map(x=> parseInt(x.organigrammeNplus1.replace("P_", "")))
        let present = ficheposte.filter(data=>{
            if(!poste.includes(data.id) && data.organigrammeNplus1 === "P_0") return false
            return true
        })
        let absent = ficheposte.filter(data=>{
            if(!poste.includes(data.id) && data.organigrammeNplus1 === "P_0") return true
            return false
        })
        setfichenonassigne(absent)
        setficheassigne(present)
        dispatch(fetchMetier());
        
    }, [ficheposte, dispatch])
    useEffect(() => {
        if (fichemetierentreprise) {
            setloadingrome(false);
        }
    }, [fichemetierentreprise]);
    const sumbitupdateposte = (e) => {
        seteditmyposte(false)
        console.log(thisposte)
        setloadingrome(true)
        postupdateposteoruser(thisposte)
        .then((reponsemetie) => {
            setloadingrome(false)
            dispatch(fetchPoste())
        })
        .catch((error) => {
            console.log(error);
            setloadingrome(false)
        });

    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme()
    const columns = useMemo(
        () => [
          {
            accessorKey: 'orgIntitulePoste',
            header: 'Nom du poste',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true
          },
          {
            accessorKey: 'fichesPostes.fiches_postes_titre',
            header: 'Fiche métier associée',
            enableEditing: false,
          },
          {
            accessorKey: 'fichesPostes.rome.code',
            header: 'Rome',
            enableEditing: false,
          },{
            accessorKey: 'createdAt',
            header: 'Date de création',
            enableEditing: false,
            Cell: ({ cell }) => datefonctiondeux(cell.getValue()),
          }
        ],
        [],
    );
    const columnsmetier = useMemo(
        () => [
          {
            accessorKey: 'titre',
            header: 'Nom du poste',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true
          },
          {
            accessorKey: 'emplois.emploiTitre',
            header: 'Fiche métier associée',
            enableEditing: false,
          },
          {
            accessorKey: 'rome.code',
            header: 'Rome',
            enableEditing: false,
          },{
            accessorKey: 'createdAt',
            header: 'Date de création',
            enableEditing: false,
            Cell: ({ cell }) => datefonctiondeux(cell.getValue()),
          }
        ],
        [],
    );
    return (
        <ThemeProvider theme={theme}>
            <CircularProgressElement
                open={(status === true || loadingrome === true)}
            />
            {
                editmyposte && 
                <EditPosteModal
                    open={editmyposte}
                    onClose={(e)=> seteditmyposte(false)}
                    personnelist={dataPersonne}
                    submitdata= { sumbitupdateposte }
                    thisposte={thisposte}
                    setPosteEdition={setPosteEdition}
                    titreexistant={titreexistant}
                />
            }
            {
                showficherow && 
                <FicheMetierDetailModal
                    open={showficherow}
                    onClose={(e)=> setshowficherow(false)}
                    ficheRow={ficherowselected}
                    nodeselected={nodeselected}
                />
            }
            <Dialog  open={open} onClose={onClose}>
                <DialogContent dividers={true}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="h5" sx={{color: "blue.main"}}>Crée un poste</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <SearchCustom />
                        </Grid>
                    </Grid>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Vos fiches de postes" value="1" />
                                <Tab label="A partir de vos fiches métiers" value="2" />
                                <Tab label="A partir des fichers métiers YUMA" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{backgroundColor: "background.paper", borderRadius: "0 10px 10px 10px", height: "65vh", minHeight:"65vh", maxHeight: "65vh", overflowX:"auto"}}>
                            <Typography variant='h6'>Fiches non utilisées:</Typography>
                            <PosteTable
                                editaction={(e)=>console.log(e)}
                                columns={columns}
                                data={fichenonassigne}
                                TableClick={(e)=>console.log(e)}
                            />
                            <Typography variant='h6'>Fiches déjà assignées:</Typography>
                            <PosteTable
                                editaction={(e)=>{setPosteEdition(e); seteditmyposte(true)}}
                                columns={columns}
                                data={ficheassigne}
                                TableClick={(e)=>console.log(e)}
                            />
                        </TabPanel>
                        <TabPanel value="2" sx={{backgroundColor: "background.paper", borderRadius: "10px 10px 10px 10px", height: "65vh", minHeight:"65vh", maxHeight: "65vh", overflowX:"auto"}}>
                            <PosteTable
                                editaction={(e)=>console.log(e)}
                                columns={columnsmetier}
                                data={fichemetierentreprise}
                                TableClick={(e)=>{setficherowselected(e); setshowficherow(true)}}
                            />
                        </TabPanel>
                        <TabPanel value="3" sx={{backgroundColor: "background.paper", borderRadius: "10px 10px 10px 10px",height: "65vh", minHeight:"65vh", maxHeight: "65vh", overflowX:"auto"}}>
                            <PosteTable
                                editaction={(e)=>console.log(e)}
                                columns={columnsmetier}
                                data={fichemetieryuma}
                                TableClick={(e)=>{setficherowselected(e); setshowficherow(true); console.log(e)}}
                            />
                        </TabPanel>
                    </TabContext>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}
export default CreationPosteModal