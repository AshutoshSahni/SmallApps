import { useNavigate } from "react-router-dom";
import ToggleTheme from "../../components/ui/ToggleTheme";
import { AuthService } from "../../services/AuthService";

type Props = {
    currentApp: string
}

const Topbar = ({ currentApp }: Props) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/', { replace: true });
    }

    return (
        <div className='grid grid-cols-3 items-center topbar px-4 h-[6dvh]'>
            <div><h1 className='text-[clamp(1rem,3vw,1.875rem)] font-bold'>SmallApps</h1></div>
            <div className='text-[clamp(0.875rem,2.5vw,1.25rem)] text-center'><h2>{currentApp.toUpperCase()}</h2></div>
            <div className='flex justify-end'>
                <ToggleTheme />
                <button className="ml-4 px-3 py-1 rounded bg-(--pallete-color-2) text-(--pallete-color-1) text-sm" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Topbar