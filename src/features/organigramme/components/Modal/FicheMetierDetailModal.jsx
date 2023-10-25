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
import { getdataromeficheposte } from "../../../../services/MetierService"
import { postdata } from "../../../../services/OrganigrammeService"
import { fetchPoste } from '../../../../model/reducer/Organigramme';
import { useDispatch } from "react-redux";
import { CircularProgressElement } from '../../../../shared';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PartCompetanceShow from '../Part/PartCompetanceShow';
import ContextTravailShow from '../Part/ContextTravailShow';
import CreateOrganigramePoste from './CreateOrganigramePoste';
// 
const FicheMetierDetailModal = ({ open, onClose, ficheRow, nodeselected }) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [definition, setdefinition] = useState([]);
    const [access, setaccess] = useState([]);
    const [competance, setcompetance] = useState([]);
    const [context, setcontext] = useState({});
    const [extracontext, setextracontext] = useState({});
    const [mobilite, setmobilite] = useState({});

    const handleChangeaccord = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await getdataromeficheposte(ficheRow.rome.code);
                const reponsemetie = await datametierexistant;
                setData(reponsemetie);
                console.log(reponsemetie)
                setdefinition(reponsemetie.rome.rome_definition.split("\\n"));
                setaccess(reponsemetie.rome.rome_acces_metier.split("\\n"));
                setmobilite({
                    romeevolution: reponsemetie.rome.romeevolution,
                    romeproche: reponsemetie.rome.romeproche,
                  });
                setStatus(false);
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
                setcompetance(groupedData)
                const dataT = reponsemetie.briquecontexte;
                const groupedDataT = {};
                dataT.forEach((item) => {
                    const titre = item.contexte.ctxTrvTitre;
                    if (!groupedDataT[titre]) {
                        groupedDataT[titre] = [];
                    }
                    groupedDataT[titre].push(item);
                });
                setcontext(groupedDataT);
                const dataTR = ficheRow.briquecontextmetier;
                const groupedDataTR = {};
                dataTR.forEach((item) => {
                    const titre = item.contexttitre;
                    if (!groupedDataTR[titre]) {
                        groupedDataTR[titre] = [];
                    }
                    groupedDataTR[titre].push(item);
                });
                setextracontext(groupedDataTR)
            } catch (error) {
              console.log(error)
            }
        };
        fetchData();
    }, [ficheRow]);
    const dispatch = useDispatch();
    const [openaddposte, setopenaddposte] = useState(false)
    const setpostemodalopen = (e)=>{
        setopenaddposte(true)
    }
    const submitdata = (e)=>{
        console.log(e)
        setStatus(true)
        let parentNodeId = ""
        let personneid = ""
        if (nodeselected._id !== undefined) {
            parentNodeId = nodeselected._id
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
        postdata(thisposte)
        .then((reponsemetie) => {
            setStatus(false)
            dispatch(fetchPoste())
            setopenaddposte(false)
            onClose()
        })
        .catch((error) => {
            console.log(error);
            setStatus(false)
        });
    }
    return (
        <>
            <CircularProgressElement
                open={status}
            />
            {
                openaddposte && 
                <CreateOrganigramePoste
                    open={openaddposte}
                    onClose={(e)=> setopenaddposte(false)}
                    submitdata={(data)=>submitdata(data)}
                />
            }
            <Dialog open={open} onClose={onClose}>
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
                                !status && 
                                <Card sx={{backgroundColor:"#fff", boxShadow:"unset"}}>
                                    <CardHeader
                                        title={data.rome.nom}
                                        action={ 
                                            <Typography variant="h5" color={"#fff"} sx={{fontWeight: "600", mr:2}}>{data.rome.rome_coderome}</Typography>
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
                                                    {data.appelation.map((emploi) => (
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
                                                {"Agrément - Réglementation du métier" in extracontext ? (
                                                    <ContextTravailShow 
                                                        context={extracontext}
                                                        type={"Agrément - Réglementation du métier"}
                                                        titre={"Agrément - Réglementation du métier"}
                                                    />
                                                ) : null}
                                                {"Conditions générales de travail" in extracontext ? (
                                                    <ContextTravailShow 
                                                        context={extracontext}
                                                        type={"Conditions générales de travail"}
                                                        titre={"Conditions générales de travail"}
                                                    />
                                                ) : null}
                                                {"Fiches - Instructions - Scripts à respecter" in extracontext ? (
                                                    <ContextTravailShow 
                                                        context={extracontext}
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