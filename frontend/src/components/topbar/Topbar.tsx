import ToggleTheme from "../../components/ui/ToggleTheme";

type Props = {
    currentApp: string
}

const Topbar = ({ currentApp }: Props) => {
    return (
        <div className='grid grid-cols-3 items-center topbar px-4 h-[6dvh]'>
            <div><h1 className='text-[clamp(1rem,3vw,1.875rem)] font-bold'>SmallApps</h1></div>
            <div className='text-[clamp(0.875rem,2.5vw,1.25rem)] text-center'><h2>{currentApp.toUpperCase()}</h2></div>
            <div className='flex justify-end'>
                <ToggleTheme />
                <div className='h-10 w-10 rounded-full overflow-hidden'>
                    <img className='object-cover w-full h-full' src="https://avatars.githubusercontent.com/u/110792732?v=4" alt="User Profile" />
                </div>
            </div>
        </div>
    )
}

export default Topbar