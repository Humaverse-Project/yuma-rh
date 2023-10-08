import React, {useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Autocomplete
} from '@mui/material';

const NewFormationModal = ({ open, onClose, onSubmit }) => {
    const [newmetier, setNewnode] = useState({
    });
  
    const handleSubmit = () => {
        console.log(newmetier)
      onSubmit(newmetier);
      onClose();
    };
  
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center"  color={"black.main"}>Crée une formation ou un test</DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
                <TextField
                    key="nom"
                    label="Nom"
                    required
                    name="nom"
                    onChange={(e) =>
                        setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />
                <Autocomplete
                    sx={{
                        width: '100%',
                    }}
                    disablePortal
                    options={["Formation", "Teste"]}
                    onChange={(e, value)=>{
                        if (value != null)  setNewnode({ ...newmetier, genre: value });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Genre" 
                            name="genre"
                            variant="outlined"
                        />
                    )}
                />
                <Autocomplete
                    sx={{
                        width: '100%',
                    }}
                    disablePortal
                    options={["Savoirs", "Savoirs Faire", "Savoirs Être", "Accrédidations"]}
                    onChange={(e, value)=>{
                        if (value != null)  setNewnode({ ...newmetier, categorie: value });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Categorie" 
                            name="categorie"
                            variant="outlined"
                        />
                    )}
                />
                <Autocomplete
                    sx={{
                        width: '100%',
                    }}
                    disablePortal
                    options={["En ligne", "Physique"]}
                    onChange={(e, value)=>{
                        if (value != null)  setNewnode({ ...newmetier, type: value });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Type" 
                            name="type"
                            variant="outlined"
                        />
                    )}
                />
                <TextField
                    key="tarif"
                    label="Tarif"
                    name="tarif"
                    type="number"
                    onChange={(e) =>
                        setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />
                <TextField
                    key="durrer"
                    label="Durré en Heure"
                    name="durrer"
                    type="number"
                    onChange={(e) =>
                        setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Annuler</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default NewFormationModal