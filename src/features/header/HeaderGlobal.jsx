import { DynamicHeadNav, Text, Row } from "../../shared";
import { Icon } from "@mui/material";


//ICONES
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

function HeaderGlobal() {
  return (
    <Row justifyContent={"space-between"} px={3} height={90}>
        <DynamicHeadNav title={'ACCUEIL'} />
        <Text variant="bigTitleBold" color="blue.main">YUMA</Text>
        <Row width={100} justifyContent={"space-between"}>
            <Icon sx={{fontSize: 38}}  component={LanguageIcon} />
            <Icon sx={{fontSize: 38}}  component={SettingsIcon} />
        </Row>
    </Row>
  );
}

export default HeaderGlobal;
