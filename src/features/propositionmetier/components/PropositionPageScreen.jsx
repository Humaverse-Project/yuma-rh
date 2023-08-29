import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { listmetier } from  '../../../services/MetierService';
import { listcompetance } from  '../../../services/CompetanceService';
import { listpost } from  '../../../services/PosteService';
import { listproposition, postPropositionPoste, postUpdatePropositionPoste, sendVoteProposition } from  '../../../services/PropositionService';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import { LoadingMetier, TableMetier } from '../../../shared'
import { Button, Link, Typography } from '@mui/material';
import ModalEdit from './ModalEdit';
import ModalCreate from './ModalCreate';
import ModalEditProposal from './ModalEditProposal';
import ModalDetailProposal from './ModalDetailProposal';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function PropositionPageScreen() {
    const theme = useTheme()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataCompetance, setDataCompetance] = useState(false);
    const [dataMetiercode, setDataMetiercode] = useState(false);
    const [propositionexistant, setDataPropositionexistant] = useState(false);
    const [originalproposition, setDataoriginalproposition] = useState(false);
    const [allproposition, setDataallproposition] = useState(false);
    const [open, setOpen] = useState(false);
    const [opencreate, setOpencreate] = useState(false);
    const [openeditproposale, setOpeneditproposale] = useState(false);
    const [opendetailproposale, setOpendetailproposale] = useState(false);
    const [activemetieractiveproposal, setActivemetieractiveproposal] = useState({});
    const [activecompetanceactiveproposal, setActivecompetanceactiveproposal] = useState([]);
    const [activeroposal, setActiveroposal] = useState({});
    const [vote, setVote] = useState({})
    const [nombreproposition, setnombreproposition] = useState(0)
    const [pourcentage, setpourcentage] = useState(0)

    const mapdatatableau = useCallback((datatomap)=>{
        const datatoformat = datatomap.map(data=>{
            let nombrelike = data.votePropositions.reduce((total, item) => {
                if (item.hasOwnProperty('value') && item.value ) {
                    return total + 1;
                }
                return total;
            }, 0);
            let nombreunlike = data.votePropositions.reduce((total, item) => {
                if (item.hasOwnProperty('value') && !item.value ) {
                    return total + 1;
                }
                return total;
            }, 0);
            return {
                id: data.id,
                metier: data.propositionPostes[0].metier.code+" "+data.propositionPostes[0].metier.nom,
                like: nombrelike,
                unlike: nombreunlike,
                creation: data.creation,
                createdby: data.createdby
            }
        })
        return datatoformat
    }, []);

    const mapingdata = useCallback((datatomap) =>{
        setDataoriginalproposition(datatomap)
        const datatoformat = mapdatatableau(datatomap)
        var data1 = datatoformat.filter(data=>{
            if(data.createdby === 1){return true}
            return false
        })
        var data2 = datatoformat.filter(data=>{
            if(data.createdby !== 1){return true}
            return false
        })
        setData(data1)
        setnombreproposition(data1.length)
        let nombrevote = data1.reduce((total, item) => {
            if (item.hasOwnProperty('like') && typeof item.like === 'number') {
                return total + item.like + item.unlike;
            }
            return total;
        }, 0);
        let nombreok = data1.reduce((total, item) => {
            if (item.hasOwnProperty('like') && typeof item.like === 'number') {
                return total + item.like;
            }
            return total;
        }, 0);
        if (nombrevote > 0) setpourcentage((nombreok*100/nombrevote).toFixed(2))
        setDataallproposition(data2)
    }, [setData, setDataallproposition, mapdatatableau, setpourcentage, setDataoriginalproposition]);

    
    const filtredatatableau = ()=>{
        const filtretableau = originalproposition.filter(proposition=>{
            let nombrevote = proposition.votePropositions.reduce((total, item) => {
                if (item.hasOwnProperty('votepar') && item.votepar === 1) {
                    return 1;
                }
                return total;
            }, 0);
            if (nombrevote === 0) return true;
            return false;
        })
        const datatoformat = mapdatatableau(filtretableau)
        var data2 = datatoformat.filter(data=>{
            if(data.createdby !== 1){return true}
            return false
        })
        setDataallproposition(data2)
    }
    const handleSubmitEditProposal = useCallback(async (data) => {
        setLoading(true);
        try {
            const dataproposition = await postUpdatePropositionPoste(data)
            await dataproposition;
            const datapropositionreload = await listproposition()
            const reponseproposition = await datapropositionreload;
            mapingdata(reponseproposition)
            setLoading(false);
        }
        catch (error) {
            console.error('Une erreur s\'est produite :', error);
            setError("Une erreur s'est produite lors de l'appele serveur");
            setLoading(false);
        }
    }, [setLoading, mapingdata]);
    const handleSubmit = async (data, metier) => {
        console.log(data, metier)
        data = data.map(x=> { return {...x, metier_id: metier.metier_id}})
        setLoading(true);
        try {
            const dataproposition = await postPropositionPoste(data)
            await dataproposition;
            const datapropositionreload = await listproposition()
            const reponseproposition = await datapropositionreload;
            mapingdata(reponseproposition)
            setLoading(false);
        }
        catch (error) {
            console.error('Une erreur s\'est produite :', error);
            setError("Une erreur s'est produite lors de l'appele serveur");
            setLoading(false);
        }
    }
    const buttonStyle = {
        display: 'block',
        marginBottom: '20px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center"
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await listmetier();
                const reponsemetie = await datametierexistant;
                const datacompetanceexistant = await listcompetance();
                const reponsecompetance = await datacompetanceexistant;
                const datacompetanceaapi = await listpost();
                const reponsedatacompetanceaapi = await datacompetanceaapi;
                const dataproposition = await listproposition()
                const reponseproposition = await dataproposition;
                setDataMetiercode(reponsemetie);
                setDataCompetance(reponsecompetance);
                setDataPropositionexistant(reponsedatacompetanceaapi)
                mapingdata(reponseproposition)
                setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setDataMetiercode, setDataCompetance, setDataPropositionexistant, setLoading, setError, mapingdata]);

    const hangleopeneditproposalmodal = useCallback(async (id, modal) => {
        const mydataproposaltoedit = originalproposition.filter( (proposal) =>{
            if (proposal.id === id) return true
            return false
        })
        console.log(mydataproposaltoedit[0])
        setActiveroposal(mydataproposaltoedit[0])
        var listproposition = mydataproposaltoedit[0].propositionPostes.map(propos=>{
            return {
                id: propos.id, competancecode: propos.competance.code, competanceid: propos.competance.id, niveauCompetance: propos.niveauCompetance.toString(), metier_id: propos.metier.id, type: propos.type,
                id_proposition: mydataproposaltoedit[0].id, type2: "update"
            }
        })
        setActivecompetanceactiveproposal(listproposition)
        setActivemetieractiveproposal(mydataproposaltoedit[0].propositionPostes[0].metier)
        if(modal === "modification"){
            setOpeneditproposale(true)
        } else if(modal === "detail") {
            let monvote = mydataproposaltoedit[0].votePropositions.filter(vote=>{
                if (vote.votepar === 1) return true
                return false
            })
            if(monvote.length > 0){
                setVote({value: monvote[0].value, id: monvote[0].id})
            } else {
                setVote({value: null, id: null})
            }
            setOpendetailproposale(true)
        }
    }, [originalproposition, setActivecompetanceactiveproposal, setActivemetieractiveproposal, setOpeneditproposale, setOpendetailproposale]);

    const columns = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: '',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <EditIcon></EditIcon>
            ),
            Cell: ({ cell }) => 
                (<Link>modifier</Link>),
            muiTableBodyCellProps: ({ cell }) => ({
                onClick: () => {
                    hangleopeneditproposalmodal(cell.getValue(), "modification")
                },
            }),
          },
          {
            accessorKey: 'metier',
            header: 'Metiers',
            size: 400,
            enableEditing: false,
          },
          {
            accessorKey: 'like',
            header: 'Nombre de personne qui a un vote pour votre faveur',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
            ),
          },
          {
            accessorKey: 'unlike',
            header: 'Nombre de personne qui a un vote contre votre faveur',
            size: 100,
            enableHiding: true,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbDownOffAltIcon></ThumbDownOffAltIcon>
            ),
          },
          {
            accessorKey: 'creation',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            Header: ({ column }) => (
                <CalendarMonthIcon></CalendarMonthIcon>
            ),
          }
        ],
        [hangleopeneditproposalmodal],
    );
    const columns2 = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: '',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <EditIcon></EditIcon>
            ),
            Cell: ({ cell }) => 
                (<Link>Détails</Link>),
            muiTableBodyCellProps: ({ cell }) => ({
                onClick: () => {
                    hangleopeneditproposalmodal(cell.getValue(), "detail")
                },
            }),
          },
          {
            accessorKey: 'metier',
            header: 'Metiers',
            size: 400,
            enableEditing: false,
          },
          {
            accessorKey: 'like',
            header: 'Nombre de personne qui a un vote pour votre faveur',
            size: 100,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
            ),
          },
          {
            accessorKey: 'unlike',
            header: 'Nombre de personne qui a un vote contre votre faveur',
            size: 100,
            enableHiding: true,
            enableEditing: false,
            Header: ({ column }) => (
                <ThumbDownOffAltIcon></ThumbDownOffAltIcon>
            ),
          },
          {
            accessorKey: 'creation',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            Header: ({ column }) => (
                <CalendarMonthIcon></CalendarMonthIcon>
            ),
          }
        ],
        [hangleopeneditproposalmodal],
    );
    const handleSubmitVoteProposal = useCallback(async (data) => {
        let object = {
            id: activeroposal.id,
            value: data.value,
            vote_id: data.id
        }
        setLoading(true);
        try {
            const dataproposition = await sendVoteProposition(object)
            await dataproposition;
            const datapropositionreload = await listproposition()
            const reponseproposition = await datapropositionreload;
            mapingdata(reponseproposition)
            setLoading(false);
        }
        catch (error) {
            console.error('Une erreur s\'est produite :', error);
            setError("Une erreur s'est produite lors de l'appele serveur");
            setLoading(false);
        }
        setOpendetailproposale(false)
    }, [setOpendetailproposale, activeroposal, setLoading, mapingdata]);
    if (loading || error) {
        return (
          <Fragment>
              <HeaderInScreen
                  title={'Update - créer ou modifier un métier'}
              />
              {LoadingMetier(loading, error)}
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Update - créer ou modifier un métier'}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
        >
            <Grid container spacing={2} pl={5} pr={5}>
                <Grid item xs={12} md={10}
                    sx={{
                        [theme.breakpoints.up('lg')]: {
                            mt: 2,
                        },
                        [theme.breakpoints.down('sm')]: {
                            my: 1,
                            mx: 0,
                        },
                    }}
                >
                    <Typography align='center' sx={{mb:2}}>Mes propositions</Typography>
                    {TableMetier(columns,data)}
                </Grid>
                <Grid item xs={12} md={2} my={7}>
                    <Button 
                        key="modifmetier"
                        variant="contained"
                        color='blue'
                        fullWidth
                        style={buttonStyle}
                        size='large'
                        onClick={()=>setOpen(true)}>
                            Modifier un metier
                    </Button>
                    <Button 
                        key="addmetier"
                        variant="contained"
                        color='blue'
                        fullWidth
                        style={buttonStyle}
                        size='large'
                        onClick={()=> setOpencreate(true)}>
                            crée un metier
                    </Button>

                    <Button 
                        key="propositionfaite"
                        variant="contained"
                        color='primary'
                        fullWidth
                        style={buttonStyle}
                        size='large'>
                            Nb de propositions effectuées : {nombreproposition}
                    </Button>
                    <Button 
                        key="pourcentproposition"
                        variant="contained"
                        color='primary'
                        fullWidth
                        style={buttonStyle}
                        size='large'>
                            % d’acceptations : {pourcentage}
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} pl={5} pr={5}>
                <Grid item xs={12} md={10}
                    sx={{
                        [theme.breakpoints.up('lg')]: {
                            mt: 2,
                        },
                        [theme.breakpoints.down('sm')]: {
                            my: 1,
                            mx: 0,
                        },
                    }}
                >
                    <Typography align='center' sx={{mb:2}}>Propositions du réseau en cours</Typography>
                    {TableMetier(columns2,allproposition)}
                </Grid>
                <Grid item xs={12} md={2} my={7}>
                    <Button 
                        key="filtre"
                        variant="contained"
                        color='primary'
                        fullWidth
                        style={buttonStyle}
                        onClick={filtredatatableau}
                        size='large'>
                            Filtrer sur non répondu 
                    </Button>
                </Grid>
            </Grid>
        </Box>
        <ModalEdit
            open={open}
            listCompetance={dataCompetance}
            listmetier={dataMetiercode}
            listposte={propositionexistant}
            onSubmit = {handleSubmit}
            onClose = {()=>setOpen(false)}
        ></ModalEdit>
        <ModalCreate
            open={opencreate}
            listCompetance={dataCompetance}
            listmetier={dataMetiercode}
            onSubmit = {handleSubmit}
            onClose = {()=>setOpencreate(false)}
        >
        </ModalCreate>
        <ModalEditProposal
            open={openeditproposale}
            listCompetance={dataCompetance}
            listmetier={dataMetiercode}
            onSubmit = {handleSubmitEditProposal}
            onClose = {()=>setOpeneditproposale(false)}
            metieractive = {activemetieractiveproposal}
            postedata = {activecompetanceactiveproposal}
            setPostedata = {setActivecompetanceactiveproposal}
        >
        </ModalEditProposal>
        <ModalDetailProposal
            open={opendetailproposale}
            listCompetance={dataCompetance}
            listmetier={dataMetiercode}
            onSubmit = {handleSubmitVoteProposal}
            onClose = {()=>setOpendetailproposale(false)}
            metieractive = {activemetieractiveproposal}
            postedata = {activecompetanceactiveproposal}
            vote = {vote}
            setVote = {setVote}
        >
        </ModalDetailProposal>
    </Fragment>
    );
}

export default PropositionPageScreen