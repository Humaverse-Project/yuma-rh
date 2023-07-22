import { DynamicHeadNav, Row } from '../../shared';
import { Button, useMediaQuery } from '@mui/material';

// ICONES
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@emotion/react';

function HeaderInOrgan() {
  const theme = useTheme();
  const matcheSM = useMediaQuery(theme.breakpoints.up('sm'));
  const matcheMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Row justifyContent={'space-between'} px={3} height={'10vh'}>
      <DynamicHeadNav title={'Organigramme'} />
      {matcheSM && (
        <Row>
          <Button variant="contained" color="primary" sx={{ marginRight: '16px' }}>
            Créer un poste
          </Button>
          <Button variant="contained" color="primary">
            Connection SIRH
          </Button>
        </Row>
      )}
    </Row>
  );
}

export default HeaderInOrgan;