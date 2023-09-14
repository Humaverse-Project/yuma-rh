import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { getInfoSirret, getNaflist } from '../../../services/SiretService';
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom'

export default function ScreenOne({ setScreen, setFormData, formData }) {
    const select = [
        'France',
        'Allemagne',
        'Espagne',
        'Italie',
        'Portugal',
        'Belgique',
        'Suisse',
        'Luxembourg',
        'Royaume-Uni',
        'Autre',
    ]
    const [naflist, setNaflist] = useState([]);
    useEffect(() => {
        getNaflist("0").then((data) => {
            setNaflist(data.results.map((data) => {return data.code_naf}))
        }).catch((error) => {
            console.error('API error:', error.message);
            setShowError(true);
        });
    }, []);
    const [showError, setShowError] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setShowError(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setScreen(2);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if(name === "siret" && value.length === 14){
            console.log("envois")
            getInfoSirret(value)
            .then((data) => {
                setFormData({
                    siret: value,
                    nom_entreprise: data.etablissement.unite_legale.denomination,
                    code_postal: data.etablissement.code_postal,
                    rue_numero: data.etablissement.numero_voie+" "+data.etablissement.libelle_voie,
                    ville: data.etablissement.libelle_commune
                });
                
            })
            .catch((error) => {
                console.error('API error:', error.message);
                setShowError(true);
            });
        }
        if(name === "naf"){
            getNaflist(value).then((data) => {
                setNaflist(data.results.map((data) => {return data.code_naf}))
            }).catch((error) => {
                console.error('API error:', error.message);
                setShowError(true);
            });
        }
    };
    
    return (
        <Card
            sx={{
                m: -1,
                minHeight: '100vh'
            }}
        >
            <form>
                <Container
                    component="main"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            mt: 8,
                            mb: 2
                        }}
                    >
                        Formulaire Inscription YUMA utilisateur RH
                    </Typography>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Siret
                            </InputLabel>
                            <OutlinedInput
                                value={formData.siret}
                                name="siret"
                                type="number"
                                label="Nom"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Autocomplete
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            disablePortal
                            value={formData.naf}
                            options={naflist}
                            onChange={(e, value)=>{setFormData({ ...formData, naf: value });}}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    label="APE/NAF" 
                                    name="naf"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Nom de l'entreprise
                            </InputLabel>
                            <OutlinedInput
                                name="nom_entreprise"
                                type="text"
                                value={formData.nom_entreprise}
                                onChange={handleChange}
                                label=" Nom de l'entreprise"
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                URL
                            </InputLabel>
                            <OutlinedInput
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                type="url"
                                label="URL"
                            />
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Rue et Numero
                            </InputLabel>
                            <OutlinedInput
                                name="rue_numero"
                                value={formData.rue_numero}
                                onChange={handleChange}
                                type="text"
                                label="Rue et Numero"
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Code Postal
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="text"
                                value={formData.code_postal}
                                onChange={handleChange}
                                label="Code Postal"
                            />
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Ville
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="text"
                                value={formData.ville}
                                onChange={handleChange}
                                label="Nom"
                            />
                        </FormControl>
                        <Autocomplete
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            disablePortal
                            value={formData.pays}
                            onChange={(e, value)=>{setFormData({ ...formData, pays: value });}}
                            options={select || []}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="outlined"
                                    label="Pays"
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Télephone
                            </InputLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                value={formData.telephone}
                                name="telephone"
                                type="text"
                                label="Télephone"
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Email
                            </InputLabel>
                            <OutlinedInput
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                type="email"
                                label="Email"
                            />
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={6} sm={3}>
                        <Link to={'/'}>
                            <Button
                                variant="outlined"
                                sx={{
                                    m: 2,
                                    width: '20ch',
                                    height: '50px',
                                }}
                                color='secondary'
                            >
                                Retour
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            sx={{
                                m: 2,
                                width: '20ch',
                                height: '50px',
                                backgroundColor: '#3D50FF',
                                color: '#fff',
                            }}
                            onClick={handleSubmit}
                        >
                            Suivant
                        </Button>
                    </Grid>
                </Container>
            </form>
            <div>
                <Snackbar 
                    open={showError}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical:'top', horizontal:'right' }}
                >
                    <Alert onClose={handleCloseAlert} severity="error">
                        Une erreur s'est produite lors de la connexion à l'API.
                    </Alert>
                </Snackbar>
            </div>
        </Card>
    )
}
