import HeaderGlobal from "../../header/HeaderGlobal";

//import SHARED
import {MainScreen, Text} from "../../../shared";
import { Box } from "@mui/system";

function HomeScreen() {
  return (
    <MainScreen>
      <HeaderGlobal />
      <Box backgroundColor="background.default">
        <Text variant="bigTitleBold" color="primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Text>
      </Box>
    </MainScreen>
  );
}

export default HomeScreen;
