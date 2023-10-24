import MaterialReactTable from 'material-react-table';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import "./tablestyle.css";
import {
    Box,
    Tooltip,
    IconButton,
  } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';

const PosteTable = ({ editaction, columns, data}) => {

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            muiTableBodyRowProps={{
                sx: {
                    ':hover td': {
                        backgroundColor: 'unset',
                    },
                    backgroundColor: '#fff',
                    border: '1px solid #7a818c',
                    color: 'black.main'
                },
            }}
            muiTableHeadRowProps={{
                sx: {
                    color: 'black.main',
                    backgroundColor: 'unset',
                    boxShadow: "none"
                },
            }}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableTopToolbar={false}
            positionActionsColumn="last"
            muiTableProps={{
                sx: {
                    border: 'unset',
                },
            }}
            muiTableHeadCellProps={{
                sx: {
                    backgroundColor: 'unset',
                    color: 'black.main',
                    fontWeight: "500 !important"
                },
            }}
            muiTableBodyCellProps={{
                sx:{
                    color: 'black.main',
                }
            }}
            enableEditing
            enableRowActions
            localization={MRT_Localization_FR}
            muiTablePaperProps={{
                elevation: 0
            }}
            renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip
                    arrow
                    placement="right"
                    title={ row.original.titre !== undefined ? `Modifier -> ${row.original.titre }` : `Modifier -> ${row.original.orgIntitulePoste }`}
                  >
                    <IconButton onClick={(e) => editaction(row.original)}>
                      <EditNoteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
            )}
        />
    )
}
export default PosteTable