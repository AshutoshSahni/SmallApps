interface ButtonProps {
    label: string,
    styles?: string,
    onClick?: () => void,
    isActive?: boolean,
    disabled?: boolean
}

export default function Button({ label, styles, onClick, isActive, disabled }: ButtonProps) {

    const activeStyles =
        `active:bg-(--pallete-color-1)
            active:text-(--pallete-color-5)
            dark:active:bg-(--pallete-color-5)
            dark:active:text-(--pallete-color-1)
            active:scale-95
            active:font-bold`;

    return (
        <button type="button" disabled={disabled} className={`
            px-4 py-2
            rounded-sm
            shadow-normal
            dark:shadow-glow
            hover:bg-(--pallete-color-1)
            hover:text-(--pallete-color-5)
            dark:hover:bg-(--pallete-color-5)
            dark:hover:text-(--pallete-color-1)
            transition-colors duration-400 ease-in-out
            ${activeStyles}

            ${isActive ? 'active:scale-95 font-bold' : ''}
            ${styles || ''}
            `}
            onClick={onClick}>
            {label}
        </button>
    )
}