import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Autocomplete from '@mui/material/Autocomplete'

export default function ScreenOne({ setScreen }) {
    const select = [
        { label: 'France' },
        { label: 'Allemagne' },
        { label: 'Espagne' },
        { label: 'Italie' },
        { label: 'Portugal' },
        { label: 'Belgique' },
        { label: 'Suisse' },
        { label: 'Luxembourg' },
        { label: 'Royaume-Uni' },
        { label: 'Autre' },
    ]
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
                        Formulaire Inscription YUMA utilisateur RH page 1
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
                                name="password"
                                type="text"
                                label="Nom"
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
                                APE/NAF
                            </InputLabel>
                            <OutlinedInput
                                name="password"
                                type="text"
                                label="APE/NAF"
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
                                Nom de l'entreprise
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
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                URL
                            </InputLabel>
                            <OutlinedInput
                                name="password"
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
                                name="password"
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
                                label="Nom"
                            />
                        </FormControl>
                        <Autocomplete
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                            disablePortal
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
                                name="password"
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
                                name="password"
                                type="email"
                                label="Email"
                            />
                        </FormControl>
                    </Grid>
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
                            onClick={() => setScreen(2)}
                        >
                            Suivant
                        </Button>
                    </Grid>
                </Container>
            </form>
        </Card>
    )
}
