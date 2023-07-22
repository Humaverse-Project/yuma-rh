import { Fragment } from 'react'
import { Text } from '../../../shared'
import HeaderInScreen from '../../header/HeaderInScreen'
import { Box } from '@mui/material'

function ProfilScreen() {
    return (
        <Fragment>
            <HeaderInScreen title="PROFIL" />
            <Box sx={{ backgroundColor: 'background.paper', height: '88vh' }}>
                <Text>Profile screen</Text>
            </Box>
        </Fragment>
    )
}

export default ProfilScreen
