import HeaderInScreen from '../../header/HeaderInScreen'
import { Fragment, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import { formation, salarie } from './variable.js';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

function PlaningFormationScreen() {
    const theme = useTheme()
    const data = {formations: formation, salaries: salarie}
    const [formationsFiltrees, setFormationsFiltrees] = useState(data.formations);
    const [salariesFiltres, setSalariesFiltres] = useState(data.salaries);

    // Récupération de toutes les dates uniques
    const [datesUniques, setdatesUniques] = useState(data.formations.reduce((dates, formation) => {
        if (!dates.includes(formation.date_heure_debut)) {
        dates.push(formation.date_heure_debut);
        }
        return dates;
    }, []));

    const [filtres, setFiltres] = useState({
        enCours: false,
        valides: false,
        planifies: false,
        avecFormation: false,
        sansFormation: false,
        dateDebut: '',
        dateFin: '',
    });
    
    const handleFiltresChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFiltres((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };
    
    const filtrerDonnees = () => {
        
        let formationsFiltrees = data.formations.filter((formation) => {
            if( filtres.enCours && formation.type_formation === "en cours"){
                return true
            } else if(filtres.valides && formation.type_formation === 'validée'){
                return true
            } else if(filtres.planifies && formation.type_formation === 'planifiée'){
                return true
            } else if(!filtres.enCours && !filtres.valides && !filtres.planifies){
                return true
            }
            return false
        });
    
        if (filtres.dateDebut && filtres.dateFin) {
          const dateDebutFiltre = new Date(filtres.dateDebut);
          const dateFinFiltre = new Date(filtres.dateFin);
    
          formationsFiltrees = formationsFiltrees.filter((formation) => {
            const dateDebut = new Date(formation.date_heure_debut);
            return dateDebut >= dateDebutFiltre && dateDebut <= dateFinFiltre;
          });
        }
    
        const salariesFiltres = data.salaries.filter((salarie) => {
            if( filtres.avecFormation && salarie.formations_suivies.length > 0){
                return true
            } else if(filtres.sansFormation && salarie.formations_suivies.length === 0){
                return true
            } else if(!filtres.sansFormation && !filtres.sansFormation){
                return true
            }
            return false
        });
    
        // Utilisez les données filtrées comme vous le souhaitez (affichage dans le tableau, etc.)
        console.log(formationsFiltrees, salariesFiltres);
    
        // Ici, nous pouvons stocker les données filtrées dans des états pour mettre à jour l'affichage dans le tableau
        setFormationsFiltrees(formationsFiltrees);
        setSalariesFiltres(salariesFiltres);
    };

    return (
        <Fragment>
            <HeaderInScreen
                title={'Planing des formations et tests'}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                flexDirection="row"
                sx={{
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
                justifyContent="space-between"
                alignItems="flex-start"
                minHeight="80vh"
            >
                <div>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        [theme.breakpoints.down('sm')]: {
                            justifyContent: 'center',
                        },
                        alignItems: 'center',
                    }}
                >
                    <Card sx={{ display: 'flex', width: "auto", m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                },
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    my: 1,
                                    mx: 0,
                                }
                            }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography component="div" variant="h5">
                                            Afficher les formations
                                        </Typography>
                                        <FormControlLabel control={
                                            <Checkbox
                                                name="enCours"
                                                checked={filtres.enCours}
                                                onChange={handleFiltresChange}
                                                color="default"
                                                
                                            />
                                        } label="en cours" />
                                        <FormControlLabel control={
                                            <Checkbox
                                                name="valides"
                                                checked={filtres.valides}
                                                onChange={handleFiltresChange}
                                                color="default"
                                            />
                                        } label="validées" />
                                        <FormControlLabel control={
                                            <Checkbox
                                                name="planifies"
                                                checked={filtres.planifies}
                                                onChange={handleFiltresChange}
                                                color="default"
                                            />
                                        } label="planifiées" />
                                    </Grid>
                                    <Grid item xs={6}>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="div" variant="h5">
                                            Afficher les salariés
                                        </Typography>
                                        <FormGroup>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    name="avecFormation"
                                                    checked={filtres.avecFormation}
                                                    onChange={handleFiltresChange}
                                                    color="default"
                                                />
                                            } label="avec formation" />
                                            <FormControlLabel control={
                                                <Checkbox
                                                name="sansFormation"
                                                checked={filtres.sansFormation}
                                                onChange={handleFiltresChange}
                                                    color="default"
                                                />
                                            } label="sans formation" />
                                            
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label>
                                            Date de début :
                                            <input
                                                type="date"
                                                name="dateDebut"
                                                value={filtres.dateDebut}
                                                onChange={handleFiltresChange}
                                            />
                                            </label>
                                            <label>
                                            Date de fin :
                                            <input
                                                type="date"
                                                name="dateFin"
                                                value={filtres.dateFin}
                                                onChange={handleFiltresChange}
                                            />
                                        </label>
                                    </Grid>
                                </Grid>
                                    <button onClick={filtrerDonnees}>Recherche</button>
                                </CardContent>
                            </Box>
                    </Card>
                </Box>
                    <table>
                        <thead>
                        <tr>
                            <th>Salarié</th>
                            {datesUniques.map((date, index) => (
                            <th key={index}>{new Date(date).toLocaleDateString()}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                            {salariesFiltres.map((salarie) => (
                                <tr key={salarie.id}>
                                <td>{salarie.nom_salarie}</td>
                                {datesUniques.map((date, index) => {
                                    const formation = formationsFiltrees.find(
                                    (formation) =>
                                        formation.date_heure_debut === date &&
                                        salarie.formations_suivies.includes(formation.id)
                                    );

                                    let cellStyle = {};

                                    if (formation) {
                                    if (formation.type_formation === "en cours") {
                                        cellStyle.backgroundColor = "green";
                                    } else if (formation.type_formation === "validée") {
                                        cellStyle.backgroundColor = "orange";
                                    } else {
                                        cellStyle.backgroundColor = "grey";
                                    }
                                    }

                                    return (
                                    <td key={index} style={cellStyle}>
                                        {formation ? formation.nom_formation : '-'}
                                    </td>
                                    );
                                })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Box>
        </Fragment>
        
    );
}
export default PlaningFormationScreen