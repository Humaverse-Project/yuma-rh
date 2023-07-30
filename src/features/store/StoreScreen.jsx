import { useState } from 'react'
import { Box } from '@mui/system'
import Row from '../../shared/Row'
import Card from '@mui/material/Card'
import Column from '../../shared/Column'
import TextField from '@mui/material/TextField'
import HeaderInScreen from '../header/HeaderInScreen'
import InputAdornment from '@mui/material/InputAdornment'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { Text } from '../../shared'
import { theme } from '../../theme'

// TODO: Add store items
import StoreCard from './CardStore'

export default function StoreScreen() {
    const [textToSearh, setTextToSearh] = useState(null)

    return (
        <>
            <HeaderInScreen title="Store" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Card
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '80%',
                            [theme.breakpoints.down('lg')]: {
                                flexDirection: 'column',
                            },
                            marginTop: '1rem',
                        }}
                    >
                        <Column>
                            {/**Return button */}
                            <Button
                                variant="contained"
                                color="background"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: 2,
                                    [theme.breakpoints.down('lg')]: {
                                        my: 2,
                                    },
                                }}
                            >
                                <NavLink
                                    to="/home"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                    }}
                                >
                                    <Text fontSize={18}>RETOUR</Text>
                                </NavLink>
                            </Button>
                        </Column>
                        <Column>
                            <TextField
                                id="outlined-basic"
                                value={textToSearh}
                                onChange={(e) => setTextToSearh(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                sx={{
                                    width: '30rem',
                                }}
                            />
                        </Column>
                    </Box>
                    <Row>
                        <Column margin={4}>
                            <StoreCard />
                        </Column>{' '}
                        <Column margin={4}>
                            <StoreCard />
                        </Column>{' '}
                        <Column margin={4}>
                            <StoreCard />
                        </Column>{' '}
                    </Row>
                    <Row>
                        <Column margin={4}>
                            <StoreCard />
                        </Column>{' '}
                        <Column margin={4}>
                            <StoreCard />
                        </Column>{' '}
                        <Column margin={4}>
                            <StoreCard />
                        </Column>{' '}
                    </Row>
                </Card>
            </Box>
        </>
    )
}
