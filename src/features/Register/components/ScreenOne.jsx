import {
    Snackbar,
    Alert,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    TextField,
    Box,
} from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import OutlinedInput from '@mui/material/OutlinedInput'
import { getInfoSirret, getNaflist } from '../../../services/SiretService'

export default function ScreenOne({
    setScreen,
    setFormData,
    formData,
    ErrorForm,
    setErrorForm,
}) {
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
    const [naflist, setNaflist] = useState([])
    const [keyDownState, setKeyDownState] = useState('')
    const [nafLoading, setNafLoading] = useState(false)

    // siret validation
    const [isValidNumberSiret, setIsValidNumberSiret] = useState(false)
    const [invalidMail, setInvalidMail] = useState(false)

    useEffect(() => {
        setNafLoading(true)
        getNaflist(keyDownState)
            .then((data) => {
                setNafLoading(false)
                setNaflist(
                    data.results.map((data) => {
                        return {
                            value: data.code_naf,
                            label: data.code_naf + ' - ' + data.intitule_naf,
                        }
                    })
                )
            })
            .catch((error) => {
                setNafLoading(false)
                console.error('API error:', error.message)
                setShowError(true)
            })
            .finally(() => {
                setNafLoading(false)
            })
    }, [keyDownState])
    const [showError, setShowError] = useState(false)

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setShowError(false)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        let errr = 0
        let key = Object.keys(ErrorForm)
        let dataerror = {}
        for (let index = 0; index < 11; index++) {
            const element = key[index]
            if (
                formData[element] === '' ||
                formData[element] === 0 ||
                formData[element] === undefined
            ) {
                dataerror = {
                    ...dataerror,
                    [element]: [true, 'Ce champs est obligatoire'],
                }
                errr++
            }
            if (element === 'siret' && formData[element].length < 14) {
                dataerror = {
                    ...dataerror,
                    [element]: [true, 'Ce champs est obligatoire'],
                }
                errr++
            }
        }
        setErrorForm({ ...ErrorForm, ...dataerror })
        if (errr > 0) {
            return false
        }
        setScreen(2)
    }
    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === 'siret') {
            if (value.length >= 14) {
                setIsValidNumberSiret(false)
            } else {
                setIsValidNumberSiret(true)
            }
        }

        if (name === 'email') {
            if (value.includes('@') === false) {
                setInvalidMail(true)
            } else {
                setInvalidMail(false)
            }
        }

        setFormData({ ...formData, [name]: value })
        setErrorForm({ ...ErrorForm, [name]: [false, ''] })
        if (name === 'siret' && value.length === 14) {
            getInfoSirret(value)
                .then((data) => {
                    setFormData({
                        siret: value,
                        nom_entreprise:
                            data.etablissement.uniteLegale
                                .denominationUniteLegale,
                        code_postal:
                            data.etablissement.adresseEtablissement
                                .codePostalEtablissement,
                        rue_numero:
                            data.etablissement.adresseEtablissement
                                .numeroVoieEtablissement +
                            ' ' +
                            data.etablissement.adresseEtablissement
                                .libelleVoieEtablissement,
                        ville: data.etablissement.adresseEtablissement
                            .libelleCommuneEtablissement,
                        pays: 'France',
                    })
                })
                .catch((error) => {
                    console.log('Error: ' + error)
                    console.error('API error:', error.message)
                    setShowError(true)
                })
        }
        if (name === 'naf') {
            getNaflist(value)
                .then((data) => {
                    setNaflist(
                        data.results.map((data) => {
                            return data.code_naf
                        })
                    )
                })
                .catch((error) => {
                    console.error('API error:', error.message)
                    setShowError(true)
                })
        }
    }

    return (
        <Card
            sx={{
                m: -1,
                height: '100vh',
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
                            mb: 2,
                        }}
                    >
                        Formulaire Inscription YUMA Entreprise
                    </Typography>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
                                        }}
                                        value={formData.siret}
                                        name="siret"
                                        type="number"
                                        label="Siret"
                                        inputProps={{
                                            min: 0,
                                        }}
                                        onChange={handleChange}
                                        onBlur={(e) =>
                                            setIsValidNumberSiret(false)
                                        }
                                    />
                                    {ErrorForm.siret[0] ? (
                                        <FormHelperText>
                                            {ErrorForm.siret[1]}
                                        </FormHelperText>
                                    ) : null}
                                    {isValidNumberSiret && (
                                        <FormHelperText
                                            name="siret"
                                            sx={{
                                                color: 'red',
                                                textAlign: 'left',
                                            }}
                                        >
                                            La numéro de SIRET doit contenir au
                                            moins 14 caractères
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    sx={{
                                        m: 2,
                                        width: '40ch',
                                    }}
                                    disablePortal
                                    value={formData.naf}
                                    // onBlur ref izy mquitter le champ de averina "" n valeur mb ahazona n state initial
                                    onBlur={(e) => setKeyDownState('')}
                                    // isak n mtap clavier iz ref ao anat champ de alefa n recherche
                                    onKeyDown={(e) =>
                                        setKeyDownState(e.target.value)
                                    }
                                    loading={nafLoading}
                                    onChange={(e, value) => {
                                        setFormData({
                                            ...formData,
                                            naf: value.value,
                                        })
                                        setErrorForm({
                                            ...ErrorForm,
                                            naf: [false, ''],
                                        })
                                    }}
                                    options={naflist || []}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={ErrorForm.naf[0]}
                                            required
                                            variant="outlined"
                                            label="APE/NAF"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
                                        }}
                                        name="nom_entreprise"
                                        type="text"
                                        value={formData.nom_entreprise}
                                        readOnly
                                        onChange={handleChange}
                                        label=" Nom de l'entreprise"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
                                        }}
                                        name="url"
                                        value={formData.url}
                                        onChange={handleChange}
                                        type="url"
                                        label="URL"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
                                        }}
                                        readOnly
                                        name="rue_numero"
                                        value={formData.rue_numero}
                                        onChange={handleChange}
                                        type="text"
                                        label="Rue et Numero"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
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
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
                                        }}
                                        name="ville"
                                        type="text"
                                        value={formData.ville}
                                        onChange={handleChange}
                                        label="Ville"
                                    />
                                    {ErrorForm.ville[0] ? (
                                        <FormHelperText>
                                            {ErrorForm.ville[1]}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    sx={{
                                        m: 2,
                                        width: '40ch',
                                    }}
                                    disablePortal
                                    value={formData.pays}
                                    onChange={(e, value) => {
                                        setFormData({
                                            ...formData,
                                            pays: value,
                                        })
                                        setErrorForm({
                                            ...ErrorForm,
                                            pays: [false, ''],
                                        })
                                    }}
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
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
                                        }}
                                        onChange={handleChange}
                                        value={formData.telephone}
                                        name="telephone"
                                        type="text"
                                        label="Télephone"
                                    />
                                    {ErrorForm.telephone[0] ? (
                                        <FormHelperText>
                                            {ErrorForm.telephone[1]}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
                                        }}
                                        type="email"
                                        name="email"
                                        label="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {ErrorForm.email[0] ? (
                                        <FormHelperText>
                                            {ErrorForm.email[1]}
                                        </FormHelperText>
                                    ) : null}
                                    {invalidMail && (
                                        <FormHelperText
                                            sx={{
                                                color: 'red',
                                                textAlign: 'left',
                                            }}
                                        >
                                            Email invalid
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                        sx={{
                                            color: 'black.main',
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
                                    {ErrorForm.effectif[0] ? (
                                        <FormHelperText>
                                            {ErrorForm.effectif[1]}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        m: 2,
                                        width: '40ch',
                                    }}
                                    error={ErrorForm.etablissement[0]}
                                >
                                    <Grid container spacing={2}>
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
                                                            checked={
                                                                formData.etablissement ===
                                                                '1'
                                                            }
                                                            onChange={(e) => {
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            etablissement:
                                                                                '1',
                                                                        }
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="principal"
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    control={
                                                        <Radio
                                                            checked={
                                                                formData.etablissement ===
                                                                '2'
                                                            }
                                                            onChange={(e) => {
                                                                if (
                                                                    e.target
                                                                        .checked
                                                                ) {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            etablissement:
                                                                                '2',
                                                                        }
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="secondaire"
                                                />
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item sx={6}>
                                <Link to={'/'}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            m: 2,
                                            width: '35ch',
                                            height: '50px',
                                        }}
                                        color="secondary"
                                    >
                                        Retour
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item sx={6}>
                                <Button
                                    variant="contained"
                                    disabled={
                                        !formData.siret ||
                                        !formData.naf ||
                                        !formData.nom_entreprise ||
                                        !formData.rue_numero ||
                                        !formData.code_postal ||
                                        !formData.ville ||
                                        !formData.pays ||
                                        !formData.telephone ||
                                        !formData.email ||
                                        !formData.effectif ||
                                        !formData.etablissement ||
                                        isValidNumberSiret ||
                                        invalidMail
                                    }
                                    sx={{
                                        m: 2,
                                        width: '35ch',
                                        height: '50px',
                                        backgroundColor: '#3D50FF',
                                        color: '#fff',
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Suivant
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </form>
            <div>
                <Snackbar
                    open={showError}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseAlert} severity="error">
                        SIRET inexistant ou inconnu
                    </Alert>
                </Snackbar>
            </div>
        </Card>
    )
}
