import { Fragment } from 'react'
import { Box } from '@mui/system'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { CardItem } from '../../../shared'

//ICONES
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import HeaderInScreen from '../../header/HeaderInScreen'
import DescriptionIcon from '@mui/icons-material/Description'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
function ParametreScreen() {
    const theme = useTheme()

    return (
        <Fragment>
            <HeaderInScreen title={'Paramètre'} />
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
                        backgroundColor: 'secondary.dark',
                        m: 2,
                        [theme.breakpoints.up('lg')]: {
                            m: 4,
                            width: '60ch',
                        },
                        boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                            my: 1,
                            mx: 0,
                        },
                    }}
                >
                    <NavLink to={'/organigramme'}>
                        <CardActionArea sx={{ width: 150 }}>
                            <CardContent sx={{ p: 4 }}>
                                <AccountTreeIcon
                                    sx={{ fontSize: 92, color: 'black.main' }}
                                />
                            </CardContent>
                        </CardActionArea>
                    </NavLink>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column' }}
                        width={'60%'}
                    >
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Organigramme
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
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
                        to={'/metier'}
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
                            {CardItem(DescriptionIcon)}

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
                                Metier
                            </Typography>
                        </Card>
                    </NavLink>
                    <NavLink
                        to={'/poste'}
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
                            {CardItem(PersonOutlineIcon)}
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
                                Poste
                            </Typography>
                        </Card>
                    </NavLink>
                </Box>
            </Box>
        </Fragment>
    )
}

export default ParametreScreen
