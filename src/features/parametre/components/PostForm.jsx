import { Fragment } from 'react'
import HeaderInScreen from '../../header/HeaderInScreen'
import { Box, Button, TextField, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'
import { Text } from '../../../shared'

export default function PostForm() {
    const theme = useTheme()
    const matcheXL = useMediaQuery(theme.breakpoints.down('xl'))
    return (
        <Fragment>
            <HeaderInScreen title="Paramètre" secondSubtitle="Ajout poste" />
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    height: 100 - 15 + 'vh',
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
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        [theme.breakpoints.down('lg')]: {
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                >
                    {/**Return button */}
                    <Button
                        variant="contained"
                        color="background"
                        sx={{
                            px: 6,
                            py: 1.5,
                            borderRadius: 2,
                            [theme.breakpoints.down('lg')]: {
                                my: 2,
                            },
                        }}
                    >
                        <NavLink
                            to="/setting"
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
                            alignItems: 'center',
                            flex: 1,
                            mx: 6,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            p: 2,
                        }}
                    >
                        <Text variant={'titleBold'} textAlign="center" mb={2}>
                            Nouveau poste
                        </Text>
                        <TextField
                            id="post-name"
                            label="Nom du poste"
                            variant="outlined"
                            sx={{ width: matcheXL ? '100%' : '50%', my: 1 }}
                        />
                        <TextField
                            id="post-description"
                            multiline
                            rows={6}
                            maxRows={Infinity}
                            label="Description du poste"
                            variant="outlined"
                            sx={{ width: matcheXL ? '100%' : '50%', my: 1 }}
                        />
                        <TextField
                            id="competence-required"
                            label="Compétence nécessaire pour ce poste"
                            variant="outlined"
                            sx={{ width: matcheXL ? '100%' : '50%', my: 1 }}
                        />
                        <Button
                            variant="outlined"
                            sx={{
                                mr: 1,
                                py: 1,
                                borderColor: 'primary',
                            }}
                        >
                            <Text color="primary" fontWeight="bold">
                                Sauvegarder
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}
