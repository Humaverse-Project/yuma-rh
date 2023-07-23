import { Fragment } from 'react'
import { Text } from '../../../shared'
import HeaderInScreen from '../../header/HeaderInScreen'
import { Box, Button, Icon, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PersonIcon from '@mui/icons-material/Person'

function ProfilScreen() {
    const theme = useTheme()
    const matcheLG = useMediaQuery(theme.breakpoints.down('lg'))

    return (
        <Fragment>
            <HeaderInScreen title="PROFIL" />
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    height: '88vh',
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
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 0.5,
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="background"
                            sx={{
                                px: 6,
                                py: 1,
                                borderRadius: 2,
                                width: '100%',
                            }}
                        >
                            <Text>Retour</Text>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 2.5,
                            justifyContent: 'space-around',
                            alignItems: 'center',
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
                                <Text variant="titleBold">Louis Dubrant</Text>
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
                                        ml={matcheLG ? 0 : 1}
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
                </Box>
            </Box>
        </Fragment>
    )
}

export default ProfilScreen
