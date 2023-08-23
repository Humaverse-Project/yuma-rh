import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useState } from "react"
import AddBoxIcon from '@mui/icons-material/AddBox';

function ModalCreate({ open, listCompetance, listmetier, listposte, onSubmit, onClose}) {
    const [newproposition, setNewproposition] = useState(null)
    const [listnommetier, setNewnommetier] = useState([])
    const [ postedata, setPostedata ] = useState([])
    const [ metierselected, setmetierselected ] = useState(null)
    const formatMetier = listmetier.reduce((list, item) => {
        if (!list.includes(item.code)) {
            list.push(item.code)
        }
        return list
    }, [])
    const formatCometance = listCompetance.reduce((list, item) => {
        if (!list.includes(item.code)) {
            list.push(item.code)
        }
        return list
    }, [])
    const handleannulerbutton = ()=>{
        setPostedata([])
        onClose()
    }
    const handleSubmit = () => {
        onSubmit(postedata);
        onClose();
        setPostedata([])
    };
    const handleNewcompetance= () => {
        var competanceid = listCompetance.filter(comp=>{
            if(comp.code === formatCometance[0]){
                return true;
            }
            return false
        })[0].id
        setPostedata(postedata=>[...postedata, { id: Math.floor(Math.random() * 999999999999), competancecode: formatCometance[0], competanceid: competanceid, niveauCompetance: "0", metier_id: metierselected, type: "new" }] )
    };
    const selectMetierCode = (e, value) => {
        var format = []
        if (value !== null){
            setNewproposition({ ...newproposition, metier_code: value })
            format = listmetier.reduce((list, item) => {
                if (!list.includes(item.nom)) {
                    if (item.code === value){
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
        if (value !== null){
            setNewproposition({ ...newproposition, metier_nom: value })
            let metierid = listmetier.filter(metier=>{
                if(metier.nom === value && metier.code === newproposition.metier_code) return true
                return false
            })
            
            if(metierid.length > 0){
                setNewproposition({ ...newproposition, metier_id: metierid[0].id })
                setmetierselected(metierid[0].id)
            } else {
                setPostedata([])
                setmetierselected(null)
            }
            handleNewcompetance()
        } else {
            setPostedata([])
            setmetierselected(null)
        }
    }
    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogTitle textAlign="center" color={"black.main"}>Proposition création métier</DialogTitle>
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
                                        onChange={(e, value)=>{
                                            if (value){
                                                item.competancecode = value
                                                item.competanceid = listCompetance.filter(comp=>{
                                                    if(comp.code === value){
                                                        return true;
                                                    }
                                                    return false
                                                })[0].id
                                            }
                                        }}
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
                                        onChange={(e, value)=>{
                                            item.niveauCompetance = value
                                        }}
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
                <Button onClick={handleannulerbutton}>Annuler</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Envoyer la proposition
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalCreate
