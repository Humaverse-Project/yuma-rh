import { DynamicHeadNav, Row, Text } from '../../shared'
import { Button, useMediaQuery } from '@mui/material'

// ICONES
import { useTheme } from '@emotion/react'

function HeaderInScreen({ title, secondSubtitle }) {
    const theme = useTheme()
    const matcheSM = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <Row justifyContent={'space-between'} px={3} height={'10vh'}>
            <DynamicHeadNav title={title} secondSubtitle={secondSubtitle} />
            {matcheSM && (
                <Row width="16vw" justifyContent="space-between">
                    <Button
                        variant="contained"
                        color="blue"
                        sx={{ px: 2, py: 1 }}
                    >
                        <Text variant="button" color="white">
                            Créer un poste
                        </Text>
                    </Button>
                    <Button
                        variant="contained"
                        color="blue"
                        sx={{ px: 2, py: 1 }}
                    >
                        <Text variant="button" color="white">
                            Connection SIRH
                        </Text>
                    </Button>
                </Row>
            )}
        </Row>
    )
}

export default HeaderInScreen
