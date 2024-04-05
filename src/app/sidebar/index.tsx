import { useState } from "react";
import AddMenu from "./menus/add";
import StyleMenu from "./menus/style";
import clsx from "clsx";

enum Mode{
    Elements,
    Stylesheet
}

export default function SideBar(){

    const [mode, setMode] = useState(Mode.Elements);

    return(
        <div className="h-[100vh] bg-[#49474E] text-white min-w-[280px] max-w-[280px] flex flex-col border-r-[1px] border-[#625F69]">
            <div className="flex flex-row py-1 px-[2px] gap-1 justify-center">       
                <button title="Elements" onClick={()=>setMode(Mode.Elements)} className={clsx({"bg-[#625F69]" : mode === Mode.Elements},"bg-[#49474E] border-[#625F69] border-[1px] w-[50%] hover:bg-[#7C7A85] px-4 rounded-lg")}>Elements</button>         
                <button title="Stylesheet" onClick={()=>setMode(Mode.Stylesheet)} className={clsx({"bg-[#625F69]" : mode === Mode.Stylesheet},"bg-[#49474E] border-[#625F69] border-[1px] w-[50%] hover:bg-[#7C7A85] px-4 rounded-lg")}>Stylesheet</button>  
            </div>
            {(mode === Mode.Elements)?<AddMenu/>:<></>}
            {(mode === Mode.Stylesheet)?<StyleMenu/>:<></>}
        </div>
    )
}