import { 
    Button,
    Dialog,
    DialogContent,
    Stack,
    DialogActions,
    FormControl,
    InputLabel,
    OutlinedInput,
    Autocomplete,
    TextField,
    FormHelperText
} from '@mui/material'
import { useState } from 'react';

const EditPosteModal = ({ open, onClose, personnelist, submitdata, thisposte, setPosteEdition, titreexistant }) => {
    const [titreerreur, settitreerreur] = useState([false, ""]);
    console.log(open)
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "titre") {
            if (titreexistant.includes(value)) {
                settitreerreur([true, "Cet intitulé existe déjà dans l'organigramme"])
            } else {
                settitreerreur([false, ""])
            }
        }
        setPosteEdition({...thisposte, orgIntitulePoste: event.target.value})
    };

    return ( 
        <Dialog open={open} onClose={onClose} sx={{
            width: "40%",
            left: "30%"
        }}>
            <DialogContent dividers={true}>
                <Stack
                    sx={{
                        minWidth: { xs: '300px', sm: '360px', md: '400px' },
                        gap: '1.5rem',
                    }}
                >
                    <FormControl>
                        <Autocomplete
                            sx={{
                                width: '100%',
                            }}
                            disablePortal
                            options={personnelist || []}
                            onChange={(e, value)=> setPosteEdition({...thisposte, personnesid: value.id})}
                            value={thisposte.personnes === null ? null : {label: thisposte.personnes.personneNom+" "+thisposte.personnes.personnePrenom, id: thisposte.personnes.id }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    label="Nom" 
                                    name="nom"
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        required
                        error={titreerreur[0]}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Poste
                        </InputLabel>
                        <OutlinedInput
                            onChange={handleChange}
                            name="Poste"
                            label="Poste"
                            value={thisposte.orgIntitulePoste}
                        />
                        {   titreerreur[0] ? (
                            <FormHelperText>{titreerreur[1]}</FormHelperText>
                        ) : (
                        null
                        )}
                    </FormControl>
                    
                </Stack>
                </DialogContent>
                <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                >
                    Annuler
                </Button>
                <Button
                    sx={{ width: 'auto' }}
                    variant="contained"
                    fullWidth
                    onClick={(e)=> {
                        if (titreerreur[0]) {
                            return false
                        }
                        submitdata()
                    }}
                    color="success"
                >
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditPosteModal