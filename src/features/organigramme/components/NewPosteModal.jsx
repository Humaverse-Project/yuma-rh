import React, { useState } from 'react';
import {getdatarome} from "../../../services/MetierService"
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
    List,
    ListItem,
    FormControlLabel,
    ListItemText,
    Checkbox,
    Typography,
    Backdrop,
    CircularProgress,
    RadioGroup,
    Radio,
    Divider
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { LoadingButton } from '@mui/lab';

const NewPosteModal = ({ open, onClose, onSubmit, dataPersonne, datametier, posteentreprise  }) => {
    const [loading, setLoading] = useState(false)
    const [loadingrome, setloadingrome] = useState(false);
    const [ listbrique, setlistbrique ] = useState([])
    const [ niveau, setniveau ] = useState(null)
    const [ source, setsource ] = useState(null)
    const [ postesource, setpostesource ] = useState({
        id: null
    })
    const [ postegenerique, setpostegenerique ] = useState([])
    const [newposte, setNewPoste] = useState({
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
        ,competancedata: null
        ,condition_general: ''
        ,instruction: ''
        ,activite:''
        ,definition:''
        ,agrement:''
    });
    
    const handleChangePersonne = (event, value) => {
        if(value != null){setNewPoste({ ...newposte, personne: value.label, personneid: value.id, personnelabel: value.label })}
        else {setNewPoste({ ...newposte, personne: "", personneid: 0, personnelabel: "" })}
    };
    const handleChangePostegenerique = (event, value) => {
        if (test.length > 0) {
            let values = test[0]
            setNewPoste({
                ...newposte,
                activite: value.activite[0],
                definition: value.definition[0],
                agrement: value.agrement,
                condition_general: value.condition,
                instruction: value.instruction[0],
                competance: values.titre, competanceid: values.id, nodeId: values.id+"_"+Math.floor(Math.random() * 999999999999), competancedata: values
            })
        } else {
            setNewPoste({
                ...newposte,
                activite: value.activite[0],
                definition: value.definition[0],
                agrement: value.agrement,
                condition_general: value.condition,
                instruction: value.instruction[0]
            })
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPoste({ ...newposte, [name]: value });
    };
    const handleChangeRome = (e, value)=>{
        setloadingrome(true)
        getdatarome(value.code)
        .then((reponsemetie) => {
            setloadingrome(false);
            console.log(reponsemetie.poste_generique)
            setpostegenerique(reponsemetie.poste_generique)
        })
        .catch((error) => {
            setloadingrome(false);
        });
    }
    const submitdata = async (e)=> {
        console.log(newposte)
        setLoading(true)
        await onSubmit(newposte)
        setLoading(false)
        setNewPoste({
            imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
        })
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
            <Dialog  open={open} onClose={onClose} sx={{width:"60%", marginLeft:"20%"}}>
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
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <Autocomplete
                                    sx={{
                                        width: '100%',
                                    }}
                                    disablePortal
                                    options={datametier || []}
                                    onChange={handleChangeRome}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            label="Code ROME" 
                                            name="rome"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                        </Box>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                        >
                            <FormControlLabel
                                value="existante"
                                control={
                                    <Radio
                                        checked={
                                            source ===
                                            'existante'
                                        }
                                        onChange={(e) => {
                                            if (
                                                e.target
                                                    .checked
                                            ) {
                                                setsource('existante')
                                            }
                                        }}
                                    />
                                }
                                label="Sélectionner le poste depuis une liste."
                            />
                            <FormControlLabel
                                value="createnew"
                                disabled
                                control={
                                    <Radio
                                        checked={
                                            source ===
                                            'createnew'
                                        }
                                        onChange={(e) => {
                                            if (
                                                e.target
                                                    .checked
                                            ) {
                                                setsource('createnew')
                                            }
                                        }}
                                    />
                                }
                                label="Crée une nouvelle poste."
                            />
                        </RadioGroup>
                        <Grid
                            sx={{ flexGrow: 1, mt: 1 }}
                            container
                            spacing={2}
                        >
                            <Grid item xs={6}>
                                <Typography variant='h6' sx={{mb: 2}}>Poste entreprise</Typography>
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
                                                            setpostesource(poste)
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
                            <Grid item xs={6}>
                                <Typography variant='h6' sx={{mb: 2}}>Poste generique</Typography>
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
                                                            setpostesource(poste)
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
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >  
                            <Grid
                                item
                                xs={6}
                                sm={6}
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