import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useMemo } from 'react';
import { searchpostbycompetancecode } from  '../../../services/PosteService';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { LoadingMetier, TableMetier } from '../../../shared'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

function SearchCompetanceScreen() {
    const theme = useTheme()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ codesaisi, setCodeSaisi ] = useState("")
    const afficherDonnees = async () => {
      setLoading(true);
      try {
        const datametierexistant = await searchpostbycompetancecode(codesaisi);
        const reponsemetie = await datametierexistant;
        console.log(reponsemetie)
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
        setLoading(false);
      } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        setError("Une erreur s'est produite lors de l'appele serveur");
        setLoading(false);
      }
      
    };
    const columns = useMemo(
        () => [
          {
            accessorKey: 'meiterid',
            header: 'ID Métier',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
            size: 80,
            Cell: ({ cell, column }) => 
              (<Link to={`/metierdetail/${cell.getValue()}`}>{cell.getValue()}</Link>),
          },
          {
            accessorKey: 'codeRome',
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
            accessorKey: 'niveau',
            header: 'Niveau requit',
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
                  title={'Recherche de metier par competance'}
              />
              {LoadingMetier(loading, error)}
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Recherche de metier par competance'}
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
              <Grid item xs={12} md={2}>
                <Card
                  sx={{
                    display: 'flex',
                    width: '100%',
                    mt: 2
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
                      <FormControl
                        variant="outlined"
                        sx={{
                          width: '100%',
                          my:2
                        }}
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Code competance
                        </InputLabel>
                        <OutlinedInput
                          name="code"
                          type="text"
                          label="Code competance"
                          onChange={(event)=> setCodeSaisi(event.target.value)}
                        />
                      </FormControl>
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

export default SearchCompetanceScreen