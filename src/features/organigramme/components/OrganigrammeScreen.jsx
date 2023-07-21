import { Box } from '@mui/system'
import { Fragment } from 'react'
import { Text } from '../../../shared'
import HeaderInScreen from '../../header/HeaderInScreen'

//ICONES

function OrganigrammeScreen() {
    return (
        <Fragment>
            <HeaderInScreen title={'Organigramme'} />
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height={'88vh'}
            >
                <Text variant={'h1'} color="blue.main">
                    Organigramme
                </Text>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
