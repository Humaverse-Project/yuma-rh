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
    Grid
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { LoadingButton } from '@mui/lab';

const NewPosteModal = ({ open, onClose, onSubmit, dataPersonne, datametier, datacompetance  }) => {
    const [loading, setLoading] = useState(false)
    const [newnode, setNewnode] = useState({
        imageUrl: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg"
    });
    const handleChangeMetier = (event, value) => {
        console.log(value)
        if(value != null){setNewnode({ ...newnode, metier: value.nom, metierid: value.id })}
        else {setNewnode({ ...newnode, metier: "", nodeId: "", metierid: 0})}
    };
    const handleChangePoste = (event, value) => {
        if(value != null){setNewnode({ ...newnode, competance: value.titre, competanceid: value.id, nodeId: value.id+"_"+Math.floor(Math.random() * 999999999999), })}
        else {setNewnode({ ...newnode, competance: "", competanceid: 0, nodeId: "" })}
    };
    const handleChangePersonne = (event, value) => {
        if(value != null){setNewnode({ ...newnode, personne: value.label, personneid: value.id })}
        else {setNewnode({ ...newnode, personne: "", personneid: 0 })}
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewnode({ ...newnode, [name]: value });
    };
    const submitdata = async (e)=> {
        console.log(newnode)
        setLoading(true)
        await onSubmit(newnode)
        setLoading(false)
        setNewnode({
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
                                label="Métier" 
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
                        <Autocomplete
                        sx={{
                            width: '100%',
                        }}
                        disablePortal
                        options={datacompetance || []}
                        onChange={handleChangePoste}
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
                            Titre
                        </InputLabel>
                        <OutlinedInput
                            name="titre"
                            onChange={handleChange}
                            label="Titre"
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
                        <TextField
                            name="activite"
                            onChange={handleChange}
                            InputProps={{
                            multiline: true
                            }}
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
                        <TextField
                            name="definition"
                            onChange={handleChange}
                            InputProps={{
                                multiline: true
                            }}
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
                        <TextField
                            name="agrement"
                            onChange={handleChange}
                            InputProps={{
                                multiline: true
                            }}
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
                        <TextField
                            name="condition_general"
                            onChange={handleChange}
                            InputProps={{
                                multiline: true
                            }}
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
                        <TextField
                            name="instruction"
                            onChange={handleChange}
                            InputProps={{
                                multiline: true
                            }}
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