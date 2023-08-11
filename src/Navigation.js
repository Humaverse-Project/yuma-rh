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
    PostForm,
    StoreScreen,
    PlaningFormationScreen,
    NomenclatureHomeScreen
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
        {
            id: 8,
            path: '/poste',
            components: <PostForm />,
        },
        {
            id: 9,
            path: '/store',
            components: <StoreScreen />,
        },
        {
          id: 10,
          path: '/planing',
          components: <PlaningFormationScreen />,
        },
        {
            id: 11,
            path: '/nomenclature',
            components: <NomenclatureHomeScreen />,
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
