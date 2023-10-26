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
import { postdata } from "../../../../services/OrganigrammeService"
import { fetchPoste } from '../../../../model/reducer/Organigramme';
import { updatecompetance, addextracontext } from '../../../../model/reducer/FichesRome';
import { fetchRome } from '../../../../model/reducer/FichesRome';
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressElement } from '../../../../shared';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PartCompetanceShow from '../Part/PartCompetanceShow';
import ContextTravailShow from '../Part/ContextTravailShow';
import CreateOrganigramePoste from './CreateOrganigramePoste';
import DetailFichePoste from './DetailFichePoste'
// 
const FicheMetierDetailModal = ({ open, onClose, ficheRow }) => {
    const { definition, status, rome, access, appelation, competance, context, mobilite, competanceupdated, extrafieldadded } = useSelector((state) => state.fichesrome);
    const [expanded, setExpanded] = useState(false);
    const [loading, setloading] = useState(true);
    const [showconfirmmodal, setshowconfirmmodal] = useState(false);
    const [competanceaffiche, setcompetanceaffiche] = useState({});
    const [contextaffiche, setcontextaffiche] = useState({});
    const [thispostetosend, setthispostetosend] = useState({});
    const { posteselectionner } = useSelector((state) => state.organigramme);
    const dispatch = useDispatch();
    
    const handleChangeaccord = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        dispatch(fetchRome(ficheRow.rome.code))
    }, [dispatch, ficheRow]);
    useEffect(() => {
        if (!status) {
            const groupedData = {};
            ficheRow.fichecompetance.niveau.forEach((item) => {
                const categorie = item.briquescompetances.compGb.compGbCategorie;
                const titre = item.briquescompetances.compGb.compGbTitre;
                if (!groupedData[categorie]) {
                    groupedData[categorie] = {};
                }
                if (!groupedData[categorie][titre]) {
                    groupedData[categorie][titre] = [];
                }
                groupedData[categorie][titre].push(item);
            });
            const dataTR = ficheRow.briquecontextmetier;
            const groupedDataTR = {};
            dataTR.forEach((item) => {
                const titre = item.contexttitre;
                if (!groupedDataTR[titre]) {
                    groupedDataTR[titre] = [];
                }
                groupedDataTR[titre].push(item);
            });
            dispatch(updatecompetance(groupedData))
            dispatch(addextracontext(groupedDataTR))
        }
    }, [status, dispatch, ficheRow]);
    useEffect(()=>{
        if(competanceupdated && extrafieldadded) {
            setloading(false)
            setcompetanceaffiche(competance)
            setcontextaffiche(context)
        }
    }, [competanceupdated, extrafieldadded, competance, context])
    const [openaddposte, setopenaddposte] = useState(false)
    const setpostemodalopen = (e)=>{
        setopenaddposte(true)
    }
    const submitdata = (e)=>{
        console.log(e)
        setshowconfirmmodal(true)

        let parentNodeId = ""
        let personneid = ""
        if (posteselectionner._id !== undefined) {
            parentNodeId = posteselectionner._id
        }
        if (e.personnesid !== undefined || e.personnesid !== 0) {
            personneid = e.personnesid
        }
        let thisposte = {
            posteid : ficheRow.id,
            parentNodeId : parentNodeId,
            titre : e.orgIntitulePoste,
            personneid : personneid
        }
        setopenaddposte(false)
        setthispostetosend(thisposte)
        // setloading(true)
        // postdata(thisposte)
        // .then(() => {
        //     dispatch(fetchPoste())
        //     setopenaddposte(false)
        //     onClose()
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }
    const submitdataconfirmation = (e) => {
        setloading(true)
        postdata(thispostetosend)
        .then(() => {
            dispatch(fetchPoste())
            setshowconfirmmodal(false)
            onClose()
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <>
            <CircularProgressElement
                open={loading}
            />
            {
                openaddposte && 
                <CreateOrganigramePoste
                    open={openaddposte}
                    onClose={(e)=> setshowconfirmmodal(false)}
                    submitdata={(data)=>submitdata(data)}
                />
            }
            {
                showconfirmmodal && 
                <DetailFichePoste
                    open={showconfirmmodal}
                    onClose={(e)=> setshowconfirmmodal(false)}
                    ficheRow={ficheRow}
                    validate={(data)=>submitdataconfirmation(data)}
                    thispostetosend={thispostetosend}
                />
            }
            
            <Dialog open={(open && !loading)} onClose={onClose}>
                <DialogContent dividers={true}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="blue"
                                sx={{ px: 2, py: 1, mt: 6, width: "80%" }}
                                onClick={setpostemodalopen}
                            >
                                <Typography color="white">
                                    Crée un poste
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h5" sx={{color: "blue.main", textTransform: "uppercase", textAlign: "center", fontWeight: "600", mb:2}}>FICHE métier</Typography>
                            {
                                !loading && 
                                <Card sx={{backgroundColor:"#fff", boxShadow:"unset"}}>
                                    <CardHeader
                                        title={ficheRow.titre}
                                        action={ 
                                            <Typography variant="h5" color={"#fff"} sx={{fontWeight: "600", mr:2}}>{rome.rome_coderome}</Typography>
                                        }
                                        sx={{backgroundColor: "#ea565a", color:"#fff", textAlign:"center" }}
                                    />
                                    <CardContent>
                                        <Accordion expanded={expanded === 'Emplois'} onChange={handleChangeaccord('Emplois')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{ minHeight:"unset" }}
                                            >
                                                <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                                Emplois
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid
                                                    sx={{ flexGrow: 1, m: 0, pt:0 }}
                                                    container
                                                    spacing={2}
                                                >
                                                    {appelation.map((emploi) => (
                                                        <Grid item xs={6} key={emploi.id} sx={{ paddingTop:"0px" }}>
                                                            <Typography sx={{color:"black.main", fontSize:"13px" }}>{emploi.emploiTitre}</Typography>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'Définition'} onChange={handleChangeaccord('Définition')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{ minHeight:"unset" }}
                                            >
                                                <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                                Définition
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid
                                                    sx={{ flexGrow: 1, m: 0 }}
                                                    container
                                                    spacing={2}
                                                >
                                                    {definition.map((definitionitem) => (
                                                        <Grid item xs={12} key={definitionitem}>
                                                            <Typography sx={{color:"black.main", fontSize:"13px" }}>{definitionitem}</Typography>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'Accès au métier'} onChange={handleChangeaccord('Accès au métier')} sx={{backgroundColor:"unset", boxShadow:"unset"}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{ minHeight:"unset" }}
                                            >
                                                <Typography sx={{ width: '100%', flexShrink: 0, color: "blue.main",borderBottom:"2px solid #004d80" }} variant="h6">
                                                Accès au métier
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid
                                                    sx={{ flexGrow: 1, m: 0 }}
                                                    container
                                                    spacing={2}
                                                >
                                                    {access.map((definitionitem) => (
                                                        <Grid item xs={12} key={definitionitem}>
                                                            <Typography sx={{color:"black.main", fontSize:"13px" }}>{definitionitem}</Typography>
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
                                                    Compétences
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
                                                    {"SAVOIRS FAIRE" in competanceaffiche ? (
                                                    <PartCompetanceShow
                                                        groupedData={competanceaffiche}
                                                        type={"SAVOIRS FAIRE"}
                                                        titre={"Savoir-faire"}
                                                    />
                                                    ) : null}
                                                    {"SAVOIRS" in competanceaffiche ? (
                                                    <PartCompetanceShow
                                                        groupedData={competanceaffiche}
                                                        type={"SAVOIRS"}
                                                        titre={"Savoirs"}
                                                    />
                                                    ) : null}
                                                    {"SAVOIR ÊTRE" in competanceaffiche ? (
                                                    <PartCompetanceShow
                                                        groupedData={competanceaffiche}
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
                                                {"CONDITIONS_TRAVAIL" in contextaffiche ? (
                                                <ContextTravailShow 
                                                    context={contextaffiche}
                                                    type={"CONDITIONS_TRAVAIL"}
                                                    titre={"Conditions de travail et risques professionnels"}
                                                />
                                                ) : null}
                                                {"HORAIRE_ET_DUREE_TRAVAIL" in contextaffiche ? (
                                                <ContextTravailShow 
                                                    context={contextaffiche}
                                                    type={"HORAIRE_ET_DUREE_TRAVAIL"}
                                                    titre={"Horaires et durée du travail"}
                                                />
                                                ) : null}
                                                {"TYPE_BENEFICIAIRE" in contextaffiche ? (
                                                <ContextTravailShow 
                                                    context={contextaffiche}
                                                    type={"TYPE_BENEFICIAIRE"}
                                                    titre={"Publics spécifiques"}
                                                />
                                                ) : null}
                                                {"TYPE_STRUCTURE_ACCUEIL" in contextaffiche ? (
                                                <ContextTravailShow 
                                                    context={contextaffiche}
                                                    type={"TYPE_STRUCTURE_ACCUEIL"}
                                                    titre={"Types de structures"}
                                                />
                                                ) : null}
                                                {"LIEU_ET_DEPLACEMENT" in contextaffiche ? (
                                                <ContextTravailShow 
                                                    context={contextaffiche}
                                                    type={"LIEU_ET_DEPLACEMENT"}
                                                    titre={"LIEU_ET_DEPLACEMENT"}
                                                />
                                                ) : null}
                                                {"Agrément - Réglementation du métier" in contextaffiche ? (
                                                    <ContextTravailShow 
                                                        context={contextaffiche}
                                                        type={"Agrément - Réglementation du métier"}
                                                        titre={"Agrément - Réglementation du métier"}
                                                    />
                                                ) : null}
                                                {"Conditions générales de travail" in contextaffiche ? (
                                                    <ContextTravailShow 
                                                        context={contextaffiche}
                                                        type={"Conditions générales de travail"}
                                                        titre={"Conditions générales de travail"}
                                                    />
                                                ) : null}
                                                {"Fiches - Instructions - Scripts à respecter" in contextaffiche ? (
                                                    <ContextTravailShow 
                                                        context={contextaffiche}
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
                            }
                            
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
        
    )
}

export default FicheMetierDetailModal