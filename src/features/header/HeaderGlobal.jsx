import {
    Box,
    Menu,
    Icon,
    Button,
    Tooltip,
    MenuItem,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { DynamicHeadNav, Text, Row } from '../../shared'

//ICONES
import { useTheme } from '@emotion/react'
import LanguageIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'

// import sweetAlert from 'sweetalert2'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function HeaderGlobal() {
    const MySwal = withReactContent(Swal)
    const theme = useTheme()
    const matcheSM = useMediaQuery(theme.breakpoints.up('sm'))
    const matcheMD = useMediaQuery(theme.breakpoints.down('md'))

    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

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
                        <NavLink
                            style={{
                                textDecoration: 'none',
                                marginTop: 2,
                                color: 'black',
                            }}
                            to="/settingAccount"
                        >
                            <Icon
                                sx={{ fontSize: 38 }}
                                component={SettingsIcon}
                            />
                        </NavLink>
                        <NavLink
                            to={'/nomenclature'}
                            style={{
                                textDecoration: 'none',
                                marginTop: 2,
                                color: 'black',
                            }}
                        >
                            <Icon
                                sx={{ fontSize: 38 }}
                                component={LanguageIcon}
                            />
                        </NavLink>
                    </Row>
                    <Row marginLeft={3}>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            borderRadius: 2,
                                            height: '50px',
                                            p: 2,
                                            '&:hover': {
                                                backgroundColor: 'grey',
                                            },
                                        }}
                                    >
                                        {
                                            JSON.parse(
                                                localStorage.getItem(
                                                    'user_data'
                                                )
                                            )[0].compteEntrepriseId
                                                .entrepriseNom
                                        }
                                    </Button>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <NavLink
                                    to={'/setting'}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <MenuItem
                                        key="1"
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            Mon compte
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                                <MenuItem key="2">
                                    <Typography
                                        textAlign="center"
                                        onClick={() => {
                                            MySwal.fire({
                                                title: 'Êtes-vous sûr?',
                                                text: 'Vous allez être déconnecté',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText:
                                                    'Oui, déconnectez-moi',
                                                cancelButtonText:
                                                    'Non, annulez',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    localStorage.clear()
                                                    window.location.href = '/'
                                                }
                                            })
                                        }}
                                    >
                                        Déconnexion
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Row>
                </Box>
            )}
        </Row>
    )
}

export default HeaderGlobal
