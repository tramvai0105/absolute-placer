import clsx from "clsx";
import { useEffect, useState } from "react";
import store from "../../../store";
import { PieceOptions } from "../../../types";
import Dot from "../../sidebar/menus/add/ui/dot";
import rot from "../../../img/rot.svg"

export default function MenuOptions({ id, close }: { id: number, close: () => void }) {

    const [cur, setCur] = useState<PieceOptions>(store.getOpts(id))
    const [sides, setSides] = useState(store.getOpts(id).borders)
    const [rSides, setRSides] = useState(store.getOpts(id).rounds)
    const [optPage, setOptPage] = useState(0);

    useEffect(() => {
        setCur(store.getOpts(id));
    }, [id])

    useEffect(() => {
        store.set(id, cur);
    }, [cur])

    function checkRadiusType(r: any) {
        // let s = ["sm", "md", "lg", "xl", "2xl", "full"];
        if (r == "") {
            return "";
        }
        if (Number.isNaN(Number(r))) {
            return r;
        }
        if (!Number.isNaN(Number(r))) {
            console.log(r);
            return Number(r);
        }
        if (typeof r == "undefined") {
            return undefined;
        }
    }

    function setBorders(w: number) {
        setCur(cur => { return { ...cur, border: w, borders: sides } })
    }

    function setRounds(w: number | string | undefined) {
        setCur(cur => { return { ...cur, rounded: w, rounds: rSides } })
    }

    useEffect(() => {
        setBorders(cur.border);
    }, [sides])

    useEffect(() => {
        setRounds(cur.rounded);
    }, [rSides])

    return (
        <>
            <button onClick={close} className='absolute border-[1px] px-1 border-[#7C7A85] hover:bg-[#625F69] left-[100%] text-[12px] -translate-x-[130%] translate-y-[20%] border-'>X</button>
            <div className="flex flex-col text-[14px] h-full">
                <div className='flex flex-row w-full gap-6 items-center'>
                    {optPage == 0 ? <span>Options</span> : <></>}
                    {optPage == 1 ? <span>Content</span> : <></>}
                    {optPage == 0 ? <button onClick={() => setOptPage(1)} title='Content' className='border-b-[2px] border-x-[2px] rounded-b-md border-[#7C7A85] px-1 hover:bg-[#7C7A85]'>cont</button> : <></>}
                    {optPage == 1 ? <button onClick={() => setOptPage(0)} title='Options' className='border-b-[2px] border-x-[2px] rounded-b-md border-[#7C7A85] px-1 hover:bg-[#7C7A85]'>opts</button> : <></>}
                    {/* <input value={cur.name} spellCheck="false" onChange={(e)=>setCur(prev=>{return {...prev, name: e.target.value}})} 
                className='bg-[#49474E] h-[] pl-1 w-[40%] border-[#7C7A85] border'/> */}
                </div>
                {optPage == 0 ?
                    <div className="flex pt-2 flex-col gap-1 px-[3%]">
                        <div className='flex flex-row items-center w-full'>
                            <div className="flex flex-row gap-1">
                                <span className="mr-1 w-[20px]">W</span>
                                <input type="number" value={cur?.w} onChange={(e) => setCur(prev => { return { ...prev, w: Number(e.target.value) } })}
                                    className="bg-[#625F69] pl-1 border border-[#7C7A85] w-[50%]" />
                            </div>
                            <span className="ml-2 w-[105px]">Fill color</span>
                            <input spellCheck="false" type="color" value={cur?.color} onChange={(e) => setCur(prev => { return { ...prev, color: e.target.value } })}
                                className="bg-[#625F69] px-1 my-auto h-[25px] border border-[#7C7A85] w-[50%]" />
                        </div>
                        <div className="flex items-center flex-row">
                            <div className="flex flex-row gap-1">
                                <span className="mr-1  w-[20px]">H</span>
                                <input type="number" value={cur?.h} onChange={(e) => setCur(prev => { return { ...prev, h: Number(e.target.value) } })}
                                    className="bg-[#625F69] pl-1 border border-[#7C7A85] w-[50%]" />
                            </div>
                            <span className="ml-2 w-[105px]">Border color</span>
                            <input spellCheck="false" type='color' value={cur?.borderColor || "#FFFFFF"} onChange={(e) => setCur(prev => { return { ...prev, borderColor: e.target.value } })}
                                className="bg-[#625F69] px-1 my-auto h-[25px] border border-[#7C7A85] w-[50%]" />
                        </div>
                        <div className='flex items-center flex-row gap-1 border-[#7C7A85]'>
                            <button title='Left border' onClick={() => setSides(sides => { return { ...sides, l: !sides.l } })} className={clsx({ 'border-[#7C7A85]': sides.l }, 'ml-auto px-1 border-l-[2px] border-[#49474E] hover:bg-[#7C7A85]')}>L</button>
                            <button title='Right border' onClick={() => setSides(sides => { return { ...sides, r: !sides.r } })} className={clsx({ 'border-[#7C7A85]': sides.r }, 'ml-auto px-1 border-r-[2px] border-[#49474E] hover:bg-[#7C7A85]')}>R</button>
                            <button title='Top border' onClick={() => setSides(sides => { return { ...sides, t: !sides.t } })} className={clsx({ 'border-[#7C7A85]': sides.t }, 'ml-auto px-1 border-t-[2px] border-[#49474E] hover:bg-[#7C7A85]')}>T</button>
                            <button title='Bottom border' onClick={() => setSides(sides => { return { ...sides, b: !sides.b } })} className={clsx({ 'border-[#7C7A85]': sides.b }, 'ml-auto px-1 border-b-[2px] border-[#49474E] hover:bg-[#7C7A85]')}>B</button>
                            <span className="mr-1 ml-4">Border</span>
                            <input type='number' value={cur.border} onChange={(e) => setBorders(Number(e.target.value))}
                                className="bg-[#625F69] pl-1 my-auto h-[25px] border border-[#7C7A85] w-[28%]" />
                        </div>
                        <div className="flex items-center flex-row gap-2 mt-1">
                            <img width={16} height={16} src={rot} alt="deg" />
                            <input onChange={(e) => setCur(prev => { return { ...prev, rotation: Number(e.target.value) } })} type="number" className="bg-[#7C7A85] pl-1 w-[50px]" value={cur.rotation} />
                            <span className="">Radius</span>
                            <input spellCheck="false" value={cur?.rounded} onChange={(e) => setCur(prev => { return { ...prev, rounded: checkRadiusType(e.target.value) } })}
                                className="bg-[#625F69] ml-auto pl-1 border border-[#7C7A85] w-[50px]" />
                            <div className='grid grid-cols-2'>
                                <button title='Round top left' onClick={() => setRSides(rSides => { return { ...rSides, tl: !rSides.tl } })} className={clsx({ 'rounded-tl-md': rSides.tl, 'border-[#49474E]': typeof cur.rounded == "string", 'border-[#7C7A85]': typeof cur.rounded == "number" }, 'ml-auto border-l-[2px] text-[12px] border-t-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                                <button title='Round top right' onClick={() => setRSides(rSides => { return { ...rSides, tr: !rSides.tr } })} className={clsx({ 'rounded-tr-md': rSides.tr, 'border-[#49474E]': typeof cur.rounded == "string", 'border-[#7C7A85]': typeof cur.rounded == "number" }, 'ml-auto border-r-[2px] text-[12px] border-t-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                                <button title='Round bottom left' onClick={() => setRSides(rSides => { return { ...rSides, bl: !rSides.bl } })} className={clsx({ 'rounded-bl-md': rSides.bl, 'border-[#49474E]': typeof cur.rounded == "string", 'border-[#7C7A85]': typeof cur.rounded == "number" }, 'ml-auto border-l-[2px] text-[12px] border-b-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                                <button title='Round bottom right' onClick={() => setRSides(rSides => { return { ...rSides, br: !rSides.br } })} className={clsx({ 'rounded-br-md': rSides.br, 'border-[#49474E]': typeof cur.rounded == "string", 'border-[#7C7A85]': typeof cur.rounded == "number" }, 'ml-auto border-r-[2px] text-[12px] border-b-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                            </div>
                        </div>
                    </div> : <></>}
                {optPage == 1 ?
                    <div className="flex pt-2 flex-col gap-2 px-[3%]">
                        <div className='flex flex-row w-full items-center'>
                            <div>
                                <span>Text</span>
                            </div>
                            <div className="grid grid-cols-3 ml-4">
                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "t"; a.hort = "l"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-l-[2px] border-t-[2px] rounded-tl-lg p-1'>
                                    <Dot show={cur.textOpts.vert == "t" && cur.textOpts.hort == "l"} />
                                </button>
                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "t"; a.hort = "c"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-t-[2px] p-1'>
                                    <Dot show={cur.textOpts.vert == "t" && cur.textOpts.hort == "c"} />
                                </button>
                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "t"; a.hort = "r"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-r-[2px] border-t-[2px] rounded-tr-lg p-1'>
                                    <Dot show={cur.textOpts.vert == "t" && cur.textOpts.hort == "r"} />
                                </button>

                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "c"; a.hort = "l"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-l-[2px] p-1'>
                                    <Dot show={cur.textOpts.vert == "c" && cur.textOpts.hort == "l"} />
                                </button>
                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "c"; a.hort = "c"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] p-1'>
                                    <Dot show={cur.textOpts.vert == "c" && cur.textOpts.hort == "c"} />
                                </button>
                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "c"; a.hort = "r"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-r-[2px] p-1'>
                                    <Dot show={cur.textOpts.vert == "c" && cur.textOpts.hort == "r"} />
                                </button>

                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "b"; a.hort = "l"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-b-[2px] border-l-[2px] rounded-bl-lg p-1'>
                                    <Dot show={cur.textOpts.vert == "b" && cur.textOpts.hort == "l"} />
                                </button>
                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "b"; a.hort = "c"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-b-[2px]  p-1'>
                                    <Dot show={cur.textOpts.vert == "b" && cur.textOpts.hort == "c"} />
                                </button>
                                <button onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "b"; a.hort = "r"; return { ...prev, textOpts: a } })}
                                    className='border-[#7C7A85] w-[12px] h-[12px] hover:bg-[#7C7A85] border-r-[2px] border-b-[2px] rounded-br-lg p-1'>
                                    <Dot show={cur.textOpts.vert == "b" && cur.textOpts.hort == "r"} />
                                </button>
                            </div>
                            <div className='ml-auto gap-4 flex'>
                                <span>Padding</span>
                                <input type="number" value={cur?.textOpts.p} onChange={(e) => setCur(prev => { let a = prev.textOpts; a.p = Number(e.target.value); return { ...prev, textOpts: a } })} className="bg-[#625F69] pl-1 border border-[#7C7A85] w-[45px]" />
                            </div>
                        </div>
                        <textarea value={cur.text} onChange={(e) => { setCur(prev => { return { ...prev, text: e.target.value } }) }}
                            className='w-[100%] resize-none h-[70px] bg-[#7C7A85] p-1'></textarea>
                        <div className='flex flex-row gap-4'>
                            <div className="flex flex-row gap-4 items-center">
                                <span className="">Size</span>
                                <input type="number" value={cur?.textOpts.size} onChange={(e) => setCur(prev => { let a = prev.textOpts; a.size = Number(e.target.value); return { ...prev, textOpts: a } })}
                                    className="bg-[#625F69] pl-1 border border-[#7C7A85] w-[50%]" />
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className="w-[20%] mr-4">Color</span>
                                <input spellCheck="false" type="color" value={cur?.textOpts?.color} onChange={(e) => setCur(prev => {
                                    let a = prev.textOpts; a.color = e.target.value; return { ...prev, textOpts: a }
                                })}
                                    className="bg-[#625F69] px-1 border w-[60px] text-[14px] border-[#7C7A85]" />
                            </div>
                        </div>
                    </div> : <></>}
            </div>
        </>
    )
}