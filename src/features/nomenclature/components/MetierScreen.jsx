import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { authenticateClient, getFicheMetierData } from './api';
import MaterialReactTable from 'material-react-table';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

function MetierScreen() {
    const theme = useTheme()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
  
    useEffect(() => {
      authenticateClient()
        .then((data) => {
          setAccessToken(data.access_token);
          getFicheMetierData(data.access_token)
            .then((data) => {
              console.log(data)
              const formattedData = data.map((item) => ({
                code: item.code,
                libelle: item.metier.libelle,
              }));
              setData(formattedData);
              setLoading(false);
            })
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Authentication error:', error.message);
          setLoading(false);
        });
    }, []);
  
    const columns = useMemo(
        () =>[
            { 
                accessorKey: 'code',
                header: 'Code',
                Cell: ({ cell, column }) => (
                    <Link to={`/metierdetail/${cell.getValue()}`}>{cell.getValue()}</Link>
                ),
            },
            { accessorKey: 'libelle', header: 'Libellé' },
        ],
        [],
    );
    if (loading || error) {
        return (
          <Fragment>
              <HeaderInScreen
                  title={'Liste fiche métier'}
              />
              <Box
                  backgroundColor="background.paper"
                  display={'flex'}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height={'auto'}
                  minHeight="80vh"
              >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}
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
                        <div>
                            {error && (
                                <Snackbar 
                                    open={error || loading}
                                    autoHideDuration={6000}
                                    anchorOrigin={{ vertical:'top', horizontal:'right' }}
                                >
                                    <Alert severity="error">
                                        Une erreur s'est produite lors de la connexion à l'API.
                                    </Alert>
                                </Snackbar>
                            )}
                            {loading && (
                                <Snackbar 
                                    open={error || loading}
                                    autoHideDuration={6000}
                                    anchorOrigin={{ vertical:'top', horizontal:'right' }}
                                >
                                    <Alert severity="warning" >
                                        chargement de donné depuis l'API.
                                    </Alert>
                                </Snackbar>
                            )}
                        </div>
                    </Grid>
                </Grid>
                
              </Box>
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Liste fiche métier'}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
        >
            <Grid container spacing={2} pl={5} pr={5}>
                <Grid item xs={12} md={12}
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
                    <Paper sx={{width: '100%'}}>
                        <MaterialReactTable
                            columns={columns}
                            data={data}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            autoHeight
                            localization={MRT_Localization_FR}
                            enableStickyHeader
                            muiTableBodyProps={{
                                sx: {
                                    '& tr:nth-of-type(odd)': {
                                    backgroundColor: '#f5f5f5',
                                    },
                                },
                            }}
                            muiTableBodyCellProps={{
                                sx: {
                                    color: 'black.main'
                                },
                            }}
                            enableTopToolbar={false} //hide top toolbar
                            muiTableHeadCellProps={{
                                sx: {
                                    color: 'black.main'
                                },
                            }}
                            muiTableHeadRowProps={{
                                sx: {
                                    backgroundColor: "unset"
                                },
                            }}
                            muiTableBodyRowProps={{
                                sx: {
                                    backgroundColor: "unset"
                                },
                                hover: false
                            }}
                            initialState={{ density: 'compact' }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default MetierScreen