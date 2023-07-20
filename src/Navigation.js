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
    <div>
      <h1> Yuma RH</h1>
    </div>
  );
}

export default Navigation;
