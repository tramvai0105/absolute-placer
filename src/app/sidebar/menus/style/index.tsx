import { useEffect, useRef, useState } from "react";
import store from "../../../../store";
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import {css} from "@codemirror/lang-css"
import { observer } from "mobx-react-lite";
import clsx from "clsx";

function StyleMenu() {

    const [rules, setRules] = useState(store.getRules());
    const [curId, setCurId] = useState(-1)
    const editorRef = useRef<ReactCodeMirrorRef>(null)
    const [edit, setEdit] = useState(false)
    const [editVal, setEditVal] = useState(".test { color : red;}")
    const saveText = useRef<string>("")
    const [showInfo, setShowInfo] = useState(false);

    console.log(store.styleSheet);

    function addClassStyle(){
        let styleClass = editVal;
        let testSheet = new CSSStyleSheet();
        let reg = /\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s*\{.*\}/g;
        let match = styleClass.replaceAll("\n", " ").replaceAll(" ", "").match(reg);
        if(match == null){
            alert("Rule not found")
            return
        }
        if(match.length != 1){
            alert("Only one class at a time")
            return
        }
        try{
            testSheet.insertRule(styleClass);
            console.log(testSheet.cssRules[0].cssText);
        }catch(error){
            alert("Invalid css code. Check console for more info.")
            console.log(error);
            return;
        }
        store.addStyleRule(styleClass);
        setRules(store.getRules())
    }

    function editRule(id: number){
        setEdit(true);
        setCurId(id);
        saveText.current = editVal;
        setEditVal(store.getRule(id).cssText.replaceAll(";", ";\n   ").replace("{","{\n   ").replace("   }", "}"))
    }
    
    function cancelEdit(){
        setEdit(false);
        setCurId(-1);
        setEditVal(saveText.current)
    }

    function removeRule(){
        store.removeStyleRule(curId);
        cancelEdit();
        setRules(store.getRules());
    }

    function saveRule(){
        store.editStyleRule(curId, editVal)
        setEdit(false);
        setCurId(-1);
        setEditVal(saveText.current)
        setRules(store.getRules());
    }

    return (
        <div className="bg-[#49474E] items-center pt-2 relative px-[3%] select-none flex flex-col border-[#7C7A85] border-y-[1px] w-full h-full">
            <button onClick={()=>setShowInfo(prev=>!prev)} className={`pb-2 ml-auto mr-2 hover:underline`}>info</button>
            {showInfo?<div className="pt-4 pl-2 w-[260px] h-[200px] absolute translate-y-[15%] bg-[#625F69] shadow-[#323035] shadow-lg z-50 mr-auto">
                With this menu you can write css class rules. You can apply this classes to the elements in the element editor. You can add or edit only one rule at a time.</div>:<></>}
            <code>
                <CodeMirror 
                value={editVal}
                onChange={(v)=>setEditVal(v)}
                className="text-[14px]"
                theme={"dark"}
                height={"200px"}
                width={"270px"}
                extensions={[css()]}
                />
            </code>
            {(edit)
                ?
                <div className="flex flex-row gap-2">
                    <button className="my-2 px-6 border-[#625F69] border-[1px] rounded-xl w-fit hover:bg-[#625F69]" onClick={saveRule}>Save rule</button>
                    <button className="my-2 px-2 border-[#625F69] border-[1px] rounded-xl w-fit hover:bg-[#625F69]" onClick={cancelEdit}>Cancel</button>
                    <button title="Delete rule" className="my-2 px-2 bg-[#EC5D5E] border-[#625F69] border-[1px] rounded-md w-fit hover:bg-[#E5484D]" onClick={removeRule}>Del</button>
                </div>
                :
                    <button className="my-2 px-6 border-[#625F69] border-[1px] rounded-xl w-fit hover:bg-[#625F69]" onClick={addClassStyle}>Add style class</button>
                }
            <span className="border-t-[1px] py-1 w-full text-center border-[#625F69]">Rules list</span>
            <div className="flex p-2 flex-wrap overflow-y-auto h-auto max-h-[350px] w-full gap-1">
                {rules.map((rule, key)=>{
                    return <CssRuleButton select={curId == key} edit={editRule} key={key} id={key} rule={rule.cssText}/>
                })}
            </div>
        </div>
    )
}

function CssRuleButton({rule, id, edit, select}:{rule:string, id: number, edit: (id: number)=> void, select: boolean}){
    return(
        <button onClick={()=>edit(id)} className={clsx({"border-white":select},"px-4 border-[#625F69] h-fit border-[2px] w-auto bg-[#625F69] rounded-xl")}>{rule.split("{")[0].slice(1)}</button>
    )
}

let observedStyleMenu = observer(StyleMenu)

export default observedStyleMenu;