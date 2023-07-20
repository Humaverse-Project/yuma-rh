import HeaderGlobal from '../../header/HeaderGlobal'

import { Column, MainScreen, Text } from '../../../shared'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import { CardItem } from './CardNavigation'

//ICONES
import BuildIcon from '@mui/icons-material/Build'
import CloudIcon from '@mui/icons-material/Cloud'
import GroupsIcon from '@mui/icons-material/Groups'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'

function HomeScreen() {
    const [divHeight, setDivHeight] = useState(0)

    useEffect(() => {
        const headerHeight = 110
        const remainingHeight = window.innerHeight - headerHeight
        setDivHeight(remainingHeight)
    }, [])

    const allNavLinkItems = [
        { id: 1, icon: GroupsIcon },
        { id: 2, icon: BuildIcon },
        { id: 3, icon: CloudIcon },
        { id: 4, icon: ShoppingBagIcon },
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
                        width: '25%',
                    }}
                >
                    {allNavLinkItems.map((navItem) => (
                        <Card
                            key={navItem.id}
                            sx={{
                                backgroundColor: 'secondary.dark',
                                m: 2,
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                            }}
                        >
                            {CardItem}
                        </Card>
                    ))}
                </Box>
            </Box>
        </MainScreen>
    )
}

export default HomeScreen
