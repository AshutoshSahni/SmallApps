import './Navbar.css'
import {
  CalculatorIcon as CalculatorIconOutline,
  PencilSquareIcon as PencilSquareIconOutline,
} from '@heroicons/react/24/outline'
import { 
  CalculatorIcon as CalculatorIconSolid,
  PencilSquareIcon as PencilSquareIconSolid
} from '@heroicons/react/24/solid'

type Props = {
  setCurrentApp: (app: 'notes' | 'calculator') => void,
  currentApp: string
}

const Navbar = ({ setCurrentApp, currentApp }: Props) => {
  return (
    <div className='navbar'>
      {currentApp === 'calculator' ? <CalculatorIconSolid className={'w-10 h-10'} /> : <CalculatorIconOutline className={'w-10 h-10'} onClick={() => setCurrentApp('calculator')} />}
      {currentApp === 'notes' ? <PencilSquareIconSolid className={'w-10 h-10'} /> : <PencilSquareIconOutline className={'w-10 h-10'} onClick={() => setCurrentApp('notes')} />}
    
    </div>
  )
}

export default Navbar