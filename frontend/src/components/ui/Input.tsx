type Props = {
    styles?: string,
    value?: string
    readonly?: boolean
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ styles, value, readonly, placeholder, onChange }: Props) {
    return (
        <input
            className={styles}
            value={value}
            readOnly={readonly}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}