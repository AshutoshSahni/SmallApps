import Button from '../ui/Button'
import './Navbar.css'

type Props = {
  setCurrentApp: (app: 'notes' | 'calculator') => void,
  currentApp: string  
}

const Navbar = ({ setCurrentApp, currentApp }: Props) => {
  return (
    <div className='navbar'>
      <Button label="Notes" styles={currentApp === 'notes' ? 'font-bold bg-black text-white' : ''} onClick={() => setCurrentApp('notes')} />
      <Button label="Calculator" styles={currentApp === 'calculator' ? 'font-bold bg-black text-white' : ''} onClick={() => setCurrentApp('calculator')} />
    </div>
  )
}

export default Navbar