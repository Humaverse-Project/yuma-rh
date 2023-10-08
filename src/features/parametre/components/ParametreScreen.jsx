import { Fragment } from 'react'
import { Box } from '@mui/system'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { CardItem } from '../../../shared'

//ICONES
import WorkIcon from '@mui/icons-material/Work'
import HeaderInScreen from '../../header/HeaderInScreen'
import DescriptionIcon from '@mui/icons-material/Description'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
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
                                    <AccountTreeIcon sx={{ fontSize: 92, color: 'black.main' }} />
                                </CardContent>
                            </CardActionArea>
                        </NavLink>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} width={"60%"}>
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
                    <NavLink to={'/metier'}>
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
                        </Card>
                    </NavLink>
                    <NavLink to={'/poste'}>
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
                            {CardItem(WorkIcon)}
                        </Card>
                    </NavLink>
                </Box>
            </Box>
        </Fragment>
    )
}

export default ParametreScreen
