import { Fragment } from 'react'
import { Row, Text } from '../../../shared'
import HeaderInScreen from '../../header/HeaderInScreen'
import { Box, Button, Icon, LinearProgress, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PersonIcon from '@mui/icons-material/Person'
import { NavLink } from 'react-router-dom'

function LinearProgressWithLabel(props) {
    return (
        <Fragment>
            <Text variant="title">{props.label}</Text>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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

function ProfilScreen() {
    const theme = useTheme()
    const matcheLG = useMediaQuery(theme.breakpoints.down('lg'))
    const matcheXL = useMediaQuery(theme.breakpoints.down('xl'))

    return (
        <Fragment>
            <HeaderInScreen title="PROFIL" />
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    height: '90vh',
                    py: 3,
                    px: 5,
                    [theme.breakpoints.down('lg')]: {
                        px: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        [theme.breakpoints.down('md')]: {
                            flexDirection: 'column',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 0.5,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                            height: '80vh',
                            [theme.breakpoints.down('md')]: {
                                flexDirection: 'row',
                                mb: 4,
                                height: 'auto',
                            },
                            [theme.breakpoints.down('sm')]: {
                                flexDirection: 'column',
                                height: 'auto',
                                alignItems: 'center',
                                alignContent: 'center',
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="background"
                            sx={{
                                px: 6,
                                py: 1.5,
                                borderRadius: 2,
                                width: '100%',
                                mt: 3,
                                [theme.breakpoints.down('md')]: {
                                    mt: 0,
                                },
                            }}
                        >
                            <NavLink
                                to="/organigramme"
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                            >
                                <Text fontSize={18}>RETOUR</Text>
                            </NavLink>
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flex: 0.45,
                                [theme.breakpoints.down('md')]: {
                                    flexDirection: 'row',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    flexDirection: 'column',
                                    height: 'auto',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                },
                                [theme.breakpoints.up('xl')]: {
                                    flex: 0.38,
                                },
                            }}
                        >
                            <Button
                                variant="contained"
                                color="background"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: 2,
                                    width: '100%',
                                    [theme.breakpoints.down('sm')]: {
                                        mt: 2,
                                    },
                                }}
                            >
                                <Text fontSize={18}>
                                    Vérifier la compatibilité sur un poste
                                </Text>
                            </Button>
                            <Button
                                variant="contained"
                                color="background"
                                sx={{
                                    px: 6,
                                    py: 2.5,
                                    borderRadius: 2,
                                    width: '100%',
                                    [theme.breakpoints.down('sm')]: {
                                        mt: 2,
                                    },
                                }}
                            >
                                <Text fontSize={18}>Choisir une formation</Text>
                            </Button>
                            <Button
                                variant="contained"
                                color="background"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: 2,
                                    width: '100%',
                                    [theme.breakpoints.down('sm')]: {
                                        mt: 2,
                                        mb: 4,
                                    },
                                }}
                            >
                                <Text fontSize={18}>
                                    Formation déjà attribuées
                                </Text>
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 2.5,
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                mb: 5,
                            }}
                        >
                            <Icon
                                sx={{
                                    fontSize: 38,
                                    border: 1,
                                    borderColor: 'secondary.main',
                                    borderRadius: 2,
                                }}
                                component={ChevronLeftIcon}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 0.5,
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
                                    <Text variant="titleBold">
                                        Louis Dubrant
                                    </Text>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            [theme.breakpoints.down('lg')]: {
                                                flexDirection: ' column',
                                            },
                                        }}
                                    >
                                        <Text variant="normal">
                                            Assistant commercial junior
                                        </Text>
                                        <Text
                                            color="primary"
                                            textDecoration="underline"
                                            fontStyle="italic"
                                            ml={matcheLG ? 0 : 2}
                                        >
                                            Modifier
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                            <Icon
                                sx={{
                                    fontSize: 38,
                                    border: 1,
                                    borderColor: 'secondary.main',
                                    borderRadius: 2,
                                }}
                                component={ChevronRightIcon}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
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
                                    mt={2}
                                >
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        <Text variant={'titleBold'}>+</Text>
                                    </Button>
                                    <Text>2 autres compétences</Text>
                                </Row>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default ProfilScreen
