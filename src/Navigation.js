import { Routes, Route } from 'react-router-dom'
import { HomeScreen, NotFoundScreen, OrganigrammeScreen } from './features'

function Navigation() {
    const allComponents = [
        {
            id: 1,
            path: '/',
            components: <HomeScreen />,
        },
        {
            id: 2,
            path: '/organigramme',
            components: <OrganigrammeScreen />,
        },
        {
            id: 3,
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
