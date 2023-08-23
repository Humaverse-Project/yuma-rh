import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';

function ModalEditProposal({ open, listCompetance, listmetier, listposte, onSubmit, onClose, metieractive, postedata, setPostedata }) {
    const listnommetier = listmetier.reduce((list, item) => {
        if (!list.includes(item.nom)) {
            list.push(item.nom)
        }
        return list
    }, [])
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
        onClose()
    }
    const handleSubmit = () => {
        onSubmit(postedata);
        onClose();
    };
    const handleNewcompetance= () => {
        // onSubmit(newmetier);*
        var competanceid = listCompetance.filter(comp=>{
            if(comp.code === formatCometance[0]){
                return true;
            }
            return false
        })[0].id
        setPostedata(postedata=>[...postedata, { id: Math.floor(Math.random() * 999999999999), competancecode: formatCometance[0], competanceid: competanceid, niveauCompetance: "0", metier_id: metieractive.id, type: "new", id_proposition: postedata[0].id_proposition, type2: "new" }] )
    };
    
    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogTitle textAlign="center" color={"black.main"}>Moditication Proposition métier</DialogTitle>
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
                            value={metieractive.code}
                            disablePortal
                            readOnly
                            disabled
                            options={formatMetier}
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
                            value={metieractive.nom}
                            disablePortal
                            readOnly
                            disabled
                            options={listnommetier}
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
                                        readOnly={item.type === "update"}
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
                    Enregistrer les modification
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalEditProposal
