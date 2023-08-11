import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { authenticateClient, getListeCompetance } from './api';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { LoadingMetier, TableMetier } from '../../../shared'

function CompetanceScreen() {
    const theme = useTheme()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errortokken, setErrortokken] = useState(false);
    const [error, setError] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [valuefiltre, setValueFiltre] = useState(null);
    const datafiltre = [
        {label: "savoir", valeur: "savoir"},
        {label: "Macro savoir faire", valeur: "macro-savoir-faire"},
        {label: "competence détaillée", valeur: "competence-detaillee"},
        {label: "Macro savoir être professionnel", valeur: "macro-savoir-etre-professionnel"},
    ]
    useEffect(() => {
        authenticateClient()
          .then((data) => {
            setAccessToken(data.access_token);
            setErrortokken(false);
            setLoading(false);
          })
          .catch((error) => {
            setErrortokken(true);
            console.error('Authentication error:', error.message);
          });
    }, []);
    const afficherDonnees = () => {
        setLoading(true);
        getListeCompetance(accessToken, valuefiltre)
        .then((data) => {
            console.log(data)
            const formattedData = data.map((item) => ({
            code: item.code,
            nom: item.libelle,
            type: item.type,
            }));
            setData(formattedData);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setError(true);
            setLoading(false);
        });
    }
    const columns = useMemo(
        () =>[
            { 
                accessorKey: 'code',
                header: 'Code',
                Cell: ({ cell, column }) => (
                    <Link to={`/competancedetail/${cell.getValue()}`}>{cell.getValue()}</Link>
                ),
            },
            { accessorKey: 'nom', header: 'Libellé' },
            { accessorKey: 'type', header: 'Type' },
        ],
        [],
    );
    const handleChangelabel = (event, value) => {
        setValueFiltre(value.valeur)
    };
    if (loading || errortokken) {
        return (
            <Fragment>
                <HeaderInScreen
                    title={'Liste competance'}
                />
                {LoadingMetier(loading, errortokken)}
            </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Liste competance'}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
            paddingTop={5}
        >
            {error && (
                <Snackbar 
                    open={error}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical:'top', horizontal:'right' }}
                >
                    <Alert severity="error">
                        Une erreur s'est produite lors de la connexion à l'API.
                    </Alert>
                </Snackbar>
            )}
            <Grid container spacing={2} pl={5} pr={5}>
                <Grid item xs={12} md={2}>
                    <Card
                        sx={{
                            display: 'flex',
                            width: '100%'
                            
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%'
                            }}
                        >
                            <CardContent
                                sx={{
                                    flex: '1 0 auto',
                                    color: 'black.main',
                                }}
                            >
                                <Autocomplete
                                    sx={{
                                        mt: 2,
                                        mb: 2
                                    }}
                                    disablePortal
                                    options={datafiltre}
                                    onChange={handleChangelabel}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            label="Type" 
                                            name="metier"
                                            variant="outlined"
                                        />
                                    )}
                                />
                                <Button
                                    variant="contained"
                                    onClick={afficherDonnees}
                                    color="blue"
                                    size='large'
                                    fullWidth
                                >
                                    Recherche
                                </Button>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
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
                    {TableMetier(columns,data)}
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default CompetanceScreen