import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postentreprise } from '../../../services/CompteService'
import {
    Alert,
    Snackbar,
    Grid,
    Card,
    Button,
    Container,
    Typography,
    InputLabel,
    FormControl,
    OutlinedInput,
    FormGroup,
    FormControlLabel,
    Switch,
    FormHelperText,
    Box,
    Chip,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export default function ScreenTwo({
    formData,
    setScreen,
    setFormData,
    ErrorForm,
    setErrorForm,
}) {
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [matchPassword, setMatchPassword] = useState(false)

    const navigate = useNavigate()
    const handlesubmit = () => {
        if (formData.password !== formData.password2) {
            setShowError(true)
            return false
        }
        let key = Object.keys(ErrorForm)
        let errr = 0
        let dataerror = {}
        for (let index = 11; index < key.length; index++) {
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
        }
        setErrorForm({ ...ErrorForm, ...dataerror })
        if (errr > 0) {
            return false
        }
        setLoading(true)
        postentreprise(formData)
            .then((data) => {
                console.log(data)
                // navigate('/')
            })
            .catch((error) => {
                console.error('bakend error:', error.message)
            })
    }
    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === 'password') {
            console.log('password', value)
            // test strong, medium, weak password with Regex
            let strongRegex = new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
            )
            let mediumRegex = new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})'
            )
            let weakRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.{4,})')
            if (strongRegex.test(value)) {
                console.log('strong')
                setPasswordStrength('fort')
            } else if (mediumRegex.test(value)) {
                console.log('medium')
                setPasswordStrength('moyen')
            } else if (weakRegex.test(value)) {
                console.log('weak')
                setPasswordStrength('faible')
            } else {
                if (value.length === 0) {
                    setPasswordStrength('')
                } else {
                    setPasswordStrength('très faible')
                }
            }

            // test password match
            if (formData.password2 === value) {
                setMatchPassword(true)
            } else {
                setMatchPassword(false)
            }
        }

        // test password match
        if (name === 'password2') {
            if (value === formData.password) {
                setMatchPassword(true)
            } else {
                setMatchPassword(false)
            }
        }

        setFormData({ ...formData, [name]: value })
        setErrorForm({ ...ErrorForm, [name]: false })
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setShowError(false)
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
                    minWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mt: 8,
                            mb: 2,
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
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.nomrh[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Votre nom
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.nomrh}
                                onChange={handleChange}
                                name="nomrh"
                                type="url"
                                label="Votre nom"
                            />
                        </FormControl>
                        <FormControl
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.prenomrh[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Votre prénom
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.prenomrh}
                                onChange={handleChange}
                                name="prenomrh"
                                type="url"
                                label="Votre prénom"
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
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.fonctionrh[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Fonction
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.fonctionrh}
                                onChange={handleChange}
                                name="fonctionrh"
                                type="text"
                                label="Fonction"
                            />
                        </FormControl>
                        <FormControl
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.servicerh[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Service
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.servicerh}
                                onChange={handleChange}
                                name="servicerh"
                                type="text"
                                label="Service"
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
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.telephonerh[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Votre numero de téléphone
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.telephonerh}
                                onChange={handleChange}
                                name="telephonerh"
                                type="text"
                                label="Votre numero de téléphone"
                            />
                        </FormControl>
                        <FormControl
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.emailrh[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Votre adresse email
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.emailrh}
                                onChange={handleChange}
                                name="emailrh"
                                type="text"
                                label="Votre adresse email"
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
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.password[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Mot de passe
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                label="Mot de passe"
                            />

                            {passwordStrength != '' ? (
                                <Chip
                                    label={`Mot de passe ${passwordStrength}`}
                                    sx={{
                                        mt: 1,
                                        color: 'white',
                                        fontWeight: 'bold',
                                        backgroundColor:
                                            passwordStrength === 'faible' ||
                                            passwordStrength === 'très faible'
                                                ? '#FF0000'
                                                : passwordStrength === 'moyen'
                                                ? '#FFA500'
                                                : '#00FF00',
                                        '&:hover': {
                                            backgroundColor:
                                                passwordStrength === 'faible' ||
                                                passwordStrength ===
                                                    'très faible'
                                                    ? '#FF0000'
                                                    : passwordStrength ===
                                                      'moyen'
                                                    ? '#FFA500'
                                                    : '#00FF00',
                                            color: 'white',
                                        },
                                    }}
                                />
                            ) : (
                                <FormHelperText
                                    id="outlined-adornment-password"
                                    sx={{
                                        color: 'red',
                                    }}
                                >
                                    8 caractères minimum, 1 majuscule, 1
                                    minuscule, 1 chiffre
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            required
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            error={ErrorForm.password2[0]}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Confirmation mot de passe
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'black.main',
                                }}
                                value={formData.password2}
                                onChange={handleChange}
                                name="password2"
                                type={showPassword ? 'text' : 'password'}
                                label="Confirmation mot de passe"
                            />
                            {formData.password2 !== '' && (
                                <Chip
                                    label={
                                        matchPassword
                                            ? 'Les mots de passe correspondent'
                                            : 'Les mots de passe ne correspondent pas'
                                    }
                                    sx={{
                                        mt: 1,
                                        color: 'white',
                                        fontWeight: 'bold',
                                        backgroundColor: matchPassword
                                            ? '#00FF00'
                                            : '#FF0000',
                                        '&:hover': {
                                            backgroundColor: matchPassword
                                                ? '#00FF00'
                                                : '#FF0000',
                                        },
                                    }}
                                />
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
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={(e) =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                }
                                label="Voir les mot de passe "
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '20ch',
                                height: '50px',
                            }}
                            onClick={() => setScreen(1)}
                            color="secondary"
                        >
                            Retour
                        </Button>
                        <LoadingButton
                            loading={loading}
                            sx={{
                                m: 2,
                                width: '20ch',
                                height: '50px',
                                backgroundColor: '#3D50FF',
                                color: '#fff',
                            }}
                            variant="contained"
                            fullWidth
                            onClick={handlesubmit}
                        >
                            Enregistrer
                        </LoadingButton>
                    </Grid>
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
                        Les mots de passe ne correspond pas
                    </Alert>
                </Snackbar>
            </div>
        </Card>
    )
}
