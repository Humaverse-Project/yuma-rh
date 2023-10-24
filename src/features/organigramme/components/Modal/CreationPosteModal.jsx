import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMetier } from "../../../../model/reducer/FichesMetiers";
import { fetchPoste } from "../../../../model/reducer/Organigramme";
import { postupdateposteoruser } from "../../../../services/OrganigrammeService"
import { CircularProgressElement } from "../../../../shared"
import { datefonctiondeux } from "../../../../services/DateFormat"
import EditPosteModal from './EditPosteModal';
import { 
    Dialog,
    DialogContent,
    Grid,
    Typography,
    InputBase,
    Tab,
    Box
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import PosteTable from '../Part/PosteTable'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #7a818c",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));



const CreationPosteModal = ({ open, onClose, onSubmit, dataPersonne, titreexistant, ficheposte  }) => {
    const [loadingrome, setloadingrome] = useState(false);
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
            enableClickToCopy: true,
          },
          {
            accessorKey: 'fichesPostes.rome.code',
            header: 'Rome',
            enableEditing: false,
            enableClickToCopy: true,
          },{
            accessorKey: 'createdAt',
            header: 'Date de création',
            enableEditing: false,
            enableClickToCopy: true,
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
            enableClickToCopy: true,
          },
          {
            accessorKey: 'rome.code',
            header: 'Rome',
            enableEditing: false,
            enableClickToCopy: true,
          },{
            accessorKey: 'createdAt',
            header: 'Date de création',
            enableEditing: false,
            enableClickToCopy: true,
            Cell: ({ cell }) => datefonctiondeux(cell.getValue()),
          }
        ],
        [],
    );
    return (
        <ThemeProvider theme={theme}>
            <CircularProgressElement
                open={(status === true || loadingrome == true)}
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
            
            <Dialog  open={open} onClose={onClose}>
                <DialogContent dividers={true}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="h5" sx={{color: "blue.main"}}>Crée un poste</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Search>
                                <SearchIconWrapper>
                                <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Recherche"
                                    inputProps={{ 'aria-label': 'Recherche' }}
                                />
                            </Search>
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
                            />
                            <Typography variant='h6'>Fiches déjà assignées:</Typography>
                            <PosteTable
                                editaction={(e)=>{setPosteEdition(e); seteditmyposte(true)}}
                                columns={columns}
                                data={ficheassigne}
                            />
                        </TabPanel>
                        <TabPanel value="2" sx={{backgroundColor: "background.paper", borderRadius: "10px 10px 10px 10px", height: "65vh", minHeight:"65vh", maxHeight: "65vh", overflowX:"auto"}}>
                            <PosteTable
                                editaction={(e)=>console.log(e)}
                                columns={columnsmetier}
                                data={fichemetierentreprise}
                            />
                        </TabPanel>
                        <TabPanel value="3" sx={{backgroundColor: "background.paper", borderRadius: "10px 10px 10px 10px",height: "65vh", minHeight:"65vh", maxHeight: "65vh", overflowX:"auto"}}>
                            <PosteTable
                                editaction={(e)=>console.log(e)}
                                columns={columnsmetier}
                                data={fichemetieryuma}
                            />
                        </TabPanel>
                    </TabContext>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}
export default CreationPosteModal