import { Fragment, useState } from 'react'
import HeaderInScreen from '../../header/HeaderInScreen'
import { useTheme } from '@mui/material/styles'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import OrganigrammeTree from './OrganigrammeTree'
import MetierList from './MetierList'

function OrganigrammeScreen() {
    const theme = useTheme()
    const [textToSearh, setTextToSearh] = useState()
    const [isPersonnalChecked, setIsPersonnalChecked] = useState(true)
    const [isMetierChecked, setIsMetierChecked] = useState(true)

    return (
        <Fragment>
            <HeaderInScreen
                title={'Organigramme'}
                secondSubtitle={textToSearh && 'Recherche'}
                buttonRight={{
                    first: 'Créer un poste',
                    second: 'Connection SIRH',
                }}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                width="100%"
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
                <Box>
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
                    />
                    <FormGroup sx={{ ml: 2, mt: 1 }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="PERSONNEL"
                            onChange={(e) =>
                                setIsPersonnalChecked(e.target.checked)
                            }
                        />
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="METIER"
                            onChange={(e) =>
                                setIsMetierChecked(e.target.checked)
                            }
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="COMPETENCE"
                        />
                    </FormGroup>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        [theme.breakpoints.down('md')]: {
                            alignItems: 'flex-start',
                            mt: 8,
                            width: '100%',
                        },
                        flex: 2,
                        ml: 6,
                        [theme.breakpoints.down('lg')]: {
                            ml: 0,
                        },
                    }}
                >
                    {isPersonnalChecked && !textToSearh ? (
                        <OrganigrammeTree isMetierChecked={isMetierChecked} />
                    ) : null}
                    {isMetierChecked && textToSearh && !isPersonnalChecked && (
                        <MetierList textToSearch={textToSearh} />
                    )}
                </Box>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
