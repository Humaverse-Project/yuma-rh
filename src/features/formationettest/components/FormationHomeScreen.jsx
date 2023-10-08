import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, CardActionArea } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import { DynamicHeadNav, Row } from '../../../shared'


//ICONES
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DashboardIcon from '@mui/icons-material/Dashboard';

function FormationHomeScreen() {
    const theme = useTheme()
    return (
        <Fragment>
            <Row justifyContent={'space-between'} px={3} height={'10vh'}>
            <DynamicHeadNav title={'Tests et Formations'} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'line',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Row marginLeft={3}>
                        <NavLink to={'/gestionformation'}>
                            <Button
                                sx={{
                                    backgroundColor: 'blue.main',
                                    color: 'white',
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1.5,
                                    '&:hover': {
                                        backgroundColor: 'blue.main',
                                    },
                                }}
                                variant="contained"
                            >
                                <DashboardIcon />
                                Gerer mes formation ou test
                            </Button>
                        </NavLink>
                    </Row>
                </Box>
            </Row>
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
                    <NavLink to={'/storeplus'}>
                        <CardActionArea sx={{ width: 150 }}>
                            <CardContent sx={{ p: 4 }}>
                                <LocalGroceryStoreIcon sx={{ fontSize: 92, color: 'black.main' }} />
                            </CardContent>
                        </CardActionArea>
                    </NavLink>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} width={"60%"}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Store
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default FormationHomeScreen
