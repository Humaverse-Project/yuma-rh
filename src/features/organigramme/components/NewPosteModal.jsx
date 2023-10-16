import React, { useState } from 'react';
import {filtredata} from "../../../services/OrganigrammeService"
import { 
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    DialogActions,
    FormControl,
    InputLabel,
    OutlinedInput,
    Autocomplete,
    TextField,
    Grid,
    FormControlLabel,
    Typography,
    Backdrop,
    CircularProgress,
    RadioGroup,
    Radio,
    FormHelperText,
    Alert
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { LoadingButton } from '@mui/lab';

const NewPosteModal = ({ open, onClose, onSubmit, dataPersonne, titreexistant  }) => {
    const [loading, setLoading] = useState(false)
    const [loadingrome, setloadingrome] = useState(false);
    const [romecompetanceerreur, setromecompetanceerreur] = useState([false, ""]);
    const [titreerreur, settitreerreur] = useState([false, ""]);
    const [erreurposte, seterreurposte] = useState(false);
    const [ postesource, setpostesource ] = useState({
        id: null
    })
    const [ postegenerique, setpostegenerique ] = useState([])
    const [ posteentreprise, setposteentreprise ] = useState([])
    const [newposte, setNewPoste] = useState({
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
        nodeId: "K_"+Math.floor(Math.random() * 999999999999),
        personneid: "",
        personne: "",
        titre: "",
        posteid: 0
    });
    
    const handleChangePersonne = (event, value) => {
        if(value != null){setNewPoste({ ...newposte, personne: value.label, personneid: value.id, personnelabel: value.label })}
        else {setNewPoste({ ...newposte, personne: "", personneid: 0, personnelabel: "" })}
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "titre") {
            if (titreexistant.includes(value)) {
                settitreerreur([true, "Cet intitulé existe déjà dans l'organigramme"])
            } else {
                settitreerreur([false, ""])
            }
            filtredata(value).then((reponsemetie) => {
                if (reponsemetie.length === 0) {
                    if (postegenerique.length === 0 && posteentreprise.length === 0) {
                        setromecompetanceerreur([true, "Il n'y a pas de fiche de poste prédéfinie pour ce code ROME"])
                    }
                } else {
                    setromecompetanceerreur([false, ""])
                    setpostegenerique(reponsemetie.filter(poste=> {
                        if(poste.entreprise === null){
                            return true
                        } return false
                    }))
                    setposteentreprise(reponsemetie.filter(poste=> {
                        if(poste.entreprise !== null){
                            return true
                        } return false
                    }))
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setNewPoste({ ...newposte, [name]: value });
    };
    const submitdata = async (e)=> {
        if (newposte.titre === "") {
            settitreerreur([true, "Ce champs et obligatoire"])
            return false
        }
        if (titreerreur[0]){
            return false
        }
        setLoading(true)
        setloadingrome(true)
        await onSubmit(newposte)
        setLoading(false)
        setNewPoste({
            imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
        })
        setloadingrome(false)
        setpostegenerique([])
        onClose()
    }
    return (
        <ThemeProvider theme={theme}>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 255 }}
                open={loadingrome}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog  open={open} onClose={onClose}>
                <DialogTitle textAlign="center"  color={"black.main"}>Ajout poste</DialogTitle>
                <DialogContent dividers={true}>
                    <Stack
                        sx={{
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                sx={{
                                display: "flex",
                                marginRight: "5px",
                                }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        width: "100%",
                                    }}
                                    required
                                    error={titreerreur[0]}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Intitulé poste organigramme
                                    </InputLabel>
                                    <OutlinedInput
                                        onChange={handleChange}
                                        name="titre"
                                        label="Intitulé poste organigramme"
                                    />
                                {   titreerreur[0] ? (
                                        <FormHelperText>{titreerreur[1]}</FormHelperText>
                                    ) : (
                                    null
                                    )}
                                </FormControl>
                            </Grid>
                        </Box>
                        {
                            romecompetanceerreur[0] && 
                            <Alert severity="warning">{romecompetanceerreur[1]}</Alert>
                        }
                        {
                            (!romecompetanceerreur[0] && newposte.titre !== "") && (
                                <>
                                    <Alert severity="info">Vous pouvez associer ce poste à une fiche de poste ou à un métier ci-dessous.</Alert>
                                    <Grid
                                        sx={{ flexGrow: 1 }}
                                        container
                                        spacing={2}
                                    >
                                        <Grid item xs={4}>
                                            <Typography sx={{mb: 2}}><b>Poste entreprise</b></Typography>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                            >
                                            {
                                                posteentreprise.map((poste)=> (
                                                    <FormControlLabel
                                                        value={poste.id}
                                                        control={
                                                            <Radio
                                                                checked={
                                                                    postesource.id ===
                                                                    poste.id
                                                                }
                                                                onChange={(e) => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        setNewPoste({ ...newposte, posteid: poste.id })
                                                                        setpostesource(poste)
                                                                        seterreurposte(false)
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label={poste.titre}
                                                    />
                                                ))
                                            }
                                            </RadioGroup>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography sx={{mb: 2}}><b>Liste de Fiches Métier Entreprise</b></Typography>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                            >
                                            {
                                                posteentreprise.map((poste)=> (
                                                    <FormControlLabel
                                                        value={poste.id}
                                                        control={
                                                            <Radio
                                                                checked={
                                                                    postesource.id ===
                                                                    poste.id
                                                                }
                                                                onChange={(e) => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        setNewPoste({ ...newposte, posteid: poste.id })
                                                                        setpostesource(poste)
                                                                        seterreurposte(false)
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label={poste.titre}
                                                    />
                                                ))
                                            }
                                            </RadioGroup>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography sx={{mb: 2}}><b>Liste de Fiches Métier Humaverse</b></Typography>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                            >
                                            {
                                                postegenerique.map((poste)=> (
                                                    <FormControlLabel
                                                        value={poste.id}
                                                        control={
                                                            <Radio
                                                                checked={
                                                                    postesource.id ===
                                                                    poste.id
                                                                }
                                                                onChange={(e) => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        setNewPoste({ ...newposte, posteid: poste.id })
                                                                        setpostesource(poste)
                                                                        seterreurposte(false)
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label={poste.titre}
                                                    />
                                                ))
                                            }
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        }
                        {
                            erreurposte && 
                            <Alert severity="warning">Veuillez associer le poste à la liste de métier ci dessus.</Alert>
                        }
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >  
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <Autocomplete
                                    sx={{
                                        width: '100%',
                                    }}
                                    disablePortal
                                    options={dataPersonne || []}
                                    onChange={handleChangePersonne}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            label="Personne" 
                                            name="personne"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                >
                    Annuler
                </Button>
                <LoadingButton
                    loading={loading}
                    sx={{ width: 'auto' }}
                    variant="contained"
                    fullWidth
                    onClick={submitdata}
                    color="success"
                >
                    Enregistrer
                </LoadingButton>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}
export default NewPosteModal