import { Fragment } from 'react'
import { CardActionArea } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@mui/material'

import GroupsIcon from '@mui/icons-material/Groups'

export const CardItem = (
    <Fragment>
        <CardActionArea>
            <CardContent sx={{ p: 4 }}>
                <Icon
                    sx={{ fontSize: 92, color: 'black.main' }}
                    component={GroupsIcon}
                />
            </CardContent>
        </CardActionArea>
    </Fragment>
)
