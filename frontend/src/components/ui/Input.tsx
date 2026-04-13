type Props = {
    styles?: string,
    value?: string
    readOnly?: boolean
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ styles, value, readOnly, placeholder, onChange }: Props) {
    return (
        <input
            className={styles}
            value={value}
            readOnly={readOnly}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}