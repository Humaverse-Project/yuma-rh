import { Badge, Box, Button } from '@mui/material'
import { Row, Text } from '../../../shared'
import { useTheme } from '@mui/material/styles'

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
            <Box
                key={item.id}
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
                        width: '18vw',
                    }}
                >
                    <Badge badgeContent={item.advanceProgram} color="primary">
                        <Button
                            variant="outlined"
                            sx={{
                                backgroundColor: 'secondary.dark',
                                py: 1,
                                borderColor:
                                    item.advanceProgram > 0
                                        ? 'primary'
                                        : '#F0F0F0',
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
                            borderColor: '#F0F0F0',
                        }}
                    >
                        <Text color="black.main">Evolutions</Text>
                    </Button>
                </Box>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.dark',
                display: 'flex',
                flexDirection: 'column',
                width: '60vw',
                borderRadius: '20px',
                p: 4,
                height: 'auto',
            }}
        >
            {AllPersonnalWithMetier.map((post) => {
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
