import HeaderInScreen from '../../header/HeaderInScreen'

import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { Card, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { CardItem } from '../../../shared'

//ICONES
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'

function PersonneHomeScreen() {
    const theme = useTheme()
    return (
        <Fragment>
            <HeaderInScreen
                title={
                    'Employés - gérer les employés et prévoir les évolutions'
                }
            />
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height={'88vh'}
            >
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
                    <NavLink
                        to={'/gestionpersonnel'}
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                    >
                        <Card
                            sx={{
                                backgroundColor: 'secondary.dark',
                                m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                },
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    my: 1,
                                    mx: 0,
                                },
                            }}
                        >
                            {CardItem(AssignmentIndIcon)}
                            <Typography
                                sx={{
                                    mt: -4,
                                    flex: '1 0 auto',
                                    textAlign: 'center',
                                    color: 'black.main',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '1rem',
                                    },
                                }}
                                component="div"
                                variant="h6"
                            >
                                Gestion du
                                <br /> personnel
                            </Typography>
                        </Card>
                    </NavLink>
                    <NavLink
                        to={'/test'}
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                    >
                        <Card
                            sx={{
                                backgroundColor: 'secondary.dark',
                                m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                },
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    my: 1,
                                    mx: 0,
                                },
                            }}
                        >
                            {CardItem(ContentPasteSearchIcon)}
                            <Typography
                                sx={{
                                    mt: -4,
                                    flex: '1 0 auto',
                                    textAlign: 'center',
                                    color: 'black.main',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '1rem',
                                    },
                                }}
                                component="div"
                                variant="h6"
                            >
                                Test
                            </Typography>
                        </Card>
                    </NavLink>
                </Box>
            </Box>
        </Fragment>
    )
}

export default PersonneHomeScreen
