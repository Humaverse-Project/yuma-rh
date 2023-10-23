import { CircularProgress, Backdrop } from '@mui/material'

function CircularProgressElement({ open }) {
    return (
        <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 255 }}
                open={open}
            >
                <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default CircularProgressElement