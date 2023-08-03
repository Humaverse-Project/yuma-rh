import HeaderInScreen from '../../header/HeaderInScreen'
import { Fragment, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { formation, salarie } from './variable.js'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './tablestyle.css'

function PlaningFormationScreen() {
    const theme = useTheme()
    const data = {
        formations: formation,
        salaries: salarie,
        dateunique: formation.reduce((dates, formation) => {
            if (!dates.includes(formation.date_heure_debut)) {
                dates.push(formation.date_heure_debut)
            }
            return dates
        }, []),
    }
    const [formationsFiltrees, setFormationsFiltrees] = useState(
        data.formations
    )
    const [salariesFiltres, setSalariesFiltres] = useState(data.salaries)

    // Récupération de toutes les dates uniques
    const [datesUniques, setdatesUniques] = useState(data.dateunique)

    const [filtres, setFiltres] = useState({
        enCours: false,
        valides: false,
        planifies: false,
        testenCours: false,
        testvalides: false,
        testplanifies: false,
        avecFormation: false,
        sansFormation: false,
        dateDebut: '',
        dateFin: '',
    })

    const handleFiltresChange = (event) => {
        console.log(event)
        const { name, value, type, checked } = event.target
        const newValue = type === 'checkbox' ? checked : value
        setFiltres((prevState) => ({
            ...prevState,
            [name]: newValue,
        }))
    }
    const handledateDebutFiltresChange = (value) => {
        const newValue = value.$d
        setFiltres((prevState) => ({
            ...prevState,
            dateDebut: newValue,
        }))
    }
    const handledatefinFiltresChange = (value) => {
        const newValue = value.$d
        setFiltres((prevState) => ({
            ...prevState,
            dateFin: newValue,
        }))
    }

    const filtrerDonnees = () => {
        let formationsFiltrees = data.formations.filter((formation) => {
            if (filtres.enCours && formation.type_formation === 'en cours') {
                return true
            } else if (
                filtres.valides &&
                formation.type_formation === 'validée'
            ) {
                return true
            } else if (
                filtres.planifies &&
                formation.type_formation === 'planifiée'
            ) {
                return true
            } else if (
                !filtres.enCours &&
                !filtres.valides &&
                !filtres.planifies
            ) {
                return true
            }
            return false
        })

        if (filtres.dateDebut && filtres.dateFin) {
            const dateDebutFiltre = filtres.dateDebut
            const dateFinFiltre = filtres.dateFin

            formationsFiltrees = formationsFiltrees.filter((formation) => {
                const dateDebut = new Date(formation.date_heure_debut)
                return (
                    dateDebut >= dateDebutFiltre && dateDebut <= dateFinFiltre
                )
            })
        }

        const salariesFiltres = data.salaries.filter((salarie) => {
            if (
                filtres.avecFormation &&
                salarie.formations_suivies.length > 0
            ) {
                return true
            } else if (
                filtres.sansFormation &&
                salarie.formations_suivies.length === 0
            ) {
                return true
            } else if (!filtres.sansFormation && !filtres.sansFormation) {
                return true
            }
            return false
        })

        // Utilisez les données filtrées comme vous le souhaitez (affichage dans le tableau, etc.)
        console.log(formationsFiltrees, salariesFiltres)

        // Ici, nous pouvons stocker les données filtrées dans des états pour mettre à jour l'affichage dans le tableau
        setFormationsFiltrees(formationsFiltrees)
        setSalariesFiltres(salariesFiltres)
        setdatesUniques(
            formationsFiltrees.reduce((dates, formation) => {
                if (!dates.includes(formation.date_heure_debut)) {
                    dates.push(formation.date_heure_debut)
                }
                return dates
            }, [])
        )
    }

    return (
        <Fragment>
            <HeaderInScreen title={'Planing des formations et tests'} />
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
                        <Card
                            sx={{
                                display: 'flex',
                                width: 'auto',
                                m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                    width: '70%',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    my: 1,
                                    mx: 0,
                                    width: '100%',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        flex: '1 0 auto',
                                        color: 'black.main',
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography component="div">
                                                <b>Afficher les formations</b>
                                            </Typography>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="enCours"
                                                        checked={
                                                            filtres.enCours
                                                        }
                                                        onChange={
                                                            handleFiltresChange
                                                        }
                                                        color="default"
                                                    />
                                                }
                                                label="en cours"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="valides"
                                                        checked={
                                                            filtres.valides
                                                        }
                                                        onChange={
                                                            handleFiltresChange
                                                        }
                                                        color="default"
                                                    />
                                                }
                                                label="validées"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="planifies"
                                                        checked={
                                                            filtres.planifies
                                                        }
                                                        onChange={
                                                            handleFiltresChange
                                                        }
                                                        color="default"
                                                    />
                                                }
                                                label="planifiées"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="div">
                                                <b>Afficher les tests</b>
                                            </Typography>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="enCours"
                                                        checked={
                                                            filtres.testenCours
                                                        }
                                                        onChange={
                                                            handleFiltresChange
                                                        }
                                                        color="default"
                                                    />
                                                }
                                                label="en cours"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="valides"
                                                        checked={
                                                            filtres.testvalides
                                                        }
                                                        onChange={
                                                            handleFiltresChange
                                                        }
                                                        color="default"
                                                    />
                                                }
                                                label="validées"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="planifies"
                                                        checked={
                                                            filtres.testplanifies
                                                        }
                                                        onChange={
                                                            handleFiltresChange
                                                        }
                                                        color="default"
                                                    />
                                                }
                                                label="planifiées"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component="div">
                                                <b>Afficher les salariés</b>
                                            </Typography>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="avecFormation"
                                                            checked={
                                                                filtres.avecFormation
                                                            }
                                                            onChange={
                                                                handleFiltresChange
                                                            }
                                                            color="default"
                                                        />
                                                    }
                                                    label="avec formation"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="sansFormation"
                                                            checked={
                                                                filtres.sansFormation
                                                            }
                                                            onChange={
                                                                handleFiltresChange
                                                            }
                                                            color="default"
                                                        />
                                                    }
                                                    label="sans formation"
                                                />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography component="div">
                                                <b>
                                                    <br />
                                                </b>
                                            </Typography>
                                            <FormGroup>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <DatePicker
                                                        label="De la date"
                                                        name="dateDebut"
                                                        onChange={
                                                            handledateDebutFiltresChange
                                                        }
                                                        size="small"
                                                        format="DD-MM-YYYY"
                                                        slotProps={{
                                                            textField: {
                                                                size: 'small',
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <DatePicker
                                                        label="A la date"
                                                        name="dateFin"
                                                        onChange={
                                                            handledatefinFiltresChange
                                                        }
                                                        size="small"
                                                        format="DD-MM-YYYY"
                                                        slotProps={{
                                                            textField: {
                                                                size: 'small',
                                                            },
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    width: 'auto',
                                                    m: 2,
                                                    [theme.breakpoints.up(
                                                        'lg'
                                                    )]: {
                                                        pt: 6,
                                                    },
                                                    [theme.breakpoints.down(
                                                        'sm'
                                                    )]: {
                                                        width: '100%',
                                                        my: 1,
                                                        mx: 0,
                                                    },
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    onClick={filtrerDonnees}
                                                    color="blue"
                                                >
                                                    Recherche
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Box>
                        </Card>
                    </Box>
                    <TableContainer
                        className="table-container"
                        component={Paper}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow className="table-header-row">
                                    <TableCell
                                        className="table-cell-first-prime cell-header"
                                        p={10}
                                        width="150px"
                                    >
                                        Salarié
                                    </TableCell>

                                    {datesUniques.map((date, index) => (
                                        <TableCell
                                            className="table-cell cell-header"
                                            key={index}
                                        >
                                            {new Date(
                                                date
                                            ).toLocaleDateString()}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {salariesFiltres.map((salarie) => (
                                    <TableRow key={salarie.id}>
                                        <TableCell
                                            className="table-cell-first table-cell"
                                            p={10}
                                        >
                                            {salarie.nom_salarie}
                                        </TableCell>
                                        {datesUniques.map((date, index) => {
                                            const formation =
                                                formationsFiltrees.find(
                                                    (formation) =>
                                                        formation.date_heure_debut ===
                                                            date &&
                                                        salarie.formations_suivies.includes(
                                                            formation.id
                                                        )
                                                )

                                            let cellStyle = {}

                                            if (formation) {
                                                if (
                                                    formation.type_formation ===
                                                    'en cours'
                                                ) {
                                                    cellStyle.backgroundColor =
                                                        'green'
                                                } else if (
                                                    formation.type_formation ===
                                                    'validée'
                                                ) {
                                                    cellStyle.backgroundColor =
                                                        'orange'
                                                } else {
                                                    cellStyle.backgroundColor =
                                                        'grey'
                                                }
                                            }

                                            return (
                                                <TableCell
                                                    className="table-cell"
                                                    key={index}
                                                    style={cellStyle}
                                                >
                                                    {formation
                                                        ? formation.nom_formation
                                                        : ''}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </Fragment>
    )
}
export default PlaningFormationScreen
