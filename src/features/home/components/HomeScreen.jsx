import HeaderGlobal from "../../header/HeaderGlobal";

//import SHARED
import {MainScreen, Text} from "../../../shared";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

function HomeScreen() {
   const [divHeight, setDivHeight] = useState(0);
  
  useEffect(() => {
    const headerHeight = 110;
    const remainingHeight = window.innerHeight - headerHeight;
    setDivHeight(remainingHeight);
  }, []);


  return (
    <MainScreen mx={0} px={0}>
      <HeaderGlobal />
      <Box backgroundColor="background.paper" display={"flex"} justifyContent="center" alignItems="center" height={divHeight}>
        <Text variant="bigTitleBold" color="primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Text>
      </Box>
    </MainScreen>
  );
}

export default HomeScreen;
