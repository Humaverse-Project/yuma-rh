import React, { useState } from 'react';
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
    Typography
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { LoadingButton } from '@mui/lab';

const NewPosteModal = ({ open, onClose, onSubmit, dataPersonne, datametier, datacompetance, datapostegenerique  }) => {
    const [loading, setLoading] = useState(false)
    const [readonlycompetance, setreadonlycompetance] = useState(false)
    const [ datapostegeneriqueafficher, setdatapostegeneriqueafficher] = useState([])
    const [ listbrique, setlistbrique ] = useState([])
    const [ niveau, setniveau ] = useState(null)
    const [newposte, setNewPoste] = useState({
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
        ,competancedata: null
        ,condition_general: ''
        ,instruction: ''
        ,activite:''
        ,definition:''
        ,agrement:''
    });
    const handleChangeMetier = (event, value) => {
        if(value != null){
            setNewPoste({ ...newposte, metier: value.nom, metierid: value.id });
            let poste = datapostegenerique.filter(posg=>{
                if (posg.rome.id === value.id) {
                    return true
                } return false
            });
            setdatapostegeneriqueafficher(poste)
        }
        else {setNewPoste({ ...newposte, metier: "", nodeId: "", metierid: 0, metierlabel: ""}); setdatapostegeneriqueafficher([])}
    };
    const handleChangeCompetance = (event, value) => {
        if(value != null){
            setNewPoste({ ...newposte, competance: value.titre, competanceid: value.id, nodeId: value.id+"_"+Math.floor(Math.random() * 999999999999), competancedata: value});
            setlistbrique(value.brique)
            setniveau(value.niveau)
        }
        else {
            setNewPoste({ ...newposte, competance: "", competanceid: 0, nodeId: "" })
            setlistbrique([])
            setniveau(null)
        }
    };
    const handleChangePersonne = (event, value) => {
        if(value != null){setNewPoste({ ...newposte, personne: value.label, personneid: value.id, personnelabel: value.label })}
        else {setNewPoste({ ...newposte, personne: "", personneid: 0, personnelabel: "" })}
    };
    const handleChangePostegenerique = (event, value) => {
        if(value != null){
            let test = datacompetance.filter(competance=>{
                if (competance.id === value.fichecompetance.id) {
                    return true
                } return false
            })
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
                setreadonlycompetance(true)
                setniveau(values.niveau)
                setlistbrique(values.brique)
            } else {
                setNewPoste({
                    ...newposte,
                    activite: value.activite[0],
                    definition: value.definition[0],
                    agrement: value.agrement,
                    condition_general: value.condition,
                    instruction: value.instruction[0]
                })
                setlistbrique([])
                setniveau(null)
            }
        } else {
            setreadonlycompetance(false)
        }
        // else {setNewPoste({ ...newposte, personne: "", personneid: 0 })}
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPoste({ ...newposte, [name]: value });
    };
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
            <Dialog  open={open} onClose={onClose}>
                <DialogTitle textAlign="center"  color={"black.main"}>Formulaire de création poste</DialogTitle>
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
                                xs={4}
                                sm={4}
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
                                    onChange={handleChangeMetier}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            label="Fiches Métiers" 
                                            name="rome"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                    }}
                                    required
                                    >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Nom poste
                                    </InputLabel>
                                    <OutlinedInput
                                        name="titre"
                                        onChange={handleChange}
                                        label="Nom poste"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sm={4}
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
                                    options={datapostegeneriqueafficher || []}
                                    onChange={handleChangePostegenerique}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            label="Associer ce poste à un poste generique" 
                                            name="postegenerique"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                    }}
                                    required
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Activité
                                    </InputLabel>
                                    <OutlinedInput
                                        type="text"
                                        value={newposte.activite}
                                        name="activite"
                                        onChange={handleChange}
                                        multiline
                                        label="Activité"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                    }}
                                    required
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Définition
                                    </InputLabel>
                                    <OutlinedInput
                                        name="definition"
                                        value={newposte.definition}
                                        onChange={handleChange}
                                        multiline
                                        label="Définition"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                    }}
                                    required
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Agrement
                                    </InputLabel>
                                    <OutlinedInput
                                        name="agrement"
                                        value={newposte.agrement}
                                        onChange={handleChange}
                                        multiline
                                        label="Agrement"
                                    />
                                </FormControl>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                    }}
                                    required
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Condition Génerale
                                    </InputLabel>
                                    <OutlinedInput
                                        name="condition_general"
                                        value={newposte.condition_general}
                                        onChange={handleChange}
                                        multiline
                                        label="Condition Génerale"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                    }}
                                    required
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Instruction
                                    </InputLabel>
                                    <OutlinedInput
                                        name="instruction"
                                        value={newposte.instruction}
                                        onChange={handleChange}
                                        multiline
                                        label="Instruction"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sm={4}
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
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <Grid
                                item
                                xs={4}
                                sm={4}
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
                                    value={newposte.competancedata}
                                    readOnly={readonlycompetance}
                                    options={datacompetance || []}
                                    onChange={handleChangeCompetance}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            label="Fiche competance" 
                                            name="fiche_competance"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                        { listbrique.length >0 ? (
                            <Grid
                                item
                                xs={8}
                                sm={8}
                                sx={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <Typography>Niveau {niveau}</Typography>
                                <Box flex="1"
                                    sx={{
                                        m: 2,
                                        width: '100%',
                                    }}>
                                    <List sx={{maxHeight: "40vh", height: "40vh", overflow: "auto"}}>
                                        {listbrique.map((element) => (
                                        <ListItem key={element.id}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked = {true}
                                                        readOnly
                                                    />
                                                }
                                            label={<ListItemText primary={element.brqCompTitre} />}
                                            />
                                        </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Grid>
                        ) : (
                            null
                        )}
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