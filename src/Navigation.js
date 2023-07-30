import { Routes, Route } from 'react-router-dom'
import {
    HomeScreen,
    NotFoundScreen,
    OrganigrammeScreen,
    LoginScreen,
    RegisterScreen,
    ProfilScreen,
    ManageCompetence,
    ParametreScreen,
    MetierForm,
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
            id: 2,
            path: '/organigramme',
            components: <OrganigrammeScreen />,
        },
        {
            id: 3,
            path: '*',
            components: <NotFoundScreen />,
        },
        {
            id: 4,
            path: '/profil',
            components: <ProfilScreen />,
        },
        {
            id: 5,
            path: '/manageCompetence',
            components: <ManageCompetence />,
        },
        {
            id: 6,
            path: '/setting',
            components: <ParametreScreen />,
        },
        {
            id: 7,
            path: '/metier',
            components: <MetierForm />,
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
