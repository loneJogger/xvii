import { useState } from 'react'
import { NestedMenuPhaser } from '../components/phaser'

const Test = () => {

    const [ currentPhaser, setCurrentPhaser ] = useState('')

    return (
        <div>
            <h1>Phaser practice</h1>
            <div>
                <select onChange={(e) => setCurrentPhaser(e.target.value)}>
                    <option value={'none'}>none</option>
                    <option value={'nestedMenu'}>a title screen with a main menu</option>
                </select>
            </div>
            <div>

                {(currentPhaser === 'nestedMenu') && (
                    <NestedMenuPhaser />
                )}
            </div>
        </div>
    )
}

export default Test