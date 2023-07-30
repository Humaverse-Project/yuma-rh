import * as React from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

// images from assets
import img from '../../assets/images/js.png'

export default function StoreCard() {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3 }}>
            <CardMedia sx={{ height: 200 }} image={img} title="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Formation Javascript
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatum, quibusdam, quia, quod voluptates
                    voluptatem exercitationem quos voluptate quas quibusdam,
                    quia, quod voluptates
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="small">
                    {' '}
                    Réserver
                </Button>
                <Button variant="outlined" size="small">
                    En savoir plus
                </Button>
            </CardActions>
        </Card>
    )
}
