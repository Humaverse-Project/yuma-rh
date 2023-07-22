import { Box } from '@mui/material'
import { Text } from '../../../shared'

const AllPersonnalWithMetier = [
    {
        id: 1,
        name: 'Idriss ADARE',
        poste: 'Directeur commercial',
    },
    {
        id: 2,
        name: 'Philippine PLEBAT',
        poste: 'Commerciale',
    },
    {
        id: 3,
        name: 'Elsa PERON',
        poste: 'Assistante commerciale',
    },
    {
        id: 4,
        name: 'Louis DUBRANT',
        poste: 'Assistant commercial junior',
    },
    {
        id: 5,
        name: 'Lisa PERLANT',
        poste: 'Directrice générale',
    },
    {
        id: 6,
        name: 'Emma MAGOLOU',
        poste: 'Directrice RH',
    },
    {
        id: 7,
        name: 'Megane PONTIRO',
        poste: 'Directrice admin et juridique',
    },
    {
        id: 8,
        name: 'David PER',
        poste: 'Développeur front-end',
    },
    {
        id: 9,
        name: 'Fernando ',
        poste: 'Stagiaire développeur front-end',
    },
    {
        id: 10,
        name: 'Joseph DUBRANT',
        poste: 'Designer',
    },
]

function MetierList() {
    const renderPostItem = (item) => {
        return (
            <Box
                key={item.id}
                sx={{
                    border: 2,
                    borderColor: 'blue.main',
                    px: 2,
                    py: 1,
                    mb: 2,
                }}
            >
                <Text>{item.name}</Text>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.dark',
                display: 'flex',
                flexDirection: 'column',
                width: '70vw',
                borderRadius: '20px',
                p: 4,
                height: 'auto',
            }}
        >
            {AllPersonnalWithMetier.map((post) => {
                return renderPostItem(post)
            })}
        </Box>
    )
}

export default MetierList
