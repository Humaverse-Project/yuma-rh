import HeaderGlobal from "../../header/HeaderGlobal";

import {Column, MainScreen, Text} from "../../../shared";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import {CardItem} from "./CardNavigation";

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
        <Column>
          <Card>{CardItem}</Card>
        </Column>
      </Box>
    </MainScreen>
  );
}

export default HomeScreen;
