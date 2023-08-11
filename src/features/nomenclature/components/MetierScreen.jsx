import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { authenticateClient, getFicheMetierData } from './api';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { LoadingMetier, TableMetier } from '../../../shared'

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
              setError(true);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Authentication error:', error.message);
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
              {LoadingMetier(loading, error)}
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
                    {TableMetier(columns,data)}
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default MetierScreen