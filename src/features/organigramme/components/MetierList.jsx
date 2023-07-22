import { Badge, Box, Button } from '@mui/material'
import { Row, Text } from '../../../shared'
import { useTheme } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'

const AllPersonnalWithMetier = [
    {
        id: 1,
        name: 'Idriss ADARE',
        poste: 'Directeur commercial',
        advanceProgram: 0,
    },
    {
        id: 2,
        name: 'Philippine PLEBAT',
        poste: 'Commerciale',
        advanceProgram: 3,
    },
    {
        id: 3,
        name: 'Elsa PERON',
        poste: 'Assistante commerciale',
        advanceProgram: 0,
    },
    {
        id: 4,
        name: 'Louis DUBRANT',
        poste: 'Assistant commercial junior',
        advanceProgram: 0,
    },
    {
        id: 5,
        name: 'Lisa PERLANT',
        poste: 'Directrice générale',
        advanceProgram: 0,
    },
    {
        id: 6,
        name: 'Emma MAGOLOU',
        poste: 'Directrice RH',
        advanceProgram: 0,
    },
    {
        id: 7,
        name: 'Megane PONTIRO',
        poste: 'Directrice admin et juridique',
        advanceProgram: 0,
    },
    {
        id: 8,
        name: 'David PER',
        poste: 'Développeur front-end',
        advanceProgram: 0,
    },
    {
        id: 9,
        name: 'Fernando ',
        poste: 'Stagiaire développeur front-end',
        advanceProgram: 0,
    },
    {
        id: 10,
        name: 'Joseph DUBRANT',
        poste: 'Designer',
        advanceProgram: 0,
    },
]

function MetierList({ textToSearch }) {
    const theme = useTheme()
    const renderPostItem = (item) => {
        return (
            <NavLink
                key={item.id}
                to="/profile"
                style={{ textDecoration: 'none' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: 2,
                        borderColor: 'blue.main',
                        borderRadius: 4,
                        px: 3,
                        py: 2,
                        mb: 2,
                        backgroundColor: '#F8FBF1',
                        [theme.breakpoints.down('md')]: {
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Text variant={'normalBold'}>{item.name}</Text>
                        <Text variant={'normal'} color={'secondary.main'}>
                            {item.poste}
                        </Text>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down('lg')]: {
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                width: '100%',
                            },
                            [theme.breakpoints.down('md')]: {
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            },
                        }}
                    >
                        <Badge
                            badgeContent={item.advanceProgram}
                            color="primary"
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    backgroundColor: 'secondary.dark',
                                    mr: 1,
                                    py: 1,
                                    borderColor:
                                        item.advanceProgram > 0
                                            ? 'primary'
                                            : '#F0F0F0',
                                    [theme.breakpoints.down('lg')]: {
                                        mr: 0,
                                    },
                                }}
                            >
                                <Text color="black.main">
                                    Formations programmées
                                </Text>
                            </Button>
                        </Badge>
                        <Button
                            variant="outlined"
                            sx={{
                                backgroundColor: 'secondary.dark',
                                py: 1,
                                ml: 1,
                                borderColor: '#F0F0F0',
                                [theme.breakpoints.down('lg')]: {
                                    ml: 0,
                                },
                            }}
                        >
                            <Text color="black.main">Evolutions</Text>
                        </Button>
                    </Box>
                </Box>
            </NavLink>
        )
    }

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.dark',
                display: 'flex',
                flexDirection: 'column',
                width: '90%',
                borderRadius: '20px',
                p: 4,
                height: 'auto',
            }}
        >
            {AllPersonnalWithMetier.filter(
                (item) =>
                    item.name
                        .toLowerCase()
                        .includes(textToSearch.toLowerCase()) ||
                    item.poste
                        .toLowerCase()
                        .includes(textToSearch.toLowerCase())
            ).map((post) => {
                return renderPostItem(post)
            })}
            <Row justifyContent="space-between" width={'14vw'} mt={2}>
                <Button variant="outlined" color="secondary" width={10}>
                    <Text variant={'titleBold'}>+</Text>
                </Button>
                <Text>Voir les métiers similaires</Text>
            </Row>
        </Box>
    )
}

export default MetierList
