type Props = {
    type?: string,
    styles?: string,
    value?: string
    readOnly?: boolean
    placeholder?: string,
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ type, styles, value, readOnly, placeholder, required, onChange }: Props) {
    return (
        <input
            type={type}
            className={`w-full rounded-sm px-2 py-3 ${styles}`}
            value={value}
            readOnly={readOnly}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
        />
    )
}