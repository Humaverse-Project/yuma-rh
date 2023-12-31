import HeaderGlobal from '../../header/HeaderGlobal'

import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { Card, Tooltip } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { CardItem } from '../../../shared'

//ICONES
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

function HomeScreen() {
    const theme = useTheme()

    return (
        <Fragment>
            <HeaderGlobal />
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
                    <NavLink to={'/personnehome'}>
                        <Tooltip
                            title="Liste de personne 
"
                            placement="top"
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
                                {CardItem(GroupsOutlinedIcon)}
                            </Card>
                        </Tooltip>
                    </NavLink>
                    <NavLink to={'/setting'}>
                        <Tooltip title="Organigramme" placement="top">
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
                                {CardItem(BuildOutlinedIcon)}
                            </Card>
                        </Tooltip>
                    </NavLink>
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
                    <NavLink to={'/propositionhome'}>
                        <Tooltip title="Evaluation" placement="top">
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
                                {CardItem(CloudOutlinedIcon)}
                            </Card>
                        </Tooltip>
                    </NavLink>

                    <NavLink to={'/store'}>
                        <Tooltip title="Store de formation" placement="top">
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
                                {CardItem(ShoppingBagOutlinedIcon)}
                            </Card>
                        </Tooltip>
                    </NavLink>
                </Box>
            </Box>
        </Fragment>
    )
}

export default HomeScreen
