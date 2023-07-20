import HeaderGlobal from '../../header/HeaderGlobal'

import { MainScreen } from '../../../shared'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Card } from '@mui/material'
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
        <MainScreen mx={0} px={0}>
            <HeaderGlobal />
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                justifyContent="center"
                alignItems="center"
                height={divHeight}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        [theme.breakpoints.down('laptop')]: {
                            width: '60%',
                        },
                        [theme.breakpoints.between('laptop', 'desktop')]: {
                            width: '50%',
                        },
                        [theme.breakpoints.up('laptop')]: {
                            width: '30%',
                        },
                    }}
                >
                    {allNavLinkItems.map((navItem) => (
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
                    ))}
                </Box>
            </Box>
        </MainScreen>
    )
}

export default HomeScreen
