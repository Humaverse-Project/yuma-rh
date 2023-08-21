import HeaderInScreen from '../../header/HeaderInScreen'

import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { Card } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { CardActionArea } from '@mui/material'
import CardContent from '@mui/material/CardContent'

//ICONES
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

function PropositionHomeScreen() {
    const theme = useTheme()
    return (
        <Fragment>
            <HeaderInScreen
                title={"Proposer et évaluer des modifications"}
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
                            <CardActionArea>
                                <CardContent sx={{ p: 4 }}>
                                    <ReceiptLongIcon sx={{ fontSize: 92, color: 'black.main' }} />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </NavLink>
                </Box>
            </Box>
        </Fragment>
    )
}

export default PropositionHomeScreen
