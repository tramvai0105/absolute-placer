import clsx from "clsx";
import { PieceCommutationOptions, PieceOptions } from "../types";
import React, { useEffect, useRef, useState } from "react";

export default function Piece({ id = -1, left = "0", top = "0", opt, comm, abs = true, pointer = false, onlist = false, prewiew = false }: { id?: number, left?: string, top?: string, opt?: PieceOptions, comm?: PieceCommutationOptions, abs?: boolean, pointer?: boolean, onlist?: boolean, prewiew?: boolean }) {

    const pieceRef = useRef<HTMLDivElement>(null);
    const [styles, setStyles] = useState<React.CSSProperties>({ width: 0 })

    function scaleDims() {
        if (onlist) {
            if (opt && opt.h + 0.01 > opt.w && opt.h > 70) {
                let s = 70 / opt.h;
                return { h: 70, w: Math.ceil(opt.w * s), s: s };
            }
            if (opt && opt.w > opt.h && opt.w > 92) {
                let s = 92 / opt.w;
                return { w: 92, h: Math.ceil(opt.h * s), s: s };
            }
        }
        if (prewiew) {
            if (opt && opt.h + 0.01 > opt.w && opt.h + 0.01 > 150) {
                let s = 150 / opt.h;
                return { h: 150, w: Math.ceil(opt.w * s), s: s };
            }
            if (opt && opt.w > opt.h && opt.w > 150) {
                let s = 150 / opt.w;
                return { w: 150, h: Math.ceil(opt.h * s), s: s };
            }
        }
        return { w: opt?.w, h: opt?.h, s: 1 }
    }

    useEffect(() => {
        setStyles(prev => addStyles(prev));
    }, [opt, comm, left, top])

    function addStyles(_styles: React.CSSProperties) {
        let styles = { ..._styles }
        if(!pieceRef.current) {
            return styles
        }
        styles.left = left;
        styles.top = top;
        if(comm?.w) {
            styles.width = (onlist || prewiew) ? scaleDims()?.w : opt?.w;
        } else {
            styles.width = undefined;
        }
        if(comm?.h) {
            styles.height = (onlist || prewiew) ? scaleDims()?.h : opt?.h;
        } else {
            styles.height = undefined;
        }
        if(comm?.color) {
            styles.backgroundColor = opt?.color;
        } else {
            styles.backgroundColor = undefined;
        }
        if(comm?.border) {
            if (comm?.borderColor) {
                styles.borderColor = opt?.borderColor;
            }
            styles.borderLeftWidth = (opt?.borders.l) ? (onlist || prewiew) ? scaleDims()?.s * opt.border : opt?.border : 0;
            styles.borderRightWidth = (opt?.borders.r) ? (onlist || prewiew) ? scaleDims()?.s * opt.border : opt?.border : 0;
            styles.borderTopWidth = (opt?.borders.t) ? (onlist || prewiew) ? scaleDims()?.s * opt.border : opt?.border : 0;
            styles.borderBottomWidth = (opt?.borders.b) ? (onlist || prewiew) ? scaleDims()?.s * opt.border : opt?.border : 0;
        } else {
            styles.borderColor = undefined;
            styles.borderLeftWidth = undefined;
            styles.borderRightWidth = undefined;
            styles.borderTopWidth = undefined;
            styles.borderBottomWidth = undefined;
        }
        if(comm?.rounded) {
            styles.borderTopLeftRadius = (opt?.rounds.tl) ? opt?.rounded : 0;
            styles.borderTopRightRadius = (opt?.rounds.tr) ? opt?.rounded : 0;
            styles.borderBottomLeftRadius = (opt?.rounds.bl) ? opt?.rounded : 0;
            styles.borderBottomRightRadius = (opt?.rounds.br) ? opt?.rounded : 0;
        } else {
            styles.borderTopLeftRadius = undefined;
            styles.borderTopRightRadius = undefined;
            styles.borderBottomLeftRadius = undefined;
            styles.borderBottomRightRadius = undefined;
        }
        if(comm?.rotation){
            styles.rotate = (!onlist) ? opt?.rotation + "deg" : "0deg";
        } else {
            styles.rotate = undefined;
        }
        if(comm?.textOpts.p){
            styles.padding = (opt?.text) ? opt?.textOpts.p : 0;
        } else {
            styles.padding = undefined;
        }
        if(comm?.textOpts.align){
            if(opt?.textOpts.vert == "t"){
                styles.alignItems = "start"
            }
            if(opt?.textOpts.vert == "c"){
                styles.alignItems = "center"
            }
            if(opt?.textOpts.vert == "b"){
                styles.alignItems = "end"
            }
            if(opt?.textOpts.hort == "l"){
                styles.justifyContent = "start"
            }
            if(opt?.textOpts.hort == "c"){
                styles.justifyContent = "center"
            }
            if(opt?.textOpts.hort == "r"){
                styles.justifyContent = "end"
            }
        } else {
            styles.justifyContent = undefined;
            styles.alignItems = undefined;
        }
        styles.position = abs ? "absolute" : "static";
        return styles
    }

    return (
        <div ref={pieceRef} style={styles} id={`piece_${id}`}
            className={clsx(
                {
                    "rounded-none": opt?.rounded == "",
                    "rounded-sm": opt?.rounded == "sm",
                    "rounded-md": opt?.rounded == "md",
                    "rounded-lg": opt?.rounded == "lg",
                    "rounded-xl": opt?.rounded == "xl",
                    "rounded-2xl": opt?.rounded == "2xl",
                    "": typeof opt?.rounded == "number",
                    "rounded-full": opt?.rounded == "full",
                },
                {
                    "cursor-pointer": pointer,
                },
                opt?.classes?.reduce((acc, cur) => acc + " " + cur, ""),
                `overflow-hidden flex`)}>
            {opt?.text ?
                <span className="select-none whitespace-break-spaces" style={{
                    color: opt.textOpts.color,
                    fontSize: opt.textOpts.size * scaleDims()?.s,
                }}>
                    {opt?.text}
                </span> : <></>}
        </div>
    )
}