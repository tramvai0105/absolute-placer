import store, { Component } from "../../../store"
import MenuOptions from "./options"
import rot from "../../../img/rot.svg"

export default function Menu({ x, y, id, edit, changeMenu, remove }: { x: number, y: number, id: number, edit: boolean, changeMenu: (state: boolean) => void, remove: (id: number) => void }) {
    
    let element = store.get(id) as Component;

    if (edit) {
        return (
            <div id="menu" style={{
                top: y,
                left: x,
            }}
                className="border-[2px] z-40 shadow-sm shadow-black rounded-md select-none flex flex-col px-1 text-white absolute w-[250px] h-[190px] border-[#7C7A85] bg-[#49474E]">
                <MenuOptions close={() => changeMenu(false)} id={id} />
            </div>
        )
    }

    return (
        <div id="menu" style={{
            top: y,
            left: x,
        }}
            className="border-[2px] z-40 shadow-sm shadow-black rounded-md select-none gap-2 flex flex-col py-1 text-white absolute w-[100px] h-[135px] border-[#7C7A85] bg-[#49474E]">
            <div className="flex gap-1 flex-row px-1">
                <span className="min-w-[16px]">X</span>
                <input onChange={(e) => store.setX(id, Number(e.target.value))} type="number" className="bg-[#7C7A85] pl-1 w-[60px]" value={element.props.left?.split("px")[0]} />
            </div>
            <div className="flex gap-1 flex-row px-1">
                <span className="min-w-[16px]">Y</span>
                <input onChange={(e) => store.setY(id, Number(e.target.value))} type="number" className="bg-[#7C7A85] pl-1 w-[60px]" value={element.props.top?.split("px")[0]} />
            </div>
            <div className="flex gap-1 flex-row px-1">
                <img width={16} height={16} src={rot} alt="deg" />
                <input onChange={(e) => store.setZ(id, Number(e.target.value))} type="number" className="bg-[#7C7A85] pl-1 w-[60px]" value={element.props.opt?.z || 0} />
            </div>
            <div className="flex flex-row gap-[2px] px-[2px]">
                <button onClick={() => changeMenu(true)} title={"Options"} className="mt-auto rounded-lg border-[1px] text-[12px] p-1 px-1 border-[#7C7A85] hover:bg-[#625F69] hover:underline">OPTIONS</button>
                <button onClick={() => remove(id)} title="Remove" className="mt-auto rounded-lg border-[1px] text-[12px] p-1 px-2 border-[#7C7A85] bg-[#EC5D5E] hover:bg-[#E5484D]">X</button>
            </div>
        </div>
    )
}
