import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { setCookie } from '../../../services/CoockieService'
import LoadingButton from '@mui/lab/LoadingButton'
import { postcredential } from '../../../services/CompteService'

import {
    Box,
    Grid,
    Container,
    InputLabel,
    Typography,
    IconButton,
    FormControl,
    OutlinedInput,
    InputAdornment,
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ReCAPTCHA from 'react-google-recaptcha'

// logo
import logo from '../../../assets/images/logo.png'

export default function LoginScreen() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    })
    const [errorform, setErrorForm] = React.useState({
        username: false,
        password: false,
    })

    const onChange = (value) => {
        console.log('Captcha value:', value)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmitform = () => {
        if (formData.username === '') {
            setErrorForm({ ...errorform, username: true })
            return false
        }
        if (formData.password === '') {
            setErrorForm({ ...errorform, password: true })
            return false
        }
        setLoading(true)
        postcredential(formData)
            .then((data) => {
                if (data.error) {
                    setErrorForm({ password: true, username: true })
                } else {
                    console.log(data.data)
                    let userdata = data.data[0]
                    setCookie('email', userdata.compteEmail)
                    setCookie('id', userdata.id)
                    setCookie('nom', userdata.compteNom)
                    setCookie('prenom', userdata.comptePrenom)
                    setCookie('role', userdata.compteRole)
                    setCookie('entrepriseid', userdata.compteEntrepriseId.id)
                    navigate('/home')
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error('bakend error:', error.message)
            })
    }

    return (
        <>
            <form>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            width="150px"
                            height="150px"
                        />

                        <Typography component="h1" variant="h5">
                            Authentification
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                spacing: 2,
                            }}
                        >
                            <FormControl
                                variant="outlined"
                                sx={{
                                    m: 2,
                                    width: '150%',
                                }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        color: 'black.main',
                                    }}
                                    name="username"
                                    error={errorform.username}
                                    value={formData.username}
                                    onChange={handleChange}
                                    onClick={() =>
                                        setErrorForm({
                                            ...errorform,
                                            username: false,
                                        })
                                    }
                                    type="email"
                                    label="Email"
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    width: '150%',
                                }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Mot de passe
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        color: 'black.main',
                                    }}
                                    name="password"
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    error={errorform.password}
                                    onChange={handleChange}
                                    onClick={() =>
                                        setErrorForm({
                                            ...errorform,
                                            password: false,
                                        })
                                    }
                                    required
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mot de passe"
                                />
                            </FormControl>
                            <LoadingButton
                                loading={loading}
                                sx={{ height: '50px', mt: 2 }}
                                variant="contained"
                                fullWidth
                                onClick={handleSubmitform}
                            >
                                Se connecter
                            </LoadingButton>
                            <Grid
                                container
                                sx={{
                                    width: '150%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 2,
                                }}
                            >
                                <Grid item xs>
                                    <NavLink
                                        to="/passwordReminder"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography color="primary.main">
                                            Mot de passe oublié?
                                        </Typography>
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to="/register"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography color="primary.main">
                                            Pas du compte? S'inscrire
                                        </Typography>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            {/*<ReCAPTCHA
                                sitekey="6LdBhYYoAAAAAK0kVuppwgM0o6fUXfW3y9z3MRpD"
                                onChange={onChange}
                            />*/}
                        </Box>
                    </Box>
                </Container>
            </form>
        </>
    )
}
