import { useState } from 'react'

import ScreenOne from './ScreenOne'
import ScreenTwo from './ScreenTwo'

export default function RegisterScreen() {
    const [screen, setScreen] = useState(1)
    return (
        <>
            {screen === 1 && <ScreenOne setScreen={setScreen} />}
            {screen === 2 && <ScreenTwo />}
        </>
    )
}
