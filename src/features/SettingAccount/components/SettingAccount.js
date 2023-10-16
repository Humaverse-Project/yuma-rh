import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { json } from 'react-router-dom'

export default function SettingAccount({ open, handleClose }) {
    const handleBackdropClick = (e) => {
        e.stopPropagation()
    }

    const user = JSON.parse(localStorage.getItem('user_data'))[0][
        'compteEntrepriseId'
    ]

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            onClick={handleBackdropClick}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: 600,
                    borderRadius: 2,
                    m: 0,
                    p: 0,
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                    color: 'black',
                    '& .MuiTypography-root': {
                        fontWeight: 'bold',
                    },
                }}
            >
                Modifier le profil
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        m: 1,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="URL"
                            variant="outlined"
                            sx={{ width: '100%', color: 'black' }}
                            value={user.entrepriseUrl}
                        />
                        <TextField
                            label="Téléphone"
                            variant="outlined"
                            sx={{ width: '100%', color: 'black' }}
                            value={user.entrepriseTelephone}
                        />
                        <TextField
                            label="Mail"
                            variant="outlined"
                            sx={{ width: '100%', color: 'black' }}
                            value={user.entrepriseEmail}
                        />
                    </Box>
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{
                        backgroundColor: 'red.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'red.main',
                        },
                    }}
                    variant="contained"
                    onClick={handleClose}
                >
                    Annuler
                </Button>
                <Button
                    sx={{
                        backgroundColor: 'blue.main',
                        color: 'white',

                        '&:hover': {
                            backgroundColor: 'blue.main',
                        },
                    }}
                    variant="contained"
                    onClick={handleClose}
                >
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    )
}
