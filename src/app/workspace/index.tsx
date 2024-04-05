import Field from "./field";
import { useState } from "react";
import Result from "./result";
import ConfigMenu from "./config";

export default function WorkSpace(){

    const [showResult, setShowResult] = useState(false);
    const [showConfigMenu, setShowConfigMenu] = useState(false);

    return(
        <div className="flex flex-col select-none w-full text-white h-[100vh]">
            <div className="w-full h-12 items-center flex gap-2 pl-2 border-[#7C7A85] border-b-[1px]">
                <span className="text-[18px] italic border-[1px] rounded-xl px-3">absolute-placer-util</span>
                <button onClick={()=>setShowResult(true)} className="border-[2px] border-white hover:bg-[#7C7A85] rounded-md px-2 py-1">Code result</button>
                <button onClick={()=>setShowConfigMenu(true)} className="border-[1px] border-[#7C7A85] hover:bg-[#7C7A85] rounded-md px-2 py-1">Options</button>
            </div>
            <Field/>
            {showResult ? <Result close={setShowResult}/> : <></>}
            {showConfigMenu ? <ConfigMenu close={setShowConfigMenu}/> : <></>}
        </div>
    )
}