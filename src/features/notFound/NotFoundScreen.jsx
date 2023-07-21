import { Box } from '@mui/system'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { Text } from '../../shared'

//ICONES

function NotFoundScreen() {
    return (
        <Fragment>
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height={'88vh'}
            >
                <Text variant={'h1'} color="primary">
                    Erreur 404 not found
                </Text>
                <NavLink to="/">
                    <Button variant="outlined">Acceuil</Button>
                </NavLink>
            </Box>
        </Fragment>
    )
}

export default NotFoundScreen
