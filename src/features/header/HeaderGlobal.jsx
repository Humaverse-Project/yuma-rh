import { DynamicHeadNav, Text, Row } from '../../shared'
import { Icon, useMediaQuery, Button, Box } from '@mui/material'
import { NavLink } from 'react-router-dom'

//ICONES
import LanguageIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTheme } from '@emotion/react'

function HeaderGlobal() {
    const theme = useTheme()
    const matcheSM = useMediaQuery(theme.breakpoints.up('sm'))
    const matcheMD = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Row justifyContent={'space-between'} px={3} height={'10vh'}>
            <DynamicHeadNav title={'ACCUEIL'} />
            {!matcheMD && (
                <Text variant="bigTitleBold" color="blue.main" mr={20}>
                    YUMA
                </Text>
            )}
            {matcheSM && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'line',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Row width={100} justifyContent={'space-between'}>
                        <NavLink to={'/nomenclature'}>
                            <Icon sx={{ fontSize: 38 }} component={LanguageIcon} />
                        </NavLink>
                            <Icon sx={{ fontSize: 38 }} component={SettingsIcon} />
                    </Row>
                    <Row marginLeft={3}>
                        <Button
                            sx={{
                                backgroundColor: 'blue.main',
                                color: 'white',
                                borderRadius: 2,
                                px: 3,
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'blue.main',
                                },
                            }}
                            variant="contained"
                        >
                            BAOBAB+
                        </Button>
                    </Row>
                </Box>
            )}
        </Row>
    )
}

export default HeaderGlobal
