import HeaderInScreen from '../../header/HeaderInScreen'

import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { Card } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { CardItem } from '../../../shared'

//ICONES
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function PersonneHomeScreen() {
    const theme = useTheme()
    return (
        <Fragment>
            <HeaderInScreen
                title={'Employés - gérer les employés et prévoir les évolutions'}
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
                    <NavLink to={'/gestionpersonnel'}>
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
                        </Card>
                    </NavLink>
                    <NavLink to={'/test'}>
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
                        </Card>
                    </NavLink>
                </Box>
            </Box>
        </Fragment>
    )
}

export default PersonneHomeScreen
