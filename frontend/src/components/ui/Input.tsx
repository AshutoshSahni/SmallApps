type Props = {
    styles?: string,
    expression?: string
    readonly?: boolean
}

export default function Input({ styles, expression, readonly }: Props) {
    return(
        <input className={styles} value={expression} readOnly={readonly} />
    )
}