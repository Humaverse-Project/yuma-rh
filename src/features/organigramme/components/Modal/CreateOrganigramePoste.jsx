import { 
    Button,
    Dialog,
    DialogContent,
    Stack,
    DialogActions,
    FormControl,
    Autocomplete,
    TextField,
    FormHelperText,
    Typography
} from '@mui/material'
import { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from "react-redux";

const CustomStyledInput = styled(TextField)`
    .MuiOutlinedInput-root {
        color: #000000;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #004d80;
    }
    .MuiInputLabel-root.Mui-focused {
        color: #004d80;
    }
    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: #004d80;
    }
`;

const CreateOrganigramePoste = ({ open, onClose, submitdata }) => {
    const { titrelist, dataPersonne } = useSelector((state) => state.organigramme);
    const [titreerreur, settitreerreur] = useState([false, ""]);
    const [thisposte, setPosteEdition] = useState({})
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "titre") {
            if (titrelist.includes(value)) {
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
                            options={dataPersonne || []}
                            onChange={(e, value)=>{
                                if (value !== null) {
                                    setPosteEdition({...thisposte, personnesid: value.id, personnes: {personneNom: value.label, personnePrenom: ""}})
                                } else {
                                    setPosteEdition({...thisposte, personnesid: 0, personnes: null})
                                }
                            }}
                            renderInput={(params) => (
                                <CustomStyledInput
                                    {...params}
                                    className="subvariant-hovered"
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
                        <CustomStyledInput
                            className="subvariant-hovered"
                            onChange={handleChange}
                            name="titre"
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
                    variant="outlined"
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
                        submitdata(thisposte)
                    }}
                    color="blue"
                >
                    <Typography color="white">Générer la fiche de poste</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateOrganigramePoste