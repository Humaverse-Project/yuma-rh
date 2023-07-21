import HeaderGlobal from '../../header/HeaderGlobal'

import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment, useEffect, useState } from 'react'
import { Card, useMediaQuery } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { CardItem } from './CardNavigation'

//ICONES
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

function HomeScreen() {
    const [divHeight, setDivHeight] = useState(0)
    const theme = useTheme()

    useEffect(() => {
        const headerHeight = 110
        const remainingHeight = window.innerHeight - headerHeight
        setDivHeight(remainingHeight)
    }, [])

    const allNavLinkItems = [
        { id: 1, icon: GroupsOutlinedIcon, link: 'test' },
        { id: 2, icon: BuildOutlinedIcon, link: 'test' },
        { id: 3, icon: CloudOutlinedIcon, link: 'test' },
        { id: 4, icon: ShoppingBagOutlinedIcon, link: 'test' },
    ]

    return (
        <Fragment>
            <HeaderGlobal />
            <Box backgroundColor="background.paper" height={'88vh'}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        [theme.breakpoints.down('md')]: {
                            width: '100vw',
                        },
                        [theme.breakpoints.between('md', 'xl')]: {
                            width: '100vw',
                        },
                        [theme.breakpoints.up('xl')]: {
                            width: '30%',
                        },
                    }}
                >
                    {/*allNavLinkItems.map((navItem) => (
                        <NavLink to={navItem.link}>
                            <Card
                                key={navItem.id}
                                sx={{
                                    backgroundColor: 'secondary.dark',
                                    m: 2,
                                    [theme.breakpoints.up('desktop')]: {
                                        m: 4,
                                    },
                                    boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                    [theme.breakpoints.down('tablet')]: {
                                        width: '100%',
                                    },
                                }}
                            >
                                {CardItem(navItem.icon)}
                            </Card>
                        </NavLink>
                    ))*/}
                </Box>
            </Box>
        </Fragment>
    )
}

export default HomeScreen
