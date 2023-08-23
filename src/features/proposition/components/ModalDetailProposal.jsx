import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import BackspaceIcon from '@mui/icons-material/Backspace';

function ModalDetailProposal({ open, listCompetance, listmetier, onSubmit, onClose, metieractive, postedata, vote, setVote}) {
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
        onSubmit(vote);
    };
    
    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogTitle textAlign="center" color={"black.main"}>Détail Proposition métier</DialogTitle>
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
                                    readOnly
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
                                    readOnly
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
                        <Box 
                            display={'flex'}
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center">
                                <Typography align='center' sx={{mb:2}} color={"black.main"}>Voter ce propositions</Typography>
                                <Stack spacing={3} direction="row">
                                    {vote.value ? (
                                        <Button onClick={() => setVote({...vote, value: true})} color="success" variant="contained">
                                            <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
                                        </Button>
                                    ) : (
                                        <Button onClick={() => setVote({...vote, value: true})} color="success">
                                            <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
                                        </Button>
                                    )}
                                    {vote.value === false ? (
                                        <Button onClick={() => setVote({...vote, value: false})} variant="contained">
                                            <ThumbDownOffAltIcon></ThumbDownOffAltIcon>
                                        </Button>
                                    ) : (
                                        <Button onClick={() => setVote({...vote, value: false})}>
                                            <ThumbDownOffAltIcon></ThumbDownOffAltIcon>
                                        </Button>
                                    )}
                                    {vote.value === null ? (
                                        <Button onClick={() => setVote({...vote, value: null})} color="warning" variant="contained">
                                            <BackspaceIcon></BackspaceIcon>
                                        </Button>
                                    ) : (
                                        <Button onClick={() => setVote({...vote, value: null})} color="warning" >
                                            <BackspaceIcon></BackspaceIcon>
                                        </Button>
                                    )}
                                </Stack>
                       </Box>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={handleannulerbutton}>Annuler</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Enregistrer mon vote
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalDetailProposal
