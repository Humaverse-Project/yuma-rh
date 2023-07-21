import { DynamicHeadNav, Text, Row } from '../../shared'
import { Button } from '@mui/material'

//ICONES
//import { useTheme } from '@emotion/react'

function HeaderInScreen({ title, secondSubtitle, rightButton }) {
    //const theme = useTheme()
    //const matcheSM = useMediaQuery(theme.breakpoints.up('sm'))
    //const matcheMD = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Row justifyContent={'space-between'} px={3} height={'10vh'}>
            <DynamicHeadNav title={title} secondSubtitle={secondSubtitle} />
            <Row>
                <Button variant="contained" color="blue">
                    <Text variant="button" color="white">
                        Créer un poste
                    </Text>
                </Button>
            </Row>
        </Row>
    )
}

export default HeaderInScreen
