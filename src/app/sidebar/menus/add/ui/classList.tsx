import { useEffect, useState } from "react";
import { PieceOptions } from "../../../../../types";
import store from "../../../../../store";
import CssClass from "./classButton";

export default function CSSClasses({set, cur}:{set: React.Dispatch<React.SetStateAction<PieceOptions>> , cur: PieceOptions}) {

    const [curList, setCurList] = useState(cur.classes);
    const [allList] = useState(store.getRules());

    useEffect(()=>{
        set(prev=>{return{...prev, classes: curList}});
    },[curList])

    function addClass(name: string){
        setCurList(prev=>{if(prev){return [...prev, name]}else{return [name]}});
    }

    function removeClass(name: string){
        setCurList(prev=>{if(prev){return prev.filter(el=>name !== el)}else{return []}});
    }

    return (
        <div className="flex pt-2 flex-col gap-3 px-[3%]">
            <span>Current classes</span>
            <div className='flex flex-wrap gap-1'>
                {(curList)?curList.map(cl=><CssClass remove={removeClass} clss={cl}/>):<></>}
            </div>
            <span>All classes (current exluded)</span>
            <div className='flex flex-wrap gap-1'>
                {(allList)?allList
                    .filter(el=>!curList?.includes(el.cssText.split(" {")[0].split('.')[1]))
                    .map(cl=><CssClass add={addClass} clss={cl.cssText.split(" {")[0].split('.')[1]}/>):<></>}
            </div>
        </div>
    )
}