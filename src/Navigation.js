import { Routes, Route } from 'react-router-dom';
import {HomeScreen} from './features';

function Navigation() {
  const allComponents = [
    {
      id: 1,
      path: "/",
      components: <HomeScreen />
    }
  ]

  return (
    <>
       <Routes>
        {allComponents.map((component) => {
          return (
              <Route path={component.path} element={component.components} key={component.id} />
          )
        })}
       </Routes>
    </>
  );
}

export default Navigation;
