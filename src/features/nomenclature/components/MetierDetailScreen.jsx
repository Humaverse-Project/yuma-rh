import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { authenticateClient, getFicheMetierDataCode } from './api';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { LoadingMetier, TableMetier } from '../../../shared'

function MetierDetailScreen() {
    const { code } = useParams();

    const theme = useTheme()
    const [data, setData] = useState(null);
    const [GroupesSavoirs, setGroupesSavoirs] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      authenticateClient()
        .then((data) => {
          getFicheMetierDataCode(data.access_token, code)
            .then((data) => {
                var groupedData = []
                for (let index = 0; index < data.groupesCompetencesMobilisees.length; index++) {
                    const competences = data.groupesCompetencesMobilisees[index].competences;
                    for (let kaelo = 0; kaelo < competences.length; kaelo++) {
                        const element = competences[kaelo];
                        groupedData.push(
                            {
                                enjeu: data.groupesCompetencesMobilisees[index].enjeu.libelle,
                                nom_competences: element.libelle,
                                type_competences: element.type,
                            }
                        )
                    }
                }
                var GroupesSavoirsdata = []
                for (let index = 0; index < data.groupesSavoirs.length; index++) {
                    const savoirs = data.groupesSavoirs[index].savoirs;
                    for (let kaelo = 0; kaelo < savoirs.length; kaelo++) {
                        const element = savoirs[kaelo];
                        GroupesSavoirsdata.push(
                            {
                                categorieSavoirs: data.groupesSavoirs[index].categorieSavoirs.libelle,
                                nom_savoirs: element.libelle,
                                type_savoirs: element.type,
                            }
                        )
                    }
                }
                setGroupesSavoirs(GroupesSavoirsdata)
              setData(groupedData);
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
    }, [code]);
  
    const columns = useMemo(
        () =>[
        { 
            accessorKey: 'enjeu', header: 'Enjeu' 
        },
        {
            accessorKey: 'nom_competences',
            header: 'Nom Compétences'
        },
        {
            accessorKey: 'type_competences',
            header: 'type Compétences'
        },
        ],[],
    );

    const columnsGroupesSavoirs = useMemo(
        () =>[
        { 
            accessorKey: 'categorieSavoirs', header: 'Categorie Savoirs' 
        },
        {
            accessorKey: 'nom_savoirs',
            header: 'Libellé savoir'
        },
        {
            accessorKey: 'type_savoirs',
            header: 'type savoir'
        },
        ],[],
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
            title={'Détail métier '+code}
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
            <Grid container spacing={2}  pl={5} pr={5}>
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
                    <h4>Tableau Competences Mobilisées</h4>
                    {TableMetier(columns,data)}
                    <h4>Tableau Savoirs</h4>
                    {TableMetier(columnsGroupesSavoirs,GroupesSavoirs)}
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default MetierDetailScreen