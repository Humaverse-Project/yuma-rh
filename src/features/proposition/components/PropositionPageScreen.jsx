import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { listmetier } from  '../../../services/MetierService';
import { listcompetance } from  '../../../services/CompetanceService';
import { listpost } from  '../../../services/PosteService';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import { LoadingMetier, TableMetier } from '../../../shared'
import { Button, Typography } from '@mui/material';
import ModalEdit from './ModalEdit';

function PropositionPageScreen() {
    const theme = useTheme()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataCompetance, setDataCompetance] = useState(false);
    const [dataMetiercode, setDataMetiercode] = useState(false);
    const [propositionexistant, setDataPropositionexistant] = useState(false);
    const [open, setOpen] = useState(false);

    const hangleopenmodal = () => {
        setOpen(true)
    }
    const handleSubmit = (data) => {
        console.log(data)
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
                setDataMetiercode(reponsemetie);
                setDataCompetance(reponsecompetance);
                setDataPropositionexistant(reponsedatacompetanceaapi)
                setData([])
                setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setDataMetiercode, setDataCompetance, setDataPropositionexistant, setLoading, setError]);
  
    const columns = useMemo(
        () => [
          {
            accessorKey: 'code',
            header: 'Code Rome',
            size: 140,
            enableEditing: false,
          },
          {
            accessorKey: 'nom',
            header: 'Nom',
            size: 140,
            enableEditing: false,
          },
          {
            accessorKey: 'descriptionC',
            header: 'Decription courte',
            size: 140,
            enableEditing: false,
          },
          {
            accessorKey: 'descriptionL',
            header: 'Decription longue',
            size: 140,
            enableHiding: true,
            enableEditing: false,
          },
          {
            accessorKey: 'creation',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
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
                        onClick={hangleopenmodal}>
                            crée un metier
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
    </Fragment>
    );
}

export default PropositionPageScreen