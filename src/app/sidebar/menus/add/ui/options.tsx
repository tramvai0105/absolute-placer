import { useEffect, useState } from "react";
import { PieceCommutationOptions, PieceOptions } from "../../../../../types";
import Preview from "./preview";
import clsx from "clsx";
import CSSClasses from "./classList";
import Dot from "./dot";

export default function Options({ updateOpts, current, comm, close, append }: { updateOpts(o: PieceOptions, c: PieceCommutationOptions): void, current: PieceOptions, close: () => void,comm: PieceCommutationOptions, append: (o: PieceOptions, c: PieceCommutationOptions) => void }) {

    const [cur, setCur] = useState<PieceOptions>(current)
    const [commutation, setCommutation] = useState<PieceCommutationOptions>(comm)
    const [sides, setSides] = useState(current.borders)
    const [rSides, setRSides] = useState(current.rounds)
    const [optPage, setOptPage] = useState(0);

    useEffect(() => {
        setCur(current);
    }, [current])

    useEffect(() => {
        setCommutation(comm);
    }, [comm])

    function checkRadiusType(r: any) {
        let s = ["sm", "md", "lg", "xl", "2xl", "full"];
        if (r === "") {
            return "";
        }
        if (Number.isNaN(Number(r))) {
            if (s.includes(r)) {
                return r;
            } else {
                return undefined
            }
        }
        if (!Number.isNaN(Number(r))) {
            return Number(r);
        }
        if (typeof r === "undefined") {
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
            <button onClick={close} className='absolute border-[1px] px-1 border-[#7C7A85] hover:bg-[#625F69] left-[100%] -translate-x-[130%] translate-y-[20%] border-'>X</button>
            <Preview append={append} comm={commutation} opt={cur} save={updateOpts} />
            <div className="flex flex-col h-full border-[#7C7A85] border-t-[2px] py-1 px-[3%]">
                <div className='flex flex-row w-full gap-1'>
                    {optPage === 0 ? <span>Options</span> : <></>}
                    {optPage === 1 ? <span>Content</span> : <></>}
                    {optPage === 2 ? <span>Classes</span> : <></>}
                    {(optPage === 0 || optPage === 2) ? <button onClick={() => setOptPage(1)} title='Content' className='border-b-[2px] border-[#7C7A85] px-1 hover:bg-[#7C7A85]'>cont</button> : <></>}
                    {(optPage === 1 || optPage === 2) ? <button onClick={() => setOptPage(0)} title='Options' className='border-b-[2px] border-[#7C7A85] px-1 hover:bg-[#7C7A85]'>opts</button> : <></>}
                    {(optPage === 0 || optPage === 1) ? <button onClick={() => setOptPage(2)} title='Classes' className='border-b-[2px] border-[#7C7A85] px-1 hover:bg-[#7C7A85]'>clss</button> : <></>}
                    <input value={cur.name} spellCheck="false" onChange={(e) => setCur(prev => { return { ...prev, name: e.target.value } })}
                        className='bg-[#49474E] pl-1 w-[40%] border-[#7C7A85] border' />
                </div>
                {optPage === 0 ?
                    <div className="flex pt-2 flex-col gap-3 px-[3%]">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex w-fit flex-row gap-2 ">
                                <span onClick={() => setCommutation(prev => { return { ...prev, w: !prev.w} })} className={clsx({"text-[#2B292D]": !commutation.w},"mr-2 hover:underline cursor-pointer")}>W</span>
                                <input disabled={!commutation.w} type="number" value={cur?.w} onChange={(e) => setCur(prev => { return { ...prev, w: Number(e.target.value) } })}
                                    className={clsx({"bg-[#3C393F] text-[#2B292D]": !commutation.w}, {"bg-[#625F69]": commutation.w},"w-[50%] pl-1 border border-[#7C7A85]")} />
                            </div>
                            <div className="flex flex-row gap-1">
                                <span onClick={() => setCommutation(prev => { return { ...prev, h: !prev.h} })} className={clsx({"text-[#2B292D]": !commutation.h},"mr-2 hover:underline cursor-pointer")}>H</span>
                                <input disabled={!commutation.h} type="number" value={cur?.h} onChange={(e) => setCur(prev => { return { ...prev, h: Number(e.target.value) } })}
                                    className={clsx({"bg-[#3C393F] text-[#2B292D]": !commutation.h}, {"bg-[#625F69]": commutation.h},"w-[50%] pl-1 border border-[#7C7A85]")} />
                            </div>
                            <span onClick={() => setCommutation(prev => { return { ...prev, color: !prev.color} })} className={clsx({"text-[#2B292D]": !commutation.color},"mr-2 hover:underline cursor-pointer")}>Fill color</span>
                            <input disabled={!commutation.color} type='color' spellCheck="false" value={cur?.color} onChange={(e) => setCur(prev => { return { ...prev, color: e.target.value } })}
                                className={clsx({"bg-[#3C393F] text-[#2B292D]": !commutation.color}, {"bg-[#625F69]": commutation.color},"bg-[#625F69] w-[50%] px-1 border text-[14px] border-[#7C7A85]")} />
                            <span onClick={() => setCommutation(prev => { return { ...prev, rotation: !prev.rotation} })} className={clsx({"text-[#2B292D]": !commutation.rotation},"mr-2 hover:underline cursor-pointer")}>Rotation</span>
                            <input disabled={!commutation.rotation} type='number' value={cur.rotation} onChange={(e) => setCur(prev => { return { ...prev, rotation: Number(e.target.value) } })}
                                className={clsx({"bg-[#3C393F] text-[#2B292D]": !commutation.rotation}, {"bg-[#625F69]": commutation.rotation},"w-[50%] pl-1 border border-[#7C7A85]")} />
                        </div>
                        <div className={clsx({"text-[#2B292D]": !commutation.border},'flex flex-row gap-4 border-[#7C7A85] border-t-[1px] pt-1')}>
                            <span onClick={() => setCommutation(prev => { return { ...prev, border: !prev.border} })} className={clsx({"text-[#2B292D]": !commutation.border},"mr-2 hover:underline cursor-pointer")}>Border</span>
                            <button disabled={!commutation.border} title='Left border' onClick={() => setSides(sides => { return { ...sides, l: !sides.l } })} className={clsx({ 'border-[#2B292D]': !commutation.border, 'border-[#7C7A85]': !sides.l && commutation.border}, 'ml-auto px-1 border-l-[2px] hover:bg-[#7C7A85]')}>L</button>
                            <button disabled={!commutation.border} title='Right border' onClick={() => setSides(sides => { return { ...sides, r: !sides.r } })} className={clsx({ 'border-[#2B292D]': !commutation.border, 'border-[#7C7A85]': !sides.r && commutation.border }, 'ml-auto px-1 border-r-[2px] hover:bg-[#7C7A85]')}>R</button>
                            <button disabled={!commutation.border} title='Top border' onClick={() => setSides(sides => { return { ...sides, t: !sides.t } })} className={clsx({ 'border-[#2B292D]': !commutation.border, 'border-[#7C7A85]': !sides.t && commutation.border }, 'ml-auto px-1 border-t-[2px] hover:bg-[#7C7A85]')}>T</button>
                            <button disabled={!commutation.border} title='Bottom border' onClick={() => setSides(sides => { return { ...sides, b: !sides.b } })} className={clsx({ 'border-[#2B292D]': !commutation.border, 'border-[#7C7A85]': !sides.b && commutation.border }, 'ml-auto px-1 border-b-[2px] hover:bg-[#7C7A85]')}>B</button>
                        </div>
                        <div className={clsx({"text-[#2B292D]": !commutation.border},"flex flex-row gap-1")}>
                            <span className="w-[50%]">Width</span>
                            <input disabled={!commutation.border} type='number' value={cur.border} onChange={(e) => setBorders(Number(e.target.value))}
                                className={clsx({ 'bg-[#3C393F]': !commutation.border}, {"bg-[#625F69]": commutation.border}, "pl-1 my-auto h-[25px] border border-[#7C7A85] w-[50%]")} />
                        </div>
                        <div className={clsx({"text-[#2B292D]": !commutation.border},"flex flex-row gap-1")}>
                            <span className="w-[50%]">Color</span>
                            <input disabled={!commutation.border} type='color' value={cur?.borderColor || "#FFFFFF"} onChange={(e) => setCur(prev => { return { ...prev, borderColor: e.target.value } })}
                                className={clsx({ 'bg-[#3C393F]': !commutation.border},"bg-[#625F69] px-1 my-auto h-[25px] border border-[#7C7A85] w-[50%]")} />
                        </div>
                        <div className="flex items-center flex-row gap-2">
                            <span onClick={() => setCommutation(prev => { return { ...prev, rounded: !prev.rounded} })} className={clsx({"text-[#2B292D]": !commutation.rounded},"mr-2 hover:underline cursor-pointer")}>Radius</span>
                            <input disabled={!commutation.rounded} autoComplete="new-password" value={cur?.rounded} onChange={(e) => setCur(prev => { return { ...prev, rounded: checkRadiusType(e.target.value) } })}
                                className={clsx({"bg-[#3C393F] text-[#2B292D]": !commutation.rounded}, {"bg-[#625F69]": commutation.rounded},"ml-auto pl-1 border border-[#7C7A85] w-[35%]")} />
                            <div className='grid grid-cols-2'>
                                <button title='Round top left' onClick={() => setRSides(rSides => { return { ...rSides, tl: !rSides.tl } })} className={clsx({ 'rounded-tl-md': rSides.tl, 'border-[#49474E]': typeof cur.rounded === "string", 'border-[#7C7A85]': typeof cur.rounded === "number" }, 'ml-auto border-l-[2px] text-[12px] border-t-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                                <button title='Round top right' onClick={() => setRSides(rSides => { return { ...rSides, tr: !rSides.tr } })} className={clsx({ 'rounded-tr-md': rSides.tr, 'border-[#49474E]': typeof cur.rounded === "string", 'border-[#7C7A85]': typeof cur.rounded === "number" }, 'ml-auto border-r-[2px] text-[12px] border-t-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                                <button title='Round bottom left' onClick={() => setRSides(rSides => { return { ...rSides, bl: !rSides.bl } })} className={clsx({ 'rounded-bl-md': rSides.bl, 'border-[#49474E]': typeof cur.rounded === "string", 'border-[#7C7A85]': typeof cur.rounded === "number" }, 'ml-auto border-l-[2px] text-[12px] border-b-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                                <button title='Round bottom right' onClick={() => setRSides(rSides => { return { ...rSides, br: !rSides.br } })} className={clsx({ 'rounded-br-md': rSides.br, 'border-[#49474E]': typeof cur.rounded === "string", 'border-[#7C7A85]': typeof cur.rounded === "number" }, 'ml-auto border-r-[2px] text-[12px] border-b-[2px] px-1 hover:bg-[#7C7A85] w-[15px] h-[15px]')}></button>
                            </div>
                        </div>
                    </div> : <></>}
                {optPage === 1 ?
                    <div className="flex pt-2 flex-col gap-3 px-[3%]">
                        <div className='flex flex-row w-full'>
                            <div>
                                <span>Text</span>
                            </div>
                            <div className='ml-auto gap-4 flex'>
                                <span onClick={() => setCommutation(prev => { let o = prev.textOpts; o.p = !o.p; return { ...prev, textOpts: o} })} className={clsx({"text-[#2B292D]": !commutation.textOpts.p},"mr-2 hover:underline cursor-pointer")}>Padding</span>
                                <input disabled={!commutation.textOpts.p} type="number" value={cur?.textOpts.p} onChange={(e) => setCur(prev => { let a = prev.textOpts; a.p = Number(e.target.value); return { ...prev, textOpts: a } })} className={clsx({"bg-[#3C393F] text-[#2B292D]": !commutation.textOpts.p}, {"bg-[#625F69]": commutation.textOpts.p}," pl-1 border border-[#7C7A85] w-[45px]")} />
                            </div>
                        </div>
                        <textarea value={cur.text} onChange={(e) => { setCur(prev => { return { ...prev, text: e.target.value } }) }} className='w-[100%] resize-none h-[70px] bg-[#7C7A85] p-1'></textarea>
                        <div className='flex flex-row gap-4'>
                            <div className="flex flex-row gap-4">
                                <span onClick={() => setCommutation(prev => { let o = prev.textOpts; o.size = !o.size; return { ...prev, textOpts: o} })} className={clsx({"text-[#2B292D]": !commutation.textOpts.size},"mr-2 hover:underline cursor-pointer")}>Size</span>
                                <input disabled={!commutation.textOpts.size} type="number" value={cur?.textOpts.size} onChange={(e) => setCur(prev => { let a = prev.textOpts; a.size = Number(e.target.value); return { ...prev, textOpts: a } })} className={clsx({"bg-[#3C393F] text-[#2B292D]": !commutation.textOpts.size}, {"bg-[#625F69]": commutation.textOpts.size}," pl-1 border border-[#7C7A85] w-[40%]")} />
                            </div>
                            <div className="flex flex-row justify-between">
                                <span  onClick={() => setCommutation(prev => { let o = prev.textOpts; o.color = !o.color; return { ...prev, textOpts: o} })} className={clsx({"text-[#2B292D]": !commutation.textOpts.color},"hover:underline cursor-pointer w-[20%] mr-2")}>Color</span>
                                <input disabled={!commutation.textOpts.color} spellCheck="false" type="color" value={cur?.textOpts?.color} onChange={(e) => setCur(prev => {
                                    let a = prev.textOpts; a.color = e.target.value; return { ...prev, textOpts: a }
                                })}
                                    className="bg-[#625F69] px-1 w-[60px] border text-[14px] border-[#7C7A85]" />
                            </div>
                        </div>
                        <span onClick={() => setCommutation(prev => { let o = prev.textOpts; o.align = !o.align; return { ...prev, textOpts: o} })} className={clsx({"text-[#2B292D]": !commutation.textOpts.align},"mr-2 hover:underline cursor-pointer border-[#7C7A85] border-t-[1px] pt-1")}>Alignment</span>
                        <div className={clsx({"text-[#2B292D]": !commutation.textOpts.align},'flex flex-row justify-between')}>
                            <div className='flex flex-row items-center gap-4'>
                                <span>Vertical</span>
                                <div className={clsx({"opacity-0": !commutation.textOpts.align}, 'flex flex-col')}>
                                    <button disabled={!commutation.textOpts.align} onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "t"; return { ...prev, textOpts: a } })} className='border-[#7C7A85] hover:bg-[#7C7A85] border-x-[2px] border-t-[2px] rounded-t-lg p-1 w-fit'>
                                        <Dot show={current.textOpts.vert === "t"} />
                                    </button>
                                    <button disabled={!commutation.textOpts.align} onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "c"; return { ...prev, textOpts: a } })} className='border-[#7C7A85] hover:bg-[#7C7A85] border-x-[2px] p-1 w-fit'>
                                        <Dot show={current.textOpts.vert === "c"} />
                                    </button>
                                    <button disabled={!commutation.textOpts.align} onClick={(e) => setCur(prev => { let a = prev.textOpts; a.vert = "b"; return { ...prev, textOpts: a } })} className='border-[#7C7A85] hover:bg-[#7C7A85] border-x-[2px] border-b-[2px] rounded-b-lg p-1 w-fit'>
                                        <Dot show={current.textOpts.vert === "b"} />
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <span>Horizontal</span>
                                <div className={clsx({"opacity-0": !commutation.textOpts.align},'flex flex-row')}>
                                    <button disabled={!commutation.textOpts.align} onClick={(e) => setCur(prev => { let a = prev.textOpts; a.hort = "l"; return { ...prev, textOpts: a } })} className='border-[#7C7A85] hover:bg-[#7C7A85] border-y-[2px] border-l-[2px] rounded-l-lg p-1 w-fit'>
                                        <Dot show={current.textOpts.hort === "l"} />
                                    </button>
                                    <button disabled={!commutation.textOpts.align} onClick={(e) => setCur(prev => { let a = prev.textOpts; a.hort = "c"; return { ...prev, textOpts: a } })} className='border-[#7C7A85] hover:bg-[#7C7A85] border-y-[2px] p-1 w-fit'>
                                        <Dot show={current.textOpts.hort === "c"} />
                                    </button>
                                    <button disabled={!commutation.textOpts.align} onClick={(e) => setCur(prev => { let a = prev.textOpts; a.hort = "r"; return { ...prev, textOpts: a } })} className='border-[#7C7A85] hover:bg-[#7C7A85] border-y-[2px] border-r-[2px] rounded-r-lg p-1 w-fit'>
                                        <Dot show={current.textOpts.hort === "r"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : <></>}
                {optPage === 2 ?
                    <CSSClasses cur={cur} set={setCur} /> : <></>}
            </div>
        </>
    )
}