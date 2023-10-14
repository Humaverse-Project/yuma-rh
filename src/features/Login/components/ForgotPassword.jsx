import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Divider,
    FormControlLabel,
    Switch,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function ModalForgotPassword({
    open,
    handleOpen,
    handleClose,
    style,
}) {
    const handleBackdropClick = (e) => {
        e.stopPropagation()
    }

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            onClick={handleBackdropClick}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: 500,
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
                Modifier le mot de passe
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
            <Divider
                sx={{
                    mr: 2,
                    ml: 2,
                }}
            />
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="votre email"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        label="votre nouveau mot de passe"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        label="Confirmer votre nouveau mot de passe"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                </Box>
                <FormControlLabel
                    sx={{ mt: 2, width: '100%' }}
                    control={<Switch defaultChecked />}
                    label="Voir les mot de passe"
                />
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
