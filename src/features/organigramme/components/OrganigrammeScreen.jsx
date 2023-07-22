import { Fragment, useState } from 'react'
import HeaderInScreen from '../../header/HeaderInScreen'
import { useTheme } from '@mui/material/styles'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import './Organigramme.css'

const OrganigrammeNode = ({ data }) => (
    <Box
        className="node"
        p={2}
        m={1}
        border={1}
        borderColor="primary.main"
        borderRadius={4}
    >
        <Box>
            <Typography variant="h6" color="primary">
                {data.name}
            </Typography>
        </Box>
        <Box>
            <Typography variant="body1" color="textSecondary">
                {data.position}
            </Typography>
        </Box>
        {data.children && (
            <Box display="flex" flexDirection="row" mt={2}>
                {data.children.map((child) => (
                    <OrganigrammeNode key={child.name} data={child} />
                ))}
            </Box>
        )}
    </Box>
)

const organigrammeData = {
    name: 'PDG',
    position: 'CEO',
    children: [
        {
            name: 'Responsable RH',
            position: 'Responsable RH',
            children: [
                {
                    name: 'Gestion du personnel',
                    position: 'Manager',
                    children: [
                        {
                            name: 'Gestion des performances',
                            position: 'Superviseur',
                            children: [
                                { name: 'Formation', position: 'Formateur' },
                                {
                                    name: 'Avantages sociaux',
                                    position:
                                        'Responsable des avantages sociaux',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Recrutement',
                    position: 'Manager',
                    children: [
                        {
                            name: 'Gestion des talents',
                            position: 'Chasseur de têtes',
                            children: [
                                {
                                    name: 'Sourcing',
                                    position: 'Chargé de sourcing',
                                },
                                {
                                    name: 'Entretiens',
                                    position: 'Responsable des entretiens',
                                },
                            ],
                        },
                        {
                            name: 'Relations avec les candidats',
                            position: 'Recruteur',
                        },
                    ],
                },
            ],
        },
    ],
}

function OrganigrammeScreen() {
    const theme = useTheme()
    const [textToSearh, setTextToSearh] = useState()
    return (
        <Fragment>
            <HeaderInScreen
                title={'Organigramme'}
                secondSubtitle={textToSearh && 'Recherche'}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                flexDirection="row"
                sx={{
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                    },
                }}
                justifyContent="center"
                alignItems="flex-start"
                minHeight="88vh"
                py={6}
            >
                <Box>
                    <TextField
                        id="outlined-basic"
                        value={textToSearh}
                        onChange={(e) => setTextToSearh(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    <FormGroup sx={{ ml: 2, mt: 1 }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="PERSONNEL"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="METIER"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="COMPETENCE"
                        />
                    </FormGroup>
                </Box>
                <Box className="organigramme">
                    <OrganigrammeNode data={organigrammeData} />
                </Box>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
