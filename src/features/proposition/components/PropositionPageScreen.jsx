import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { listmetier } from  '../../../services/MetierService';
import { listcompetance } from  '../../../services/CompetanceService';
import { listpost } from  '../../../services/PosteService';
import { listproposition, postPropositionPoste } from  '../../../services/PropositionService';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import { LoadingMetier, TableMetier } from '../../../shared'
import { Button, Link, Typography } from '@mui/material';
import ModalEdit from './ModalEdit';
import ModalCreate from './ModalCreate';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BackspaceIcon from '@mui/icons-material/Backspace';

function PropositionPageScreen() {
    const theme = useTheme()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataCompetance, setDataCompetance] = useState(false);
    const [dataMetiercode, setDataMetiercode] = useState(false);
    const [propositionexistant, setDataPropositionexistant] = useState(false);
    const [allproposition, setDataallproposition] = useState(false);
    const [open, setOpen] = useState(false);
    const [opencreate, setOpencreate] = useState(false);
    
    const hangleopenmodal = () => {
        setOpen(true)
    }
    const hangleopencreatemodal = () => {
        setOpencreate(true)
    }
    const handleCloseCreate = () => {
        setOpencreate(false)
    }
    const mapingdata = (datatomap) =>{
        const datatoformat = datatomap.map(data=>{
            return {
                id: data.id,
                metier: data.propositionPostes[0].metier.code+" "+data.propositionPostes[0].metier.nom,
                like: 0,
                unlike: 0,
                creation: data.creation,
                createdby: data.createdby
            }
        })
        var data1 = datatoformat.filter(data=>{
            if(data.createdby === 1){return true}
            return false
        })
        var data2 = datatoformat.filter(data=>{
            if(data.createdby !== 1){return true}
            return false
        })
        setData(data1)
        setDataallproposition(data2)
    }
    const handleSubmit = async (data) => {
        console.log(data)
        setLoading(true);
        try {
            const dataproposition = await postPropositionPoste(data)
            const reponsemetie = await dataproposition;
            mapingdata(reponsemetie)
            setLoading(false);
        }
        catch (error) {
            console.error('Une erreur s\'est produite :', error);
            setError("Une erreur s'est produite lors de l'appele serveur");
            setLoading(false);
        }
    }
    const handleClose = () => {
        setOpen(false)
    }
    const buttonStyle = {
        display: 'block',
        marginBottom: '20px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center"
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await listmetier();
                const reponsemetie = await datametierexistant;
                const datacompetanceexistant = await listcompetance();
                const reponsecompetance = await datacompetanceexistant;
                const datacompetanceaapi = await listpost();
                const reponsedatacompetanceaapi = await datacompetanceaapi;
                const dataproposition = await listproposition()
                const reponseproposition = await dataproposition;
                setDataMetiercode(reponsemetie);
                setDataCompetance(reponsecompetance);
                setDataPropositionexistant(reponsedatacompetanceaapi)
                mapingdata(reponseproposition)
                setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setDataMetiercode, setDataCompetance, setDataPropositionexistant, setLoading, setError, mapingdata]);
  
    const columns = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: '',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <EditIcon></EditIcon>
            ),
            Cell: ({ cell }) => 
                (<Link>modifier</Link>)
          },
          {
            accessorKey: 'metier',
            header: 'Metiers',
            size: 400,
            enableEditing: false,
          },
          {
            accessorKey: 'like',
            header: 'Nombre de personne qui a un vote pour votre faveur',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
            ),
          },
          {
            accessorKey: 'unlike',
            header: 'Nombre de personne qui a un vote contre votre faveur',
            size: 100,
            enableHiding: true,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbDownOffAltIcon></ThumbDownOffAltIcon>
            ),
          },
          {
            accessorKey: 'creation',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            Header: ({ column }) => (
                <CalendarMonthIcon></CalendarMonthIcon>
            ),
          }
        ],
        [],
    );
    const columns2 = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: '',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <EditIcon></EditIcon>
            ),
            Cell: ({ cell }) => 
                (<Link>Détails</Link>)
          },
          {
            accessorKey: 'metier',
            header: 'Metiers',
            size: 400,
            enableEditing: false,
          },
          {
            accessorKey: 'like',
            header: 'Nombre de personne qui a un vote pour votre faveur',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
            ),
          },
          {
            accessorKey: 'unlike',
            header: 'Nombre de personne qui a un vote contre votre faveur',
            size: 100,
            enableHiding: true,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbDownOffAltIcon></ThumbDownOffAltIcon>
            ),
          },
          {
            accessorKey: 'id',
            header: 'Remettre mon vote à zero',
            size: 100,
            enableHiding: true,
            enableEditing: false,
            Header: ({ column }) => (
                <BackspaceIcon></BackspaceIcon>
            ),
          },
          {
            accessorKey: 'creation',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            Header: ({ column }) => (
                <CalendarMonthIcon></CalendarMonthIcon>
            ),
          }
        ],
        [],
    );
    if (loading || error) {
        return (
          <Fragment>
              <HeaderInScreen
                  title={'Update - créer ou modifier un métier'}
              />
              {LoadingMetier(loading, error)}
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Update - créer ou modifier un métier'}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
        >
            <Grid container spacing={2} pl={5} pr={5}>
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
                    <Typography>Mes propositions</Typography>
                    {TableMetier(columns,data)}
                </Grid>
                <Grid item xs={12} md={2} my={5}>
                    <Button 
                        key="modifmetier"
                        variant="contained"
                        color='blue'
                        fullWidth
                        style={buttonStyle}
                        size='large'
                        onClick={hangleopenmodal}>
                            Modifier un metier
                    </Button>
                    <Button 
                        key="addmetier"
                        variant="contained"
                        color='blue'
                        fullWidth
                        style={buttonStyle}
                        size='large'
                        onClick={hangleopencreatemodal}>
                            crée un metier
                    </Button>

                    <Button 
                        key="propositionfaite"
                        variant="contained"
                        color='primary'
                        fullWidth
                        style={buttonStyle}
                        size='large'>
                            Nb de propositions effectuées :
                    </Button>
                    <Button 
                        key="pourcentproposition"
                        variant="contained"
                        color='primary'
                        fullWidth
                        style={buttonStyle}
                        size='large'>
                            % d’acceptations : 
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} pl={5} pr={5}>
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
                    <Typography>Propositions du réseau en cours</Typography>
                    {TableMetier(columns2,allproposition)}
                </Grid>
                <Grid item xs={12} md={2} my={5}>
                    <Button 
                        key="filtre"
                        variant="contained"
                        color='primary'
                        fullWidth
                        style={buttonStyle}
                        size='large'>
                            Filtrer sur non répondu 
                    </Button>
                </Grid>
            </Grid>
        </Box>
        <ModalEdit
            open={open}
            listCompetance={dataCompetance}
            listmetier={dataMetiercode}
            listposte={propositionexistant}
            onSubmit = {handleSubmit}
            onClose = {handleClose}
        ></ModalEdit>
        <ModalCreate
            open={opencreate}
            listCompetance={dataCompetance}
            listmetier={dataMetiercode}
            listposte={propositionexistant}
            onSubmit = {handleSubmit}
            onClose = {handleCloseCreate}
        >

        </ModalCreate>
    </Fragment>
    );
}

export default PropositionPageScreen