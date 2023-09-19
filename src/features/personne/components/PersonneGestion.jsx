import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { loaddata, postpersonne } from '../../../services/PersonneService';
import MaterialReactTable from 'material-react-table';
import Paper from '@mui/material/Paper';
import {
    Box,
    Button,
    Typography
} from '@mui/material';
import CreateNewPersonneModal from './CreateNewPersonneModal'
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../organigramme/components/theme';
import { DynamicHeadNav, Row } from '../../../shared';

function PersonneGestion() {
    const [listpersonne, setlistpersonne] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await loaddata();
                const reponsemetie = await datametierexistant;
                setlistpersonne(reponsemetie.personnelist);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
            }
        };
        fetchData();
    }, [setlistpersonne]);
    const handleCreateNewRow = async (values) => {
        console.log(values)
        try {
            const datametierexistant = await postpersonne(values);
            const reponsemetie = await datametierexistant;
            setlistpersonne(reponsemetie.personnelist);
            return true;
        }
        catch (error) {
            console.error('Une erreur s\'est produite :', error);
            return false;
        }
    };
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
            accessorKey: 'personneNom',
            header: 'Nom',
            size: 140,
            enableEditing: false,
            enableClickToCopy: true,
          },
          {
            accessorKey: 'personnePrenom',
            header: 'Prénom',
            size: 140,
            enableEditing: false,
            enableClickToCopy: true,
          },{
            accessorKey: 'personneEmail',
            header: 'Email',
            size: 140,
            enableEditing: false,
            enableClickToCopy: true,
          },{
            accessorKey: 'personneTelephone',
            header: 'Télephone',
            size: 140,
            enableEditing: false,
            enableClickToCopy: true,
          },
          {
            accessorKey: 'createdAt',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
          }
        ],
        [],
    );
    // Affichez les données récupérées
    return (
        <Fragment>
            <Row justifyContent={'space-between'} px={3} height={'10vh'}>
                <DynamicHeadNav title={'Gestion des personnels'} />
            </Row>
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                flexDirection="column"
                minHeight={'88vh'}
            >
                <Paper sx={{ mt: 2, width: '100%', color:'black.main' }}>
                    <ThemeProvider theme={theme}>
                        <MaterialReactTable
                            renderDetailPanel={({ row }) => (
                                <Box
                                    sx={{
                                        margin: 'auto',
                                        gridTemplateColumns: '1fr 1fr',
                                        width: '100%',
                                    }}
                                >
                                    <Typography><b>Adresse:</b> </Typography>
                                    <Typography sx={{color: 'black.main'}} >
                                        {row.original.personneAdresse}
                                    </Typography>
                                    <Typography><b>Genre:</b> </Typography>
                                    <Typography sx={{color: 'black.main'}} >
                                        {row.original.personneGenre}
                                    </Typography>
                                    <Typography><b>Date de naissance:</b> </Typography>
                                    <Typography sx={{color: 'black.main'}} >
                                        {row.original.personneDateNaissance}
                                    </Typography>
                                </Box>
                            )}
                            initialState={{ columnVisibility: { id: false} }}
                            displayColumnDefOptions={{
                                'mrt-row-actions': {
                                    muiTableHeadCellProps: {
                                    align: 'center',
                                    },
                                    size: 120,
                                },
                            }}
                            columns={columns}
                            data={listpersonne}
                            enableColumnOrdering
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
                            renderTopToolbarCustomActions={() => (
                                <Button
                                    color="success"
                                    onClick={() => setCreateModalOpen(true)}
                                    variant="outlined"
                                >
                                    Ajouté une nouvelle personne
                                </Button>
                            )}
                            localization={MRT_Localization_FR}
                        />
                        <CreateNewPersonneModal
                            open={createModalOpen}
                            onClose={() => setCreateModalOpen(false)}
                            onSubmit={handleCreateNewRow}
                        />
                    </ThemeProvider>
                </Paper>
            </Box>
        </Fragment>
        
    );
}

export default PersonneGestion