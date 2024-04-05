import { useEffect, useState } from "react"
import store from "../../store"
import CodeMirror from '@uiw/react-codemirror';
import {html} from "@codemirror/lang-html"
import {css} from "@codemirror/lang-css"
import clsx from "clsx";

enum Mode{
    html, css, coords
}

export default function Result({close}:{close: React.Dispatch<React.SetStateAction<boolean>>}){

    const [value, setValue] = useState(store.render())
    const [mode, setMode] = useState(Mode.html);

    useEffect(() => {
      if(mode == Mode.css){
        setValue(store.getCssText())
      }
      if(mode == Mode.html){
        setValue(store.render())
      }
    }, [mode])
    
    
    return(
        <div className="absolute z-50 flex items-center justify-center w-full h-full bg-black left-0 bg-opacity-25">
            <div className="bg-[#49474E] min-h-[550px] min-w-[924px] py-3 px-3 flex flex-col gap-2">
                <div className="w-full flex">
                    <div className="flex gap-3">
                        <button onClick={()=>setMode(Mode.html)} className={clsx({"bg-[#625F69]" : mode == Mode.html},"border-[1px] ml-auto border-[#7C7A85] hover:bg-[#7C7A85] px-4 rounded-xl")}>Html</button>
                        <button onClick={()=>setMode(Mode.css)} className={clsx({"bg-[#625F69]" : mode == Mode.css},"border-[1px] ml-auto border-[#7C7A85] hover:bg-[#7C7A85] px-4 rounded-xl")}>Css</button>
                        <button onClick={()=>setMode(Mode.coords)} className={clsx({"bg-[#625F69]" : mode == Mode.coords},"border-[1px] ml-auto border-[#7C7A85] hover:bg-[#7C7A85] px-4 rounded-xl")}>Coordinates</button>
                    </div>
                    <button className="border-[1px] ml-auto border-[#7C7A85] hover:bg-[#7C7A85] px-1 rounded-xl" onClick={()=>close(false)}>close</button>
                </div>
                {(mode == Mode.html)?<CodeMirror
                value={value}
                className="text-[14px]"
                theme={"dark"}
                height={"500px"}
                width={"900px"}
                extensions={[html()]}
                contentEditable={false}
                />:<></>}
                {(mode == Mode.css)?<CodeMirror
                value={value}
                className="text-[14px]"
                theme={"dark"}
                height={"500px"}
                width={"900px"}
                extensions={[css()]}
                contentEditable={false}
                />:<></>}
            </div>
        </div>
    )
}