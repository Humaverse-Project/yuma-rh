import { Fragment } from 'react'
import { CardActionArea, Typography, Box } from '@mui/material'
import CardContent from '@mui/material/CardContent'

function CardItem(IconItem) {
    return (
        <Fragment>
            <CardActionArea>
                <CardContent sx={{ p: 4 }}>
                    <IconItem sx={{ fontSize: 92, color: 'black.main' }} />
                </CardContent>
            </CardActionArea>
        </Fragment>
    )
}
export default CardItem
