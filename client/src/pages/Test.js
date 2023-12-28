import { useState } from 'react'
import HWGame from '../components/phaser/HelloWorld'
import Tu1Game from '../components/phaser/Tutorial1'

const Test = () => {

    const [ currentPhaser, setCurrentPhaser ] = useState('')

    return (
        <div>
            <h1>Phaser practice</h1>
            <div>
                <select onChange={(e) => setCurrentPhaser(e.target.value)}>
                    <option value={'none'}>none</option>
                    <option value={'hwGame'}>hello world</option>
                    <option value={'tu1Game'}>tutorial 1</option>
                </select>
            </div>
            <div>
                {(currentPhaser === 'hwGame') && (
                    <HWGame />
                )}
                {(currentPhaser === 'tu1Game') && (
                    <Tu1Game />
                )}
            </div>
        </div>
    )
}

export default Test