import React, { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { listformation, postformation, updateformation, deleteformation } from '../../../services/FormationService';
import MaterialReactTable from 'material-react-table';
import Paper from '@mui/material/Paper';
import NewFormationModal from './NewFormationModal';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Tooltip,
    Autocomplete
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { LoadingMetier } from '../../../shared'
import HeaderInScreen from '../../header/HeaderInScreen';

function GestionFormationTestScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [datatable, setTableData] = useState([]);
    const [selectedmetier, setNewnode] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await listformation();
                const reponsemetie = await datametierexistant;
                setTableData(reponsemetie);
              setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setLoading, setError]);
    
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const handleCreateNewRow = (values) => {
        setLoading(true);
        postformation(values)
        .then((data) => {
            setTableData([...data]);
            setLoading(false);
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
        
    };
    const handleCancelRowEdits = () => {
        setNewnode({})
    };
    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if(selectedmetier.nom === undefined){
            selectedmetier.nom = values.nom
        }
        if(selectedmetier.genre  === undefined){
            selectedmetier.genre = values.genre
        }
        if(selectedmetier.categorie  === undefined){
            selectedmetier.categorie = values.categorie
        }
        if(selectedmetier.type  === undefined){
            selectedmetier.type = values.type
        }
        if(selectedmetier.tarif  === undefined){
            selectedmetier.tarif = values.tarif
        }
        if(selectedmetier.durrer  === undefined){
            selectedmetier.durrer = values.durrer
        }
        selectedmetier.id = values.id
        setLoading(true);
        updateformation(selectedmetier)
        .then((data) => {
            setTableData([...data]);
            setLoading(false);
            handleCancelRowEdits()
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
    };

    const handleDeleteRow = useCallback(
        (row) => {
            setLoading(true);
            deleteformation(row.original.id)
            .then((data) => {
                setTableData([...data]);
                setLoading(false);
            })
            .catch((error) => {
                setError('bakend error');
                console.error('bakend error:', error.message);
                setLoading(false);
            });
        },
        [setLoading, setError],
    );
    
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnOrdering: true,
                enableEditing: false,
                enableSorting: true,
                size: 80,
            },
            {
                accessorKey: 'nom',
                header: 'Nom',
                size: 140,
                Edit: ({ cell, column, table }) => <TextField
                    defaultValue={cell.getValue()}
                    key="nom"
                    label="Nom"
                    required
                    name="nom"
                    onChange={(e) =>
                        setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />,
            },
            {
                accessorKey: 'genre',
                header: 'genre',
                size: 140,
                Edit: ({ cell, column, table }) => <Autocomplete
                    defaultValue={cell.getValue()}
                    sx={{
                        width: '100%',
                    }}
                    disablePortal
                    options={["Formation", "Teste"]}
                    onChange={(e, value) =>{
                        if (value != null) setNewnode({ ...selectedmetier, genre: value })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Nom" 
                            name="nom"
                            variant="outlined"
                        />
                    )}
                />
            },
            {
                accessorKey: 'categorie',
                header: 'Catégorie',
                size: 140,
                Edit: ({ cell, column, table }) => <Autocomplete
                    defaultValue={cell.getValue()}
                    sx={{
                        width: '100%',
                    }}
                    disablePortal
                    options={["Savoirs", "Savoirs Faire", "Savoirs Être", "Accrédidations"]}
                    onChange={(e, value) =>{
                        if (value != null) setNewnode({ ...selectedmetier, categorie: value })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Categorie" 
                            name="categorie"
                            variant="outlined"
                        />
                    )}
                />
            },
            {
                accessorKey: 'type',
                header: 'Type',
                size: 140,
                Edit: ({ cell, column, table }) => <Autocomplete
                    defaultValue={cell.getValue()}
                    sx={{
                        width: '100%',
                    }}
                    disablePortal
                    options={["En ligne", "Physique"]}
                    onChange={(e, value) =>{
                        if (value != null) setNewnode({ ...selectedmetier, type: value })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Type" 
                            name="type"
                            variant="outlined"
                        />
                    )}
                />
            },
            {
                accessorKey: 'tarif',
                header: 'Tarif',
                size: 140,
                enableHiding: true,
                Edit: ({ cell, column, table }) => <TextField
                    defaultValue={cell.getValue()}
                    key="tarif"
                    label="Tarif"
                    name="tarif"
                    type="number"
                    onChange={(e) =>
                        setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />
            },
            {
                accessorKey: 'durrer',
                header: 'Durré en Heure',
                size: 140,
                enableHiding: true,
                Edit: ({ cell, column, table }) => <TextField
                    defaultValue={cell.getValue()}
                    key="durrer"
                    label="Durré en Heure"
                    name="durrer"
                    type="number"
                    onChange={(e) =>
                        setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />
            },
            {
                accessorKey: 'creation',
                header: 'Date création',
                enableColumnOrdering: true,
                enableEditing: false,
                enableSorting: true,
            }
        ],
        [selectedmetier],
    );
    if (loading || error) {
        return (
          <Fragment>
              <HeaderInScreen
                  title={"Gestion des Tests et Formations"}
              />
              { LoadingMetier (loading, error)}
          </Fragment>
        );
    }
    // Affichez les données récupérées
    return (
        <Fragment>
            <HeaderInScreen
                title={'Gestion des Tests et Formations'}
            />
            <Paper sx={{ mt: 2, width: '100%', color:'black.main' }}>
                <MaterialReactTable
                    initialState={{ columnVisibility: { descriptionC: false,  descriptionL: false} }}
                    displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                        align: 'center',
                        },
                        size: 120,
                    },
                    }}
                    columns={columns}
                    data={datatable}
                    editingMode="modal"
                    enableColumnOrdering
                    enableEditing
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
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
                    renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={() => table.setEditingRow(row)}>
                            <Edit />
                        </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                            <Delete />
                        </IconButton>
                        </Tooltip>
                    </Box>
                    )}
                    renderTopToolbarCustomActions={() => (
                    <Button
                        color="secondary"
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        Nouveau
                    </Button>
                    )}
                    localization={MRT_Localization_FR}
                />
                <NewFormationModal
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                />
            </Paper>
        </Fragment>
    );
}

export default GestionFormationTestScreen