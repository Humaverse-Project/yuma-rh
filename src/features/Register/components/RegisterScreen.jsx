import { useState } from 'react'

import ScreenOne from './ScreenOne'
import ScreenTwo from './ScreenTwo'

export default function RegisterScreen() {
    const [screen, setScreen] = useState(1);
    const [formData, setFormData] = useState({});

    return (
        <>
            {screen === 1 && <ScreenOne setScreen={setScreen} setFormData={setFormData} />}
            {screen === 2 && <ScreenTwo formData={formData}/>}
        </>
    )
}
