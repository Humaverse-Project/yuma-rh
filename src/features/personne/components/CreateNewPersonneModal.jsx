import React, {useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Autocomplete,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
    ListItemText,
    FormControl
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';

const CreateNewPersonneModal = ({ open, onClose, onSubmit }) => {
    const [newpersonne, setNewPersonne] = useState({});
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
      setLoading(true)
      await onSubmit(newpersonne);
      setLoading(false)
      setNewPersonne({})
      onClose();
    };
    
    const changetexarea = (e)=>{
      setNewPersonne({ ...newpersonne, [e.target.name]: e.target.value })
    }

    const generateRandomPassword = () => {
        const length = 10;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=[]{};:,.<>?";
        let password = "";
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset.charAt(randomIndex);
        }
        return password;
    }
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Ajouter une personne dans votre entreprise</DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' }
              }}
            >
              <Typography>Civilité</Typography>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                    display: 'flex',
                }}
              >
                  <TextField
                    key="nom"
                    label="Nom"
                    name="nom"
                    onChange={changetexarea}
                    required
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                  />
                  <TextField
                    key="prenom"
                    label="Prénom"
                    name="prenom"
                    required
                    onChange={changetexarea}
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                  />
                  <Autocomplete
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                    disablePortal
                    options={[{label: "Homme", valeur: 1},{label: "Femme", valeur: 2}]}
                    onChange={(e, value) =>{
                      if (value != null) setNewPersonne({ ...newpersonne, genre: value.valeur })
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
                  <FormControl
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                  >
                    <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            >
                            <DatePicker
                                label="Date de naissance"
                                name="date_naissance"
                                onChange={(value)=> {console.log(value);setNewPersonne({ ...newpersonne, date_naissance: value.$d })}}
                                format="DD-MM-YYYY"
                            />
                        </LocalizationProvider>
                  </FormControl>
                  
              </Grid>
              <Typography>Contact et adresse</Typography>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                    display: 'flex',
                }}
              >
                <TextField
                    key="email"
                    label="Adresse email"
                    name="email"
                    type='Email'
                    onChange={changetexarea}
                    required
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                  />
                  <TextField
                    key="telephone"
                    label="Télephone"
                    name="telephone"
                    required
                    onChange={changetexarea}
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                  />
                  <TextField
                    key="adresse"
                    label="Adresse"
                    name="adresse"
                    required
                    onChange={changetexarea}
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                  />
                  <TextField
                    key="acretitre"
                    label="Accreditation titre"
                    name="acretitre"
                    required
                    onChange={changetexarea}
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={6}
                    sx={{
                        display: 'flex',
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    console.log(newpersonne)
                                    if (isChecked) {
                                        setNewPersonne({ ...newpersonne, password: generateRandomPassword(), creeuncompte: "ok" })
                                    } else {
                                        setNewPersonne({ ...newpersonne, creeuncompte: "ko", password: "" })
                                    }
                                }}
                            />
                        }
                        label={<ListItemText primary={"Crée un compte pour cette personne"} />}
                        sx={{
                            m: 2,
                            width: '100%',
                        }}
                    />
                </Grid>
                
                {   newpersonne.creeuncompte === "ok" ? (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <TextField
                            key="password"
                            label="Mot de passe"
                            name="password"
                            aria-readonly
                            value={newpersonne.password}
                            sx={{
                                m: 2,
                                width: '100%',
                            }}
                        />
                        <TextField
                            key="role"
                            label="Rôle"
                            name="role"
                            sx={{
                                m: 2,
                                width: '100%',
                            }}
                        />
                        <TextField
                            key="service"
                            label="Service"
                            name="service"
                            sx={{
                                m: 2,
                                width: '100%',
                            }}
                        />
                    </Grid>
                ) : (
                null
                )}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Annuler</Button>
            <LoadingButton
                loading={loading}
                sx={{ width: 'auto', mt: 2 }}
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                color="secondary"
            >
                Enregistrer
            </LoadingButton>
        </DialogActions>
      </Dialog>
    );
};

export default CreateNewPersonneModal