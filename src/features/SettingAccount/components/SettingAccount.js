import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { NavLink } from 'react-router-dom'

export default function SettingAccount() {
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
                    maxWidth="xs"
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
                        }}
                    >
                        Paramètre de votre compte
                    </Typography>
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
                        <OutlinedInput name="url" type="text" label="Nom" />
                    </FormControl>
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
                            name="password"
                            type="url"
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
                            Mail
                        </InputLabel>
                        <OutlinedInput name="mail" type="text" label="Mail" />
                    </FormControl>
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="contained"
                            sx={{
                                m: 2,
                                width: '20ch',
                                height: '50px',
                                backgroundColor: '#3D50FF',
                                color: '#fff',
                            }}
                            onClick={() => null}
                        >
                            Modifier
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <NavLink to="/home">
                            <Button
                                variant="contained"
                                sx={{
                                    m: 2,
                                    width: '20ch',
                                    height: '50px',
                                    backgroundColor: '#CACACA',
                                    color: '#000',
                                }}
                            >
                                Annuler
                            </Button>
                        </NavLink>
                    </Grid>
                </Container>
            </form>
        </Card>
    )
}
