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
    PostForm,
    FormationHomeScreen,
    PlaningFormationScreen,
    NomenclatureHomeScreen,
    MetierDetailScreen,
    MetierScreen,
    CompetanceScreen,
    CompetanceDetailScreen,
    SearchCompetanceScreen,
    PropositionHomeScreen,
    PropositionPageScreen,
    GestionFormationTestScreen,
    StoreFormationetTest,
    PersonneHomeScreen,
    PersonneGestion,
    SettingAccount,
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
            path: '/poste',
            components: <PostForm />,
        },
        {
            id: 8,
            path: '/store',
            components: <FormationHomeScreen />,
        },
        {
            id: 9,
            path: '/planing',
            components: <PlaningFormationScreen />,
        },
        {
            id: 10,
            path: '/nomenclature',
            components: <NomenclatureHomeScreen />,
        },
        {
            id: 11,
            path: '/metier',
            components: <MetierScreen />,
        },
        {
            id: 12,
            path: '/metierdetail/:code',
            components: <MetierDetailScreen />,
        },
        {
            id: 13,
            path: '/competance',
            components: <CompetanceScreen />,
        },
        {
            id: 14,
            path: '/competancedetail/:code',
            components: <CompetanceDetailScreen />,
        },
        {
            id: 15,
            path: '/searchcompetance',
            components: <SearchCompetanceScreen />,
        },
        {
            id: 16,
            path: '/propositionhome',
            components: <PropositionHomeScreen />,
        },
        {
            id: 17,
            path: '/propositionpage',
            components: <PropositionPageScreen />,
        },
        {
            id: 18,
            path: '/gestionformation',
            components: <GestionFormationTestScreen />,
        },
        {
            id: 19,
            path: '/storeplus',
            components: <StoreFormationetTest />,
        },
        {
            id: 20,
            path: '/personnehome',
            components: <PersonneHomeScreen />,
        },
        {
            id: 21,
            path: '/organigramme',
            components: <OrganigrammeScreen />,
        },
        {
            id: 22,
            path: '*',
            components: <NotFoundScreen />,
        },
        {
            id: 23,
            path: '/gestionpersonnel',
            components: <PersonneGestion />,
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
