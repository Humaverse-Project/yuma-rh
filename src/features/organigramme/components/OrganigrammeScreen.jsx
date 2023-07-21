import React from 'react';
import HeaderInScreen from '../../header/HeaderInScreen';
import { Box, Typography } from '@mui/material';
import './Organigramme.css';

const OrganigrammeNode = ({ data }) => (
  <Box className="node" p={2} m={1}>
    <Typography variant="h6" color="primary">
      {data.name}
    </Typography>
    <Typography variant="body1" color="textSecondary">
      {data.position}
    </Typography>
    {data.children && (
      <Box display="flex" flexDirection="row" mt={2}>
        {data.children.map((child) => (
          <OrganigrammeNode key={child.name} data={child} />
        ))}
      </Box>
    )}
  </Box>
);

const organigrammeData = {
  name: 'PDG',
  position: 'CEO',
  children: [
    {
      name: 'Responsable RH',
      position: 'Responsable RH',
      children: [
        {
          name: 'Gestion du personnel',
          position: 'Manager',
          children: [
            {
              name: 'Gestion des performances',
              position: 'Superviseur',
              children: [
                { name: 'Formation', position: 'Formateur' },
                { name: 'Avantages sociaux', position: 'Responsable des avantages sociaux' },
              ],
            },
          ],
        },
        {
          name: 'Recrutement',
          position: 'Manager',
          children: [
            {
              name: 'Gestion des talents',
              position: 'Chasseur de têtes',
              children: [
                { name: 'Sourcing', position: 'Chargé de sourcing' },
                { name: 'Entretiens', position: 'Responsable des entretiens' },
              ],
            },
            { name: 'Relations avec les candidats', position: 'Recruteur' },
          ],
        },
      ],
    },
  ],
};

function OrganigrammeScreen() {
  return (
    <React.Fragment>
      <HeaderInScreen />
      <Box
        backgroundColor="background.paper"
        display={'flex'}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight={'88vh'}
        p={2}
      >
        <Typography variant="h4" color="primary">
          Modèle d'organigramme hiérarchique
        </Typography>
        <Box className="organigramme" mt={4}>
          <OrganigrammeNode data={organigrammeData} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
export default OrganigrammeScreen;
