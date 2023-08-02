import HeaderInScreen from '../../header/HeaderInScreen'
import { Fragment } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

import { data } from './variable.js';

function PlaningFormationScreen() {
    const theme = useTheme()

    return (
        <Fragment>
            <HeaderInScreen
                title={'Planing des formations et tests'}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                flexDirection="row"
                sx={{
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
                justifyContent="space-between"
                alignItems="flex-start"
                minHeight="80vh"
                py={6}
                px={4}
            >
                
            </Box>
        </Fragment>
    )
}
export default PlaningFormationScreen