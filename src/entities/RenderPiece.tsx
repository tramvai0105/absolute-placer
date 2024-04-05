import clsx from "clsx";
import { PieceOptions } from "../types";
import CompileCss from "./compile";
import store from "../store";

export default function RenderPiece({ id = -1, left = "0", top = "0", opt, abs = true, pointer = false}: { id?: number, left?: string, top?: string, opt: PieceOptions, abs?: boolean, pointer?: boolean }) {
    
    let cssCompiler = new CompileCss(opt, store.configCss)
    let pos = {left: left, top: top};

    return (
        <div style={ {...cssCompiler.styleList, ...pos} } id={`piece_${id}`}
            className={clsx(
                `absolute overflow-hidden flex`, opt?.classes, cssCompiler.classList)}>
            {opt?.text?
            <span className={clsx(cssCompiler.textClassList,"select-none whitespace-break-spaces")}>
                {opt?.text}
            </span>:<></>}
        </div>
    )
}