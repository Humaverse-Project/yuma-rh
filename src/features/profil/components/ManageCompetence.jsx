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

function ManageCompetence() {
    const theme = useTheme()
    const matcheXL = useMediaQuery(theme.breakpoints.down('xl'))
    const matcheLG = useMediaQuery(theme.breakpoints.down('lg'))
    const [chooseFormation, setchooseFormation] = useState('')
    const [competences] = useState([
        {
            id: 1,
            label: 'Communication',
            value: 50,
            isSelected: false,
        },
        {
            id: 2,
            label: 'Répondre aux appels téléphoniques',
            value: 48,
            isSelected: false,
        },
        {
            id: 3,
            label: 'Gérer les dossiers clients et fournisseurs',
            value: 56,
            isSelected: false,
        },
        {
            id: 4,
            label: 'Gestion de stress',
            value: 44,
            isSelected: false,
        },
    ])

    return (
        <Fragment>
            <HeaderInScreen title="PROFIL" />
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    height: '96vh',
                    py: 3,
                    px: 5,
                    display: 'flex',
                    [theme.breakpoints.down('lg')]: {
                        px: 2,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        height: 'auto',
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
                                [theme.breakpoints.down('xl')]: {
                                    width: '40%',
                                },
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
                            {competences &&
                                competences.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Radio
                                            checked={
                                                item.label === chooseFormation
                                            }
                                            onChange={() => {
                                                setchooseFormation(item.label)
                                            }}
                                            value={item.label}
                                            name="radio-buttons"
                                            inputProps={{
                                                'aria-label': item.label,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: 1,
                                            }}
                                        >
                                            <Text variant="title">
                                                {item.label}
                                            </Text>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 1,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        mr: 1,
                                                    }}
                                                >
                                                    <LinearProgress
                                                        variant="determinate"
                                                        color="success"
                                                        sx={{
                                                            color: 'success',
                                                        }}
                                                        value={item.value}
                                                    />
                                                </Box>
                                                <Box sx={{ minWidth: 35 }}>
                                                    <Text
                                                        variant="normalBold"
                                                        color="black"
                                                    >{`${Math.round(
                                                        item.value
                                                    )}%`}</Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
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
                        alignItems: chooseFormation ? 'flex-start' : 'center',
                        flex: 1,
                        [theme.breakpoints.down('lg')]: {
                            mt: 4,
                            mb: 3,
                        },
                    }}
                >
                    {chooseFormation ? (
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    [theme.breakpoints.down('lg')]: {
                                        flexDirection: 'row',
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        flexDirection: 'column',
                                    },
                                }}
                            >
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
                                        justifyContent="space-around"
                                        height={200}
                                    >
                                        <Column>
                                            <Text variant={'normalBold'}>
                                                Formation
                                            </Text>
                                            <Text variant={'body2'}>
                                                Gestion des clients et
                                                fournisseurs
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
                                            <Text variant={'caption'}>
                                                4 ans
                                            </Text>
                                        </Column>
                                        <Rating name="javascript" value={4} />
                                    </Column>
                                </Row>
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
                                        justifyContent="space-around"
                                        height={200}
                                    >
                                        <Column>
                                            <Text variant={'normalBold'}>
                                                Formation
                                            </Text>
                                            <Text variant={'body2'}>
                                                Gestion client
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
                                            <Text variant={'caption'}>
                                                10 ans
                                            </Text>
                                        </Column>
                                        <Rating name="javascript" value={4} />
                                    </Column>
                                </Row>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 2,
                                }}
                            >
                                <Row
                                    justifyContent="space-between"
                                    width={matcheLG ? '100%' : '50%'}
                                >
                                    <Button variant={'contained'} color="blue">
                                        <Text color={'white'}>Choisir</Text>
                                    </Button>
                                    <Button variant={'outlined'} color="blue">
                                        <Text color={'blue'}>Annuler</Text>
                                    </Button>
                                </Row>
                            </Box>
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
