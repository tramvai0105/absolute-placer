import dot from "../../../../../img/dotEdgeless.svg"
import doth from "../../../../../img/dotHidden.svg"

export default function Dot({ show }: { show: boolean }) {
    if (show) return (
        <img width={6} height={6} src={dot} />
    )
    else return (
        <img width={6} height={6} src={doth} />
    )
}