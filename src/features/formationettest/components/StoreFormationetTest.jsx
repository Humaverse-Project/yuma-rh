import { Fragment, useEffect, useState } from 'react'
import { Column, DynamicHeadNav, Row, LoadingMetier, Text } from '../../../shared'
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    InputAdornment,
    CardActions,
  } from '@mui/material';
import { listformation } from '../../../services/FormationService';
import { theme } from '../../../theme'
import { NavLink } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'


function StoreFormationetTest() {
    const [loading, setLoading] = useState(true);
    const [textToSearh, setTextToSearh] = useState("")
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [formations, setformations] = useState([]);
    const [formationsinitial, setformationsinitial] = useState([]);
    
    const openDetailsDialog = (formation) => {
        setSelectedFormation(formation);
    };

    const closeDetailsDialog = () => {
        setSelectedFormation(null);
    };
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await listformation();
                const reponsemetie = await datametierexistant;
                setformations(reponsemetie);
                setformationsinitial(reponsemetie)
              setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setLoading, setError]);

    const HandleSearch = (e)=>{
        console.log(e.target.value)
        let formation = formationsinitial.filter(formation=>{
            if(formation.genre.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || formation.nom.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
            || formation.type.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1  || formation.categorie.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
            ){
                return true
            }
            return false
        })
        setformations(formation);
        setTextToSearh(e.target.value)
    }
    if (loading || error) {
        return (
          <Fragment>

              <Row justifyContent={'space-between'} px={3} height={'10vh'}>
                <DynamicHeadNav title={'Store des Tests et Formations'} />
               </Row>
              { LoadingMetier (loading, error)}
          </Fragment>
        );
    }
    return (
        <Fragment>
            <Row justifyContent={'space-between'} px={3} height={'10vh'}>
                <DynamicHeadNav title={'Store des Tests et Formations'} />
            </Row>
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                flexDirection="column"
                minHeight={'88vh'}
            >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            [theme.breakpoints.down('lg')]: {
                                flexDirection: 'column',
                            },
                            marginTop: '1rem',
                        }}
                    >
                        <Column>
                            {/**Return button */}
                            <Button
                                variant="contained"
                                color="background"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: 2,
                                    [theme.breakpoints.down('lg')]: {
                                        my: 2,
                                    },
                                }}
                            >
                                <NavLink
                                    to="/store"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                    }}
                                >
                                    <Text fontSize={18}>RETOUR</Text>
                                </NavLink>
                            </Button>
                        </Column>
                        <Column>
                            <TextField
                                id="outlined-basic"
                                value={textToSearh}
                                onChange={(e) => HandleSearch(e)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                sx={{
                                    width: '30rem',
                                }}
                            />
                        </Column>
                    </Box>
                    <Row>
                    {formations.map((formation, index) => (
                        <Column margin={4} key="{formation.id}">
                            <Card sx={{ maxWidth: 345, borderRadius: 3 }}>
                                <CardHeader title={formation.nom} subheader={formation.categorie} />
                                <CardContent>
                                    <Typography variant="body1" color={"black.main"}>Genre: {formation.genre}</Typography>
                                    <Typography variant="body1" color={"black.main"}>Tarif: {formation.tarif}</Typography>
                                    <Typography variant="body1" color={"black.main"}>Type: {formation.type}</Typography>
                                    <Typography variant="body1" color={"black.main"}>Durée: {formation.durrer} Heure</Typography>
                                    
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        onClick={() => openDetailsDialog(formation)}
                                        >
                                        Voir les détails
                                    </Button>
                                </CardActions>
                            </Card>
                        </Column>
                    ))}
                    </Row>
                    <Dialog open={selectedFormation !== null} onClose={closeDetailsDialog}>
                        <DialogTitle>{selectedFormation?.nom}</DialogTitle>
                        <DialogContent>
                        <Typography variant="body1" color={"black.main"}>Genre: {selectedFormation?.genre}</Typography>
                        <Typography variant="body1" color={"black.main"}>Tarif: {selectedFormation?.tarif}</Typography>
                        <Typography variant="body1" color={"black.main"}>Type: {selectedFormation?.type}</Typography>
                        <Typography variant="body1" color={"black.main"}>Catégorie: {selectedFormation?.categorie}</Typography>
                        <Typography variant="body1" color={"black.main"}>Date de création: {selectedFormation?.dateCreation}</Typography>
                        <Typography variant="body1" color={"black.main"}>Durée: {selectedFormation?.durrer} Heure</Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={closeDetailsDialog} color="primary">
                            Fermer
                        </Button>
                        </DialogActions>
                    </Dialog>
            </Box>
        </Fragment>
    )
}

export default StoreFormationetTest
