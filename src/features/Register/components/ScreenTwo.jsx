import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import Container from '@mui/material/Container'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// logo
import qrcodeImage from '../../../assets/images/qrcode.png'

export default function ScreenTwo() {
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
                        variant="h6"
                        sx={{
                            mt: 0,
                        }}
                    >
                        Formulaire Inscription YUMA utilisateur RH page 2
                    </Typography>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: 'flex',
                            marginRight: '5px',
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '30ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Effectif de l'entreprise
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="number"
                                label="Effectif de l'entreprise"
                                inputProps={{
                                    min: 0,
                                    step: 1,
                                }}
                            />
                        </FormControl>
                        <FormLabel
                            id="demo-controlled-radio-buttons-group"
                            sx={{
                                m: 2,
                                width: '15ch',
                            }}
                        >
                            Etablissement
                        </FormLabel>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="principal"
                                    control={<Radio />}
                                    label="principal"
                                />
                                <FormControlLabel
                                    value="secondaire"
                                    control={<Radio />}
                                    label="secondaire"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '20ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Civilité
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="text"
                                label=" Nom de l'entreprise"
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '30ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Nom
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="url"
                                label="Nom"
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '27ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Prénom
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="url"
                                label="Prénom"
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
                                Fonction
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="text"
                                label="Fonction"
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
                                Service
                            </InputLabel>
                            <OutlinedInput
                                name="password"
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
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Téléphone
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="text"
                                label="Téléphone"
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
                                name="password"
                                type="text"
                                label="Email"
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
                        <Box
                            sx={{
                                m: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    m: 2,
                                    width: '30ch',
                                    height: '50px',
                                    backgroundColor: '#3D50FF',
                                    color: '#fff',
                                }}
                            >
                                Lier mon YUMA PASS
                            </Button>
                            <Button
                                variant="contained"
                                disabled={true}
                                sx={{
                                    m: 2,
                                    width: '30ch',
                                    height: '50px',
                                    backgroundColor: '#3D50FF',
                                    color: '#fff',
                                }}
                            >
                                Pas encore de YUMA PASS ?
                            </Button>
                        </Box>
                        <img
                            src={qrcodeImage}
                            alt="qrcode"
                            width="200px"
                            height="200px"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <NavLink
                            to="/home"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                width: '150%',
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    m: 2,
                                    width: '20ch',
                                    height: '50px',
                                    backgroundColor: '#3D50FF',
                                    color: '#fff',
                                }}
                            >
                                Enregistrer
                            </Button>
                        </NavLink>
                    </Grid>
                </Container>
            </form>
        </Card>
    )
}
