import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { listmetier } from  '../../../services/MetierService';
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
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await listmetier();
                const reponsemetie = await datametierexistant;
                setData(reponsemetie);
                setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, []);
  
    const columns = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: 'ID',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
            size: 80,
            Cell: ({ cell, column }) => 
                    (<Link to={`/metierdetail/${cell.getValue()}`}>{cell.getValue()}</Link>),
            },
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