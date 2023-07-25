import { Fragment, useState } from 'react'
import { Column, Row, Text } from '../../../shared'
import HeaderInScreen from '../../header/HeaderInScreen'
import {
    Box,
    Button,
    Icon,
    LinearProgress,
    Radio,
    Rating,
    TextField,
    useMediaQuery,
} from '@mui/material'
import './Profil.css'
import { useTheme } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import imageJS from '../../../assets/images/js.png'

function LinearProgressWithLabel(props) {
    const [selectedValue, setSelectedValue] = useState('')

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Radio
                checked={selectedValue === props.label}
                onChange={handleChange}
                value={props.label}
                name="radio-buttons"
                inputProps={{ 'aria-label': props.label }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Text variant="title">{props.label}</Text>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            color="success"
                            sx={{
                                color: 'success',
                            }}
                            {...props}
                        />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Text variant="normalBold" color="black">{`${Math.round(
                            props.value
                        )}%`}</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function ManageCompetence() {
    const theme = useTheme()
    const matcheXL = useMediaQuery(theme.breakpoints.down('xl'))
    const chooseFormation = true

    return (
        <Fragment>
            <HeaderInScreen title="PROFIL" />
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    height: 100 - 15 + 'vh',
                    py: 3,
                    px: 5,
                    display: 'flex',
                    [theme.breakpoints.down('lg')]: {
                        px: 2,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    },
                }}
            >
                {/**profil and competences */}
                <Box
                    sx={{
                        display: 'flex',
                        flex: 3,
                        flexDirection: 'column',
                    }}
                >
                    {/**profil section  && critère*/}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 5,
                            [theme.breakpoints.down('md')]: {
                                flexDirection: 'column',
                                my: 3,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                [theme.breakpoints.down('md')]: {
                                    mb: 3,
                                },
                            }}
                        >
                            {/**icon and name person */}
                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Icon
                                    sx={{
                                        fontSize: 100,
                                        border: 1,
                                        borderColor: 'blue.main',
                                        borderRadius: 2,
                                    }}
                                    component={PersonIcon}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        ml: 3,
                                    }}
                                >
                                    <Text variant="titleBold">
                                        Louis Dubrant
                                    </Text>
                                    <Text variant="normal">
                                        Assistant commercial junior
                                    </Text>
                                </Box>
                            </Box>
                            {/**search bar */}
                            <TextField
                                label="Poste ciblé: "
                                variant="outlined"
                                fullWidth
                                focused
                                color="blue"
                            />
                        </Box>
                        {/**critère */}
                        <Box
                            backgroundColor="white"
                            sx={{
                                py: 1,
                                px: 4,
                                border: 1,
                                borderColor: 'secondary.dark',
                                borderRadius: 3,
                                width: '30%',
                                [theme.breakpoints.down('md')]: {
                                    width: 'auto',
                                },
                            }}
                        >
                            <Column alignItems="center">
                                <Text
                                    variant={'titleBold'}
                                    color="secondary.main"
                                >
                                    Critères de formation
                                </Text>
                                <Box width="100%">
                                    {/**Durée */}
                                    <Row
                                        flex={1}
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Text>Durée : </Text>
                                        <FormControl
                                            sx={{
                                                width: 100,
                                            }}
                                        >
                                            <InputLabel
                                                variant="standard"
                                                htmlFor="uncontrolled-native"
                                            >
                                                min
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'min',
                                                    id: 'uncontrolled-native',
                                                }}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <FormControl
                                            sx={{
                                                width: 100,
                                            }}
                                        >
                                            <InputLabel
                                                variant="standard"
                                                htmlFor="uncontrolled-native"
                                            >
                                                max
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'max',
                                                    id: 'uncontrolled-native',
                                                }}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Row>
                                    {/**Budget */}
                                    <Row
                                        flex={1}
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Text>Budget: </Text>
                                        <FormControl
                                            sx={{
                                                width: 100,
                                            }}
                                        >
                                            <InputLabel
                                                variant="standard"
                                                htmlFor="uncontrolled-native"
                                            >
                                                min
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'min',
                                                    id: 'uncontrolled-native',
                                                }}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <FormControl
                                            sx={{
                                                width: 100,
                                            }}
                                        >
                                            <InputLabel
                                                variant="standard"
                                                htmlFor="uncontrolled-native"
                                            >
                                                max
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'max',
                                                    id: 'uncontrolled-native',
                                                }}
                                            >
                                                <option value={100}>100</option>
                                                <option value={200}>200</option>
                                                <option value={300}>300</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Row>
                                    {/**Type */}
                                    <Row
                                        flex={1}
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Text>Type: </Text>
                                        <FormGroup row={true}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox defaultChecked />
                                                }
                                                label="En présentiel"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="A distance"
                                            />
                                        </FormGroup>
                                    </Row>
                                </Box>
                            </Column>
                        </Box>
                    </Box>
                    {/**Competence section */}
                    <Box
                        sx={{
                            border: 2,
                            borderColor: 'secondary.dark',
                            borderRadius: 6,
                            backgroundColor: 'white',
                            p: 5,
                        }}
                    >
                        <Box>
                            <LinearProgressWithLabel
                                label="Communication"
                                value={58}
                            />
                            <LinearProgressWithLabel
                                label="Répondre aux appels téléphoniques"
                                value={52}
                            />
                            <LinearProgressWithLabel
                                label="Gérer les dossiers clients et fournisseurs"
                                value={37}
                            />
                            <LinearProgressWithLabel
                                label="Gestion de stress"
                                value={31}
                            />
                        </Box>
                        <Row
                            justifyContent="space-between"
                            width={matcheXL ? '100%' : '14vw'}
                            mt={matcheXL ? 0 : 2}
                        >
                            <Button variant="outlined" color="secondary">
                                <Text variant={'titleBold'}>+</Text>
                            </Button>
                            <Text>2 autres compétences</Text>
                        </Row>
                    </Box>
                </Box>
                {/**choice avalaible competences */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    {chooseFormation ? (
                        <Box>
                            <Row alignItems="">
                                <Box>
                                    <img
                                        src={imageJS}
                                        alt="Javascript"
                                        className="imageStyle"
                                    />
                                </Box>
                                <Column
                                    ml={1}
                                    justifyContent="space-between"
                                    height={200}
                                >
                                    <Column>
                                        <Text variant={'normalBold'}>
                                            Formation
                                        </Text>
                                        <Text variant={'body2'}>
                                            Gestion des clients et fournisseurs
                                        </Text>
                                    </Column>
                                    <Column>
                                        <Text
                                            variant={'subtitle2'}
                                            fontWeight="bold"
                                        >
                                            Catégorie
                                        </Text>
                                        <Text variant={'caption'}>
                                            Professionalisante / Commerciale
                                        </Text>
                                    </Column>
                                    <Column>
                                        <Text
                                            variant={'caption'}
                                            fontWeight="bold"
                                        >
                                            Validité
                                        </Text>
                                        <Text variant={'caption'}>8 ans</Text>
                                    </Column>
                                    <Rating name="javascript" value={4} />
                                </Column>
                            </Row>
                        </Box>
                    ) : (
                        <Text variant="normal" color="secondary.main">
                            Choisissez une compétences
                        </Text>
                    )}
                </Box>
            </Box>
        </Fragment>
    )
}

export default ManageCompetence
