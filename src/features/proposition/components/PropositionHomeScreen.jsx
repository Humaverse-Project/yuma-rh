import HeaderInScreen from '../../header/HeaderInScreen'

import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { CardActionArea } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';

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
                    <NavLink to={'/propositionpage'}>
                        <CardActionArea sx={{ width: 150 }}>
                            <CardContent sx={{ p: 4 }}>
                                <ReceiptLongIcon sx={{ fontSize: 92, color: 'black.main' }} />
                            </CardContent>
                        </CardActionArea>
                    </NavLink>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} width={"60%"}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Forum
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default PropositionHomeScreen
