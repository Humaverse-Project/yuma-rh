import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { getpostbymetierid } from  '../../../services/PosteService';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { LoadingMetier, TableMetier } from '../../../shared'
import { Link } from 'react-router-dom';
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function MetierDetailScreen() {
    const { code } = useParams();

    const theme = useTheme()
    const [data, setData] = useState(null);
    const [metieractive, setDataMetier] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await getpostbymetierid(code);
                const reponsemetie = await datametierexistant;
                var datatraitre = reponsemetie.map(item=> {
                    return {
                        competanceid: item.competance.id,
                        niveau: item.niveauCompetance,
                        codeRome: item.competance.code,
                        descriptionL: item.competance.descriptionL,
                        descriptionC: item.competance.descriptionC,
                        class: item.competance.class,
                        creation: item.creation
                    }
                })
                setData(datatraitre);
                setDataMetier(reponsemetie[0].metier)
                setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [code]);
  
    const columns = useMemo(
        () => [
          {
            accessorKey: 'competanceid',
            header: 'ID Competance',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
            size: 80,
            Cell: ({ cell }) => 
                (<Link to={`/competancedetail/${cell.getValue()}`}>{cell.getValue()}</Link>),
            },
          {
            accessorKey: 'codeRome',
            header: 'Code',
            size: 140,
            enableEditing: false,
          },
          {
            accessorKey: 'niveau',
            header: 'Niveau requit',
            size: 140,
            enableEditing: false,
          },
          {
            accessorKey: 'descriptionC',
            header: 'Décription courte',
            size: 140,
            enableEditing: false,
          },
          {
            accessorKey: 'descriptionL',
            header: 'Decription longue',
            size: 140,
            enableEditing: true,
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
                  title={'Détail métier '+code}
              />
              {LoadingMetier(loading, error)}
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Détail métier '+metieractive.code}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            height={'auto'}
            minHeight={'80vh'}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    [theme.breakpoints.down('sm')]: {
                        justifyContent: 'center',
                    },
                    mx: 2,
                }}
                width={'100%'}
            >
                <Card
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        mt: 2,
                        mx: 5,
                        [theme.breakpoints.up('lg')]: {
                            width: '70%',
                        },
                        [theme.breakpoints.down('sm')]: {
                            my: 1,
                            mx: 0,
                            width: '90%',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <CardContent
                            sx={{
                                flex: '1 0 auto',
                                color: 'black.main',
                            }}
                        >
                            <Typography component="div">
                                <b>Nom:</b> {metieractive.nom}
                            </Typography>
                            <Typography component="div">
                                <b>code:</b> {metieractive.code}
                            </Typography>
                            <Typography component="div">
                                <b>Classe:</b> {metieractive.class}
                            </Typography>
                            <Typography component="div">
                                <b>Description courte:</b> {metieractive.descriptionC}
                            </Typography>
                            <Typography component="div">
                                <b>Description longue:</b> {metieractive.descriptionL}
                            </Typography>
                            <Typography component="div">
                                <b>creation:</b> {metieractive.creation}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
            <Grid container spacing={2} px={5}>
                <Grid item xs={12} md={12}
                    sx={{
                        [theme.breakpoints.up('lg')]: {
                            mt: 5,
                        },
                        [theme.breakpoints.down('sm')]: {
                            my: 1,
                            mx: 0,
                        },
                    }}
                >
                    <h4>Liste competance liée au métier</h4>
                    {TableMetier(columns,data)}
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default MetierDetailScreen