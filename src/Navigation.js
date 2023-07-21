import { Routes, Route } from 'react-router-dom'
import {
    HomeScreen,
    NotFoundScreen,
    OrganigrammeScreen,
    LoginScreen,
    RegisterScreen,
} from './features'

function Navigation() {
    const allComponents = [
        {
            id: 1,
            path: '/',
            components: <LoginScreen />,
        },
        {
            id: 2,
            path: '/home',
            components: <HomeScreen />,
        },
        {
            id: 3,
            path: '/register',
            components: <RegisterScreen />,
        },
        {
            id: 4,
            path: '/organigramme',
            components: <OrganigrammeScreen />,
        },
        {
            id: 5,
            path: '*',
            components: <NotFoundScreen />,
        },
    ]

    return (
        <>
            <Routes>
                {allComponents.map((component) => {
                    return (
                        <Route
                            path={component.path}
                            element={component.components}
                            key={component.id}
                        />
                    )
                })}
            </Routes>
        </>
    )
}

export default Navigation
