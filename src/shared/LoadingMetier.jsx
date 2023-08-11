import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles'

function LoadingMetier(loading, error) {
    const theme = useTheme()
    return (
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={9}
                    sx={{
                        [theme.breakpoints.up('lg')]: {
                            mt: 5,
                        },
                        [theme.breakpoints.down('sm')]: {
                            my: 1,
                            mx: 0,
                        },
                    }}
                >
                    <div>
                        {error && (
                            <Snackbar 
                                open={error || loading}
                                autoHideDuration={6000}
                                anchorOrigin={{ vertical:'top', horizontal:'right' }}
                            >
                                <Alert severity="error">
                                    Une erreur s'est produite lors de la connexion à l'API.
                                </Alert>
                            </Snackbar>
                        )}
                        {loading && (
                            <Snackbar 
                                open={error || loading}
                                autoHideDuration={6000}
                                anchorOrigin={{ vertical:'top', horizontal:'right' }}
                            >
                                <Alert severity="warning" >
                                    chargement de donné depuis l'API.
                                </Alert>
                            </Snackbar>
                        )}
                    </div>
                </Grid>
            </Grid>
            
        </Box>
    )
}
export default LoadingMetier