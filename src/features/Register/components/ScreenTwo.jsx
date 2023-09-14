import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postentreprise } from '../../../services/CompteService';
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
    OutlinedInput
} from '@mui/material'

export default function ScreenTwo({ formData, setScreen, setFormData }) {
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const handlesubmit = ()=>{
        if(formData.password !== formData.password2){
            setShowError(true)
            return false
        }
        postentreprise(formData)
        .then((data) => {
            navigate('/home');
        })
        .catch((error) => {
            console.error('bakend error:', error.message);
        });
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setShowError(false);
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
                                Votre nom
                            </InputLabel>
                            <OutlinedInput
                                value={formData.nomrh}
                                onChange={handleChange}
                                name="nomrh"
                                type="url"
                                label="Votre nom"
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
                                Votre prénom
                            </InputLabel>
                            <OutlinedInput
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
                                value={formData.fonctionrh}
                                onChange={handleChange}
                                name="fonctionrh"
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
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Votre numero de téléphone
                            </InputLabel>
                            <OutlinedInput
                                value={formData.telephonerh}
                                onChange={handleChange}
                                name="telephonerh"
                                type="text"
                                label="Votre numero de téléphone"
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
                                Votre adresse email
                            </InputLabel>
                            <OutlinedInput
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
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '40ch',
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Mot de passe
                            </InputLabel>
                            <OutlinedInput
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                type="password"
                                label="Mot de passe"
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
                                Confirmation mot de passe
                            </InputLabel>
                            <OutlinedInput
                                value={formData.password2}
                                onChange={handleChange}
                                name="password2"
                                type="password"
                                label="Confirmation mot de passe"
                            />
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="outlined"
                            sx={{
                                m: 2,
                                width: '20ch',
                                height: '50px',
                            }}
                            onClick={()=>setScreen(1)}
                            color='secondary'
                        >
                            Retour
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                m: 2,
                                width: '20ch',
                                height: '50px',
                                backgroundColor: '#3D50FF',
                                color: '#fff',
                            }}
                            onClick={handlesubmit}
                        >
                            Enregistrer
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
                        Les mots de passe ne correspond pas
                    </Alert>
                </Snackbar>
            </div>
        </Card>
    )
}
