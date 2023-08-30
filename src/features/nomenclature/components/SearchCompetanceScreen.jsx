import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useMemo, useEffect, useRef } from 'react';
import { searchpostbycompetancecode, listpost } from  '../../../services/PosteService';
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { LoadingMetier, Column, DynamicHeadNav, Row, Text } from '../../../shared'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import ForceGraph2D from "react-force-graph-2d";
import { NavLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  CardActions,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
function SearchCompetanceScreen() {
    const theme = useTheme()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [ codesaisi, setCodeSaisi ] = useState("")
    const [ graphData, setMydatatoMap ] = useState({nodes: [], links: []});
    const [initialCenter, setInitialCenter] = useState(true);
    const [collapsedClusters, setCollapsedClusters] = useState([]);
    const [hiddenClusters, setHiddenClusters] = useState([]);
    const forceRef = useRef();


    useEffect(() => {
      const fetchData = async () => {
          try {
              const datametierexistant = await listpost();
              const reponsemetie = await datametierexistant;
              var reponsmaped = []
              var node = []
              for (let index = 0; index < reponsemetie.length; index++) {
                const element = reponsemetie[index];
                let compet = reponsmaped.filter(com=>{
                  if (com.id === `${element.competance.id}${element.competance.code}`) {
                    return true
                  } return false
                })
                if (compet.length === 0) {
                  reponsmaped.push({
                    id: `${element.competance.id}${element.competance.code}`,
                    name: element.competance.code,
                    key: element.competance.id,
                    isClusterNode: true,
                    size: 5
                  });
                }
                reponsmaped.push({
                  id: `${index}metier${element.metier.id}${element.metier.code}`,
                  name: element.metier.code+" "+element.metier.nom,
                  key: element.metier.id,
                  centrality: 0.0,
                  size: 2,
                  degrees: Math.floor(Math.random() * 100)
                });
                node.push({
                  source: `${element.competance.id}${element.competance.code}`,
                  target: `${index}metier${element.metier.id}${element.metier.code}`
                });
              }
              reponsmaped.forEach((das) => {
                das.val = (das.size * 100) | (das.degrees / 10);
                if (das.isClusterNode) {
                  das.clusterId = null;
                } else {
                  const link = node.find((link) => link.target === das.id);
                  das.clusterId = link && link.source;
                }
              });
              
              const clusters = reponsmaped.filter((node) => node.isClusterNode);
              const clusterIds = clusters.map((cluster) => cluster.id);
              setCollapsedClusters(clusterIds)
              setMydatatoMap({ nodes: reponsmaped,
              links: node})
              setLoading(false);
          } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            setError("Une erreur s'est produite lors de l'appele serveur");
            setLoading(false);
          }
      };
      fetchData();
    }, []);
    
    
  
    useEffect(() => {
      // forceRef.current.d3Force("collide", d3.forceCollide(13));
      forceRef.current.d3Force("charge").strength(-40);
      forceRef.current.d3Force("link").distance(50);
      forceRef.current.d3Force("charge").distanceMax(150);
    }, []);
  
    const toggleClusterCollapse = (clusterId) => {
      if (collapsedClusters.includes(clusterId)) {
        setCollapsedClusters(collapsedClusters.filter((id) => id !== clusterId));
      } else {
        setCollapsedClusters([...collapsedClusters, clusterId]);
      }
    };
  
    const handleNodeClick = (node) => {
      toggleClusterCollapse(node.id);
      if (collapsedClusters.includes(node.id)) {
        forceRef.current.zoom(3.5, 400);
        forceRef.current.centerAt(node.x, node.y, 400);
      }
    };
    const HandleSearch = (e)=>{
      let node = graphData.nodes.filter(node=>{
          if(node.id.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
          ){
              return true
          }
          return false
      })
      if (node.length>0) {
        if (collapsedClusters.includes(node[0].id)) {
          setCollapsedClusters(collapsedClusters.filter((id) => id !== node[0].id));
        }
        forceRef.current.zoom(3.5, 400);
        forceRef.current.centerAt(node[0].x, node[0].y, 400);
      }
      setCodeSaisi(e.target.value)
    }

    if (loading || error) {
        return (
          <Fragment>
              <HeaderInScreen
                  title={'Recherche de metier par competance'}
              />
              {LoadingMetier(loading, error)}
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Recherche de metier par competance'}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
        >
          <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                [theme.breakpoints.down('lg')]: {
                    flexDirection: 'column',
                },
                marginTop: '1rem',
            }}
        >
            <Column>
                {/**Return button */}
                <Button
                    variant="contained"
                    color="background"
                    sx={{
                        px: 6,
                        py: 1.5,
                        borderRadius: 2,
                        [theme.breakpoints.down('lg')]: {
                            my: 2,
                        },
                    }}
                >
                    <NavLink
                        to="/nomenclature"
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                    >
                        <Text fontSize={18}>RETOUR</Text>
                    </NavLink>
                </Button>
            </Column>
            <Column>
                <TextField
                    id="outlined-basic"
                    value={codesaisi}
                    onChange={(e) => HandleSearch(e)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    sx={{
                        width: '30rem',
                    }}
                />
            </Column>
        </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}
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
                  <ForceGraph2D
                    ref={forceRef}
                    onNodeClick={handleNodeClick}
                    graphData={graphData}
                    cooldownTicks={50}
                    nodeRelSize={1}
                    onEngineStop={() => {
                      if (initialCenter) {
                        forceRef.current.zoomToFit();
                      }
                      setInitialCenter(false);
                    }}
                    nodeCanvasObjectMode={() => "after"}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                      const label = node.name;
                      const fontSize = node.isClusterNode
                        ? 14 * (node.val / 1500)
                        : 14 / (globalScale * 1.2);
                      ctx.font = `${fontSize}px Sans-Serif`;
                      ctx.textAlign = "center";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = node.isClusterNode ? "white" : "black"; //node.color;
                      if (node.isClusterNode) {
                        // console.log();
                        const lineHeight = fontSize * 1.2;
                        const lines = label.split(",");
                        let x = node.x;
                        let y = node.y - lineHeight;
                        for (let i = 0; i < lines.length; ++i) {
                          ctx.fillText(lines[i], x, y);
                          y += lineHeight;
                        }
                      } else if (globalScale >= 3.5) {
                        ctx.fillText(label, node.x, node.y + 2.5);
                      }
                    }}
                    enableNodeDrag={true}
                    nodeVisibility={(node) => {
                      if (collapsedClusters.includes(node.clusterId)) {
                        return false;
                      } else return true;
                    }}
                    linkVisibility={(link) => {
                      if (
                        collapsedClusters.includes(link.source.id) &&
                        !link.target.isClusterNode
                      ) {
                        return false;
                      } else if (
                        hiddenClusters.includes(link.source.id) ||
                        hiddenClusters.includes(link.target.id)
                      ) {
                        return false;
                      } else return true;
                    }}
                  />
              </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default SearchCompetanceScreen