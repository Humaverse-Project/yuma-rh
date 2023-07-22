import { Fragment, useState } from 'react'
import HeaderInScreen from '../../header/HeaderInScreen'
import { useTheme } from '@mui/material/styles'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import './Organigramme.css'
import StyledTreeExample from './OrganigrammeTree'

function OrganigrammeScreen() {
    const theme = useTheme()
    const [textToSearh, setTextToSearh] = useState()
    return (
        <Fragment>
            <HeaderInScreen
                title={'Organigramme'}
                secondSubtitle={textToSearh && 'Recherche'}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                flexDirection="row"
                sx={{
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                    },
                }}
                justifyContent="center"
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
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="METIER"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="COMPETENCE"
                        />
                    </FormGroup>
                </Box>
                <Box className="organigramme" sx={{ display: 'flex', flex: 2 }}>
                    <StyledTreeExample />
                </Box>
            </Box>
        </Fragment>
    )
}

export default OrganigrammeScreen
