import { useTheme } from "./ThemeContext";

const ToggleTheme = () => {
    const {theme, toggleTheme} = useTheme();
    
    return (
        <button onClick={toggleTheme}>Current Theme: {theme}</button>
    );
}

export default ToggleTheme;