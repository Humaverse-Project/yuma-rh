import { Fragment } from 'react'
import { Row, Text } from '../../../shared'
import HeaderInScreen from '../../header/HeaderInScreen'
import { Box, Button, Icon, LinearProgress, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'

function LinearProgressWithLabel(props) {
    return (
        <Fragment>
            <Text variant="title">{props.label}</Text>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        color="success"
                        sx={{
                            color: 'success',
                        }}
                        {...props}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Text variant="normalBold" color="black">{`${Math.round(
                        props.value
                    )}%`}</Text>
                </Box>
            </Box>
        </Fragment>
    )
}

function ManageCompetence() {
    const theme = useTheme()
    const matcheXL = useMediaQuery(theme.breakpoints.down('xl'))

    return (
        <Fragment>
            <HeaderInScreen title="PROFIL" />
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    height: 100 - 15 + 'vh',
                    py: 3,
                    px: 5,
                    display: 'flex',
                    [theme.breakpoints.down('lg')]: {
                        px: 2,
                        flexDirection: 'column',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flex: 3,
                        flexDirection: 'column',
                    }}
                >
                    {/**profil section */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 5,
                        }}
                    >
                        <Icon
                            sx={{
                                fontSize: 100,
                                border: 1,
                                borderColor: 'blue.main',
                                borderRadius: 2,
                            }}
                            component={PersonIcon}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                ml: 3,
                            }}
                        >
                            <Text variant="titleBold">Louis Dubrant</Text>
                            <Text variant="normal">
                                Assistant commercial junior
                            </Text>
                        </Box>
                    </Box>
                    {/**Competence section */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            [theme.breakpoints.down('md')]: {
                                alignItems: 'center',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: '85%',
                                border: 2,
                                borderColor: 'secondary.dark',
                                borderRadius: 6,
                                backgroundColor: 'white',
                                p: 5,
                            }}
                        >
                            <Box>
                                <LinearProgressWithLabel
                                    label="Communication"
                                    value={58}
                                />
                                <LinearProgressWithLabel
                                    label="Répondre aux appels téléphoniques"
                                    value={52}
                                />
                                <LinearProgressWithLabel
                                    label="Gérer les dossiers clients et fournisseurs"
                                    value={37}
                                />
                                <LinearProgressWithLabel
                                    label="Gestion de stress"
                                    value={31}
                                />
                            </Box>
                            <Row
                                justifyContent="space-between"
                                width={matcheXL ? '100%' : '14vw'}
                                mt={matcheXL ? 0 : 2}
                            >
                                <Button variant="outlined" color="secondary">
                                    <Text variant={'titleBold'}>+</Text>
                                </Button>
                                <Text>2 autres compétences</Text>
                            </Row>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <Text variant="normal" color="secondary.main">
                        Choisissez une compétences
                    </Text>
                </Box>
            </Box>
        </Fragment>
    )
}

export default ManageCompetence
