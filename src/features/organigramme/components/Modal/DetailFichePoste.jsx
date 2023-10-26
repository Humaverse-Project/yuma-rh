import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogContent,
    Grid,
    Typography
} from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PartCompetanceShow from '../Part/PartCompetanceShow';
import ContextTravailShow from '../Part/ContextTravailShow';
// 
const DetailFichePoste = ({ open, onClose, ficheRow, validate, thispostetosend }) => {
    const { competance, context, mobilite } = useSelector((state) => state.fichesrome);
    const [expanded, setExpanded] = useState(false);
    const [activite, setactivite] = useState([]);
    const handleChangeaccord = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        setactivite(ficheRow.activite.split("\\n"))
        console.log(ficheRow,competance, context, mobilite)
    }, [ficheRow,competance, context, mobilite]);
    const dispatch = useDispatch();
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogContent dividers={true}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Button
                                onClick={onClose}
                                variant='outlined'
                                color='blue'
                                fullWidth
                            >
                                <Typography>RETOUR</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" sx={{color: "blue.main", textTransform: "uppercase", textAlign: "center", fontWeight: "600", mb:2}}>FICHE DE POSTE</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={validate}
                                variant='contained'
                                color='blue'
                                fullWidth
                            >
                                <Typography sx={{color:"white"}}>VALIDER</Typography>
                            </Button>
                        </Grid>
                        <Card sx={{backgroundColor:"#fff", mx:8, width:"100%", mt: 2, p:1}}>
                            <CardHeader
                                title={thispostetosend.titre}
                                sx={{backgroundColor: "#fff", color:"#ea565a", textAlign:"left", border: "1px  solid #ea565a",borderLeft: "50px solid #ea565a" }}
                            />
                            <CardContent sx={{px:"34px"}}>
                                <Accordion expanded={expanded === 'Identificationposte'} onChange={handleChangeaccord('Identificationposte')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ minHeight:"unset" }}
                                    >
                                        <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                            Identification du poste
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid
                                            sx={{ flexGrow: 1, m: 0, pt:0 }}
                                            container
                                            spacing={2}
                                        >
                                            
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'activite'} onChange={handleChangeaccord('activite')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ minHeight:"unset" }}
                                    >
                                        <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                            Activités principales
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid
                                            sx={{ flexGrow: 1, m: 0, pt:0 }}
                                            container
                                            spacing={2}
                                        >
                                            {activite.map((emploi) => (
                                                <Grid item xs={6} key={emploi} sx={{ paddingTop:"0px" }}>
                                                    <Typography sx={{color:"black.main", fontSize:"13px" }}>{emploi}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'Competance'} onChange={handleChangeaccord('Competance')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{ minHeight:"unset" }}
                                            >
                                                <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                                    Compétences métier
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box
                                                    sx={{
                                                    margin: "auto",
                                                    gridTemplateColumns: "1fr 1fr",
                                                    width: "100%",
                                                    }}
                                                >
                                                    {"SAVOIRS FAIRE" in competance ? (
                                                    <PartCompetanceShow
                                                        groupedData={competance}
                                                        type={"SAVOIRS FAIRE"}
                                                        titre={"Savoir-faire"}
                                                    />
                                                    ) : null}
                                                    {"SAVOIRS" in competance ? (
                                                    <PartCompetanceShow
                                                        groupedData={competance}
                                                        type={"SAVOIRS"}
                                                        titre={"Savoirs"}
                                                    />
                                                    ) : null}
                                                    {"SAVOIR ÊTRE" in competance ? (
                                                    <PartCompetanceShow
                                                        groupedData={competance}
                                                        type={"SAVOIR ÊTRE"}
                                                        titre={"Savoirs être"}
                                                    />
                                                    ) : null}
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'contexttravaille'} onChange={handleChangeaccord('contexttravaille')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{ minHeight:"unset" }}
                                            >
                                                <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                                    Contextes de travail
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Grid
                                                sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                                                container
                                                spacing={2}
                                            >
                                                {"CONDITIONS_TRAVAIL" in context ? (
                                                <ContextTravailShow 
                                                    context={context}
                                                    type={"CONDITIONS_TRAVAIL"}
                                                    titre={"Conditions de travail et risques professionnels"}
                                                />
                                                ) : null}
                                                {"HORAIRE_ET_DUREE_TRAVAIL" in context ? (
                                                <ContextTravailShow 
                                                    context={context}
                                                    type={"HORAIRE_ET_DUREE_TRAVAIL"}
                                                    titre={"Horaires et durée du travail"}
                                                />
                                                ) : null}
                                                {"TYPE_BENEFICIAIRE" in context ? (
                                                <ContextTravailShow 
                                                    context={context}
                                                    type={"TYPE_BENEFICIAIRE"}
                                                    titre={"Publics spécifiques"}
                                                />
                                                ) : null}
                                                {"TYPE_STRUCTURE_ACCUEIL" in context ? (
                                                <ContextTravailShow 
                                                    context={context}
                                                    type={"TYPE_STRUCTURE_ACCUEIL"}
                                                    titre={"Types de structures"}
                                                />
                                                ) : null}
                                                {"LIEU_ET_DEPLACEMENT" in context ? (
                                                <ContextTravailShow 
                                                    context={context}
                                                    type={"LIEU_ET_DEPLACEMENT"}
                                                    titre={"LIEU_ET_DEPLACEMENT"}
                                                />
                                                ) : null}
                                                {"Agrément - Réglementation du métier" in context ? (
                                                    <ContextTravailShow 
                                                        context={context}
                                                        type={"Agrément - Réglementation du métier"}
                                                        titre={"Agrément - Réglementation du métier"}
                                                    />
                                                ) : null}
                                                {"Conditions générales de travail" in context ? (
                                                    <ContextTravailShow 
                                                        context={context}
                                                        type={"Conditions générales de travail"}
                                                        titre={"Conditions générales de travail"}
                                                    />
                                                ) : null}
                                                {"Fiches - Instructions - Scripts à respecter" in context ? (
                                                    <ContextTravailShow 
                                                        context={context}
                                                        type={"Fiches - Instructions - Scripts à respecter"}
                                                        titre={"Fiches - Instructions - Scripts à respecter"}
                                                    />
                                                ) : null}
                                            </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'Mobilite'} onChange={handleChangeaccord('Mobilite')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{ minHeight:"unset" }}
                                            >
                                                <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                                    Mobilité professionnelle
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="h5" sx={{ mt: 2, pl: 2, color:"black.main" }}>
                                                    Fiches ROME proches
                                                </Typography>
                                                <hr></hr>
                                                <Grid
                                                    sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                                                    container
                                                    spacing={2}
                                                >
                                                    {mobilite.romeproche.map((definitionitem) => (
                                                        <Grid item xs={11} key={definitionitem.id}>
                                                            <Typography sx={{color:"black.main", fontSize:"13px" }} key={definitionitem.id+"kle"}>
                                                            {definitionitem.rome_coderome} {definitionitem.nom}
                                                            </Typography>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                                <hr></hr>
                                                <Typography variant="h5" sx={{ mt: 2, pl: 2, color:"black.main" }}>
                                                    Fiches ROME envisageables si évolution
                                                </Typography>
                                                <hr></hr>
                                                <Grid
                                                    sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                                                    container
                                                    spacing={2}
                                                >
                                                    {mobilite.romeevolution.map((definitionitem) => (
                                                    <Grid item xs={11} key={definitionitem.id}>
                                                        <Typography sx={{color:"black.main", fontSize:"13px" }} key={definitionitem.id+"kles"}>
                                                        {definitionitem.rome_coderome} {definitionitem.nom}
                                                        </Typography>
                                                    </Grid>
                                                    ))}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                            </CardContent>
                        </Card>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
        
    )
}

export default DetailFichePoste