import {
    Box,
    Grid,
    Button,
    InputLabel,
    Typography,
    IconButton,
    FormControl,
    OutlinedInput,
    InputAdornment,
    CircularProgress,
} from '@mui/material'
import * as Yup from 'yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import { NavLink, useNavigate } from 'react-router-dom'
import { setCookie } from '../../../services/CoockieService'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { postcredential } from '../../../services/CompteService'
import ModalForgotPassword from '../../Login/components/ForgotPassword'
// logo
import logo from '../../../assets/images/logo.png'
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function LoginScreen() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    // forgot password state
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const onChange = (value) => {
        console.log('Captcha value:', value)
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .email('Email invalide')
            .required('Email est obligatoire'),
        password: Yup.string().required('Mot de passe est obligatoire'),
    })

    const onSubmit = (data) => {
        setLoading(true)
        postcredential(data).then((data) => {
            if (data.error) {
                console.log('error', data.error)
                MySwal.fire({
                    title: 'Erreur!',
                    text: 'Email ou mot de passe incorrect',
                    icon: 'error',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#f44336',
                    color: 'white',
                })
            } else {
                localStorage.setItem('user_data', JSON.stringify(data.data))
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
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid>
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
                                    type="email"
                                    label="Email"
                                    error={errors.username ? true : false}
                                    {...register('username')}
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
                                    error={errors.password ? true : false}
                                    {...register('password')}
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
                            <Button
                                loading={loading}
                                sx={{ height: '50px', mt: 2 }}
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: 'white',
                                        }}
                                    />
                                ) : (
                                    'Connexion'
                                )}
                            </Button>
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
                                    <Typography
                                        color="primary.main"
                                        onClick={handleOpen}
                                        sx={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Mot de passe oublié?
                                    </Typography>
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
                    </Box>
                </Grid>
            </form>
            {open && (
                <ModalForgotPassword
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                />
            )}
        </>
    )
}
