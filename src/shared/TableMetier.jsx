import MaterialReactTable from 'material-react-table';
import Paper from '@mui/material/Paper';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';

function TableMetier(columns, data) {
    return (
        <Paper sx={{width: '100%'}}>
            <MaterialReactTable
            initialState={{ columnVisibility: { descriptionL: false} }}
            displayColumnDefOptions={{
            'mrt-row-actions': {
                muiTableHeadCellProps: {
                align: 'center',
                },
                size: 120,
            },
            }}
            columns={columns}
            data={data}
            editingMode="modal"
            enableColumnOrdering
            enableEditing = {false}
            muiBottomToolbarProps = {{
                sx: {
                    backgroundColor: 'unset'
                },
            }}
            muiTopToolbarProps = {{
                sx: {
                    backgroundColor: 'unset'
                },
            }}
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
            muiTableBodyRowProps={{
                sx: {
                    ':hover td': {
                        backgroundColor: '#f5f5f5',
                    },
                    backgroundColor: 'unset',
                },
            }}
            muiTableHeadRowProps={{
                sx: {
                    color: 'black.main',
                    backgroundColor: 'unset'
                },
            }}
            muiTableHeadCellProps={{
                sx: {
                    color: 'black.main',
                    backgroundColor: 'unset'
                },
            }}
            localization={MRT_Localization_FR}
            
            />
        </Paper>
    )
}
export default TableMetier
