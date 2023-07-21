import { Routes, Route } from 'react-router-dom'
import { HomeScreen, LoginScreen, RegisterScreen } from './features'

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
