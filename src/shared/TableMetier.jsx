import MaterialReactTable from 'material-react-table';
import Paper from '@mui/material/Paper';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';

function TableMetier(columns, data) {
    return (
        <Paper sx={{width: '100%'}}>
            <MaterialReactTable
                columns={columns}
                data={data}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                autoHeight
                localization={MRT_Localization_FR}
                enableStickyHeader
                muiTableBodyProps={{
                    sx: {
                        '& tr:nth-of-type(odd)': {
                        backgroundColor: '#f5f5f5',
                        },
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        color: 'black.main'
                    },
                }}
                enableTopToolbar={false}
                muiTableHeadCellProps={{
                    sx: {
                        color: 'black.main'
                    },
                }}
                muiTableHeadRowProps={{
                    sx: {
                        backgroundColor: "unset"
                    },
                }}
                muiTableBodyRowProps={{
                    sx: {
                        backgroundColor: "unset"
                    },
                    hover: false
                }}
                initialState={{ density: 'compact' }}
            />
        </Paper>
    )
}
export default TableMetier
