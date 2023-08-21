import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { getpostbycompetanceid } from  '../../../services/PosteService';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { LoadingMetier, TableMetier } from '../../../shared'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom';
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';

function CompetanceDetail() {
    const { code } = useParams();
    const theme = useTheme()
    const [data, setData] = useState(null);
    const [posteactive, setDataPoste] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await getpostbycompetanceid(code);
                const reponsemetie = await datametierexistant;
                var datatraitre = reponsemetie.map(item=> {
                    return {
                        meiterid: item.metier.id,
                        nom: item.metier.nom,
                        niveau: item.niveauCompetance,
                        codeRome: item.metier.code,
                        descriptionL: item.metier.descriptionL,
                        descriptionC: item.metier.descriptionC,
                        creation: item.creation
                    }
                })
                setData(datatraitre);
                setDataPoste(reponsemetie[0].competance)
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
            accessorKey: 'meiterid',
            header: 'ID metier',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
            size: 80,
            Cell: ({ cell }) => 
                (<Link to={`/metierdetail/${cell.getValue()}`}>{cell.getValue()}</Link>),
            },
          {
            accessorKey: 'codeRome',
            header: 'Code',
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
                  title={'Détail competance '+code}
              />
              {LoadingMetier(loading, error)}
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Détail competance '+posteactive.code}
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
                                <b>code:</b> {posteactive.code}
                            </Typography>
                            <Typography component="div">
                                <b>Description courte:</b> {posteactive.descriptionC}
                            </Typography>
                            <Typography component="div">
                                <b>Description longue:</b> {posteactive.descriptionL}
                            </Typography>
                            <Typography component="div">
                                <b>creation:</b> {posteactive.creation}
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

export default CompetanceDetail