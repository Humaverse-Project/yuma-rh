import { Fragment } from 'react'
import { CardActionArea } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@mui/material'

import { AccessAlarm, ThreeDRotation } from '@mui/icons-material'

export const CardItem = (IconItem) => (
    <Fragment>
        <CardActionArea>
            <CardContent sx={{ p: 4 }}>
                <IconItem sx={{ fontSize: 92, color: 'black.main' }} />
            </CardContent>
        </CardActionArea>
    </Fragment>
)
