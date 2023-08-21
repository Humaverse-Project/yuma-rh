import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import AddBoxIcon from '@mui/icons-material/AddBox';

function ModalEdit({ open, listCompetance, listmetier, listposte, onSubmit, onClose}) {
    const [titre, setTitre] = useState(null)
    const [newproposition, setNewproposition] = useState(null)
    const [listnommetier, setNewnommetier] = useState([])
    const [ postedata, setPostedata ] = useState([])
    const formatMetier = listmetier.reduce((list, item) => {
        if (!list.includes(item.code)) {
            list.push(item.code)
        }
        return list
    }, [])
    const style = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        alignItems: 'center',
    };
    const formatCometance = listCompetance.reduce((list, item) => {
        if (!list.includes(item.code)) {
            list.push(item.code)
        }
        return list
    }, [])
    console.log(formatCometance)
    const handleSubmit = () => {
        // onSubmit(newmetier);
        onClose();
        console.log(postedata)
    };
    const handleNewcompetance= () => {
        // onSubmit(newmetier);
        postedata.push({ id: Math.floor(Math.random() * 999999999999), competancecode: "", competanceid: 0, niveauCompetance: "0" })
        setPostedata(postedata)
    };
    const selectMetierCode = (e, value) => {
        var format = []
        if (value !== null){
            setNewproposition({ ...newproposition, metier_code: value })
            format = listmetier.reduce((list, item) => {
                if (!list.includes(item.nom)) {
                    if (item.code == value){
                        list.push(item.nom)
                    }
                }
                return list
            }, [])
        } else {
            format = listmetier.reduce((list, item) => {
                if (!list.includes(item.nom)) {
                    list.push(item.nom)
                }
                return list
            }, [])
        }
        setNewnommetier(format)
    }
    const selectMetierNom = (e, value) => {
        var format = []
        if (value !== null){
            setNewproposition({ ...newproposition, metier_nom: value })
            let metierid = listmetier.filter(metier=>{
                if(metier.nom == value && metier.code == newproposition.metier_code) return true
                return false
            })
            if(metierid.length > 0){
                let poste = listposte.filter(poste=>{
                    if(poste.metier.id == metierid[0].id) return { id: poste.id, competancecode: poste.competance.code, competanceid: poste.competance.id, niveauCompetance: poste.niveauCompetance.toString() }
                    return false
                })
                setPostedata(poste)
            } else {
                setPostedata([])
            }
        } else {
            setPostedata([])
        }
    }
    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogTitle textAlign="center">Proposition update métier</DialogTitle>
            <DialogContent  dividers={true}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        <Autocomplete
                            sx={{
                                width: '100%',
                            }}
                            disablePortal
                            options={formatMetier}
                            onChange={selectMetierCode}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    label="Code Métier" 
                                    name="metier"
                                    variant="outlined"
                                />
                            )}
                        />
                    
                        <Autocomplete
                            sx={{
                                width: '100%',
                            }}
                            disablePortal
                            options={listnommetier}
                            onChange={selectMetierNom}
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
                            { postedata.map((item) => (
                                <Box 
                                    key={item.id}
                                    display={'flex'}
                                >
                                    <Autocomplete
                                        defaultValue={item.competancecode}
                                        sx={{
                                            width: '70%',
                                        }}
                                        disablePortal
                                        options={formatCometance}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                label="Competance code" 
                                                name="competance code"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                    <Autocomplete
                                        defaultValue={item.niveauCompetance}
                                        sx={{
                                            width: '30%'
                                        }}
                                        disablePortal
                                        options={["0", "1", "2", "3", "4", "5"]}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                label="Niveau" 
                                                name="niveau_competance"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Box>
                            ))}
                            <Button onClick={handleNewcompetance}>
                                <AddBoxIcon></AddBoxIcon>
                            </Button>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Annuler</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Crée le competance
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalEdit
