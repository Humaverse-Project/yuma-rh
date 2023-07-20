import { Icon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Row from "./Row";
import Text from "./Text";

function DynamicHeadNav({ title, secondSubtitle }) {
  return (
    <Row>
      <Icon sx={{fontSize: 38}} color="primary" component={HomeIcon} />
      <Text variant={"bigTitleBold"} ml={5} color="primary">{title}</Text>
      {secondSubtitle && (<Text variant={"bigTitleBold"} mx={2}> - </Text>)}
      {secondSubtitle && (<Text variant={"bigTitle"}>{secondSubtitle}</Text>)}
    </Row>
  );
}

export default DynamicHeadNav;
