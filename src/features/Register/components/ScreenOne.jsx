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
import { Snackbar, Alert, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import { Link } from 'react-router-dom'

export default function ScreenOne({ setScreen, setFormData, formData, ErrorForm, setErrorForm }) {
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
        console.log(ErrorForm)
        let errr = 0;
        let key = Object.keys(ErrorForm)
        let dataerror = {}
        for (let index = 0; index < 11; index++) {
            const element = key[index];
            if (formData[element] === "" || formData[element] === 0 || formData[element] === undefined){
                dataerror = { ...dataerror, [element]: [true, "Ce champs est obligatoire"]}
                errr ++;
            }
            if(element === "siret" && formData[element].length < 14) {
                dataerror = { ...dataerror, [element]: [true, "Ce champs est obligatoire"]}
                errr ++;
            }
        }
        setErrorForm({ ...ErrorForm, ...dataerror})
        if(errr > 0){
            return false
        }
        setScreen(2);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrorForm({ ...ErrorForm, [name]: [false, ""] })
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
                        Formulaire Inscription YUMA Entreprise
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
                            required
                            error={ErrorForm.siret[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Siret
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                value={formData.siret}
                                name="siret"
                                type="number"
                                label="Siret"
                                inputProps={{
                                    min: 0,
                                }}
                                onChange={handleChange}
                            />
                            {   ErrorForm.siret[0] ? (
                                    <FormHelperText>{ErrorForm.siret[1]}</FormHelperText>
                                ) : (
                                null
                            )}
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            required
                            error={ErrorForm.naf[0]}
                        >
                            <Autocomplete
                                sx={{
                                    width: '40ch'
                                }}
                                disablePortal
                                value={formData.naf}
                                options={naflist || []}
                                onChange={(e, value)=>{setFormData({ ...formData, naf: value });}}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        error={ErrorForm.naf[0]}
                                        label="APE/NAF" 
                                        name="naf"
                                        variant="outlined"
                                    />
                                )}
                            />
                            {   ErrorForm.naf[0] ? (
                                    <FormHelperText>{ErrorForm.naf[1]}</FormHelperText>
                                ) : (
                                null
                            )}
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
                            required
                            error={ErrorForm.nom_entreprise[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Nom de l'entreprise
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                name="nom_entreprise"
                                type="text"
                                value={formData.nom_entreprise}
                                readOnly
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
                                sx = {{
                                        color: 'black.main'
                                    }}
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
                            error={ErrorForm.rue_numero[0]}
                            required
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Rue et Numero
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                readOnly
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
                            error={ErrorForm.code_postal[0]}
                            required
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Code Postal
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                readOnly
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
                            error={ErrorForm.code_postal[0]}
                            required
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Ville
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                name="ville"
                                type="text"
                                value={formData.ville}
                                onChange={handleChange}
                                label="Ville"
                            />
                            {   ErrorForm.ville[0] ? (
                                    <FormHelperText>{ErrorForm.ville[1]}</FormHelperText>
                                ) : (
                                null
                            )}
                        </FormControl>
                        <Autocomplete
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            disablePortal
                            value={formData.pays}
                            onChange={(e, value)=>{setFormData({ ...formData, pays: value });setErrorForm({ ...ErrorForm, pays: [false, ""] });}}
                            options={select || []}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={ErrorForm.pays[0]}
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
                            required
                            error={ErrorForm.telephone[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Télephone
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                onChange={handleChange}
                                value={formData.telephone}
                                name="telephone"
                                type="text"
                                label="Télephone"
                            />
                            {   ErrorForm.telephone[0] ? (
                                    <FormHelperText>{ErrorForm.telephone[1]}</FormHelperText>
                                ) : (
                                null
                            )}
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.email[0]}
                            required
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Email
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                type="email"
                                label="Email"
                            />
                            {   ErrorForm.email[0] ? (
                                    <FormHelperText>{ErrorForm.email[1]}</FormHelperText>
                                ) : (
                                null
                            )}
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
                            required
                            error={ErrorForm.effectif[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Effectif de l'entreprise
                            </InputLabel>
                            <OutlinedInput
                                sx = {{
                                        color: 'black.main'
                                    }}
                                name="effectif"
                                value={formData.effectif}
                                onChange={handleChange}
                                type="number"
                                label="Effectif de l'entreprise"
                                inputProps={{
                                    min: 0,
                                    step: 1,
                                }}
                            />
                            {   ErrorForm.effectif[0] ? (
                                    <FormHelperText>{ErrorForm.effectif[1]}</FormHelperText>
                                ) : (
                                null
                            )}
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.etablissement[0]}
                        >
                            <Grid
                                container spacing={2}
                            >
                                <Grid item xs={6}>
                                    <FormLabel
                                        id="demo-controlled-radio-buttons-group"
                                        sx={{
                                            m: 2,
                                            width: '5ch',
                                        }}
                                    >
                                        Etablissement
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="1"
                                            control={
                                                <Radio
                                                    checked = {(formData.etablissement === "1")}
                                                    onChange = {(e)=>{ if(e.target.checked){setFormData({ ...formData, etablissement: '1' })} }}
                                                />
                                            }
                                            label="principal"
                                        />
                                        <FormControlLabel
                                            value="2"
                                            control={
                                                <Radio
                                                    checked = {(formData.etablissement === "2")}
                                                    onChange = {(e)=>{ if(e.target.checked){setFormData({ ...formData, etablissement: '2' })} }}
                                                />
                                            }
                                            label="secondaire"
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
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
