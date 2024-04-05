import React, { useState, useEffect } from 'react';
import { PieceCommutationOptions, PieceOptions, defaultCommutation } from '../../../../types';
import clsx from 'clsx';
import AddPiece from './ui/addPiece';
import NewPiece from './ui/newPiece';
import Options from './ui/options';
import store from '../../../../store';

export default function AddMenu() {

    const [opts, setOpts] = useState<PieceOptions[]>(store.menuPiecesOpts);
    const [comms, setComms] = useState<PieceCommutationOptions[]>(store.menuPiecesComms)
    const [current, setCurrent] = useState<PieceOptions>({ w: 0, h: 0, borders: { l: true, r: true, t: true, b: true }, rounds: { tl: true, tr: true, bl: true, br: true }, textOpts: { size: 14, color: "#ffffff", vert: "t", hort: "l", p: 0 }, border: 0 })
    const [commutation, setCommutation] = useState<PieceCommutationOptions>(defaultCommutation)
    const [curId, setCurId] = useState<number>(-1)
    const [edit, setEdit] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(()=>{
        store.setMenuPiecesOpts(opts);
    },[opts])

    useEffect(()=>{
        store.setMenuPiecesComm(comms);
    },[comms])

    function updateOpts(o: PieceOptions, c: PieceCommutationOptions) {
        setOpts((opts) => {
            opts[curId] = o;
            return opts;
        })
        setComms((comms) => {
            comms[curId] = c;
            return comms;
        })
        setEdit(false);
    }

    function closeOpts() {
        setEdit(false);
    }

    function appendOpt(o: PieceOptions, c: PieceCommutationOptions) {
        for (let i = 0; i < 6 * 4; i++) {
            if (opts[i] === undefined) {
                setOpts((opts) => {
                    opts[i] = o;
                    return opts;
                })
                setComms((comms) => {
                    comms[i] = c;
                    return comms;
                })
                return
            }
        }
    }

    function setRedactor(opt: PieceOptions, comm: PieceCommutationOptions, id: number) {
        setCurrent(opt);
        setCommutation(comm)
        setCurId(id);
        setEdit(true);
    }

    function newPieceButtons() {
        let arr = []
        for (let i = page * 6 - 6; i < page * 6; i++) {
            if (!opts[i]) {
                arr.push(<NewPiece key={i} setRedactor={setRedactor} id={i} />)
            }
        }
        return arr;
    }

    return (
        <div className="bg-[#49474E] relative select-none flex flex-col border-[#7C7A85] border-y-[1px] w-full h-full">
            {
                (edit)
                    ? <Options comm={commutation} append={appendOpt} close={closeOpts} current={current} updateOpts={updateOpts} />
                    :
                    <>
                        <div className="pb-2 flex flex-row text-[14px] gap-1 px-1 border-[#7C7A85]">
                            <PageButton id={1} setPage={setPage} cur={page} />
                            <PageButton id={2} setPage={setPage} cur={page} />
                            <PageButton id={3} setPage={setPage} cur={page} />
                            <PageButton id={4} setPage={setPage} cur={page} />
                        </div>
                        <div className="w-full mb-6 gap-[1px] bg-[#7C7A85] grid grid-cols-2">
                            {opts.map((o, i, arr) => (i <= page * 6 - 1 && i >= page * 6 - 6) ? <AddPiece key={i} comm={comms[i]} opt={o} name={o.name || ""} setRedactor={setRedactor} id={i} /> : <React.Fragment key={i}></React.Fragment>)}
                            {newPieceButtons().map(el => el)}
                        </div>
                    </>
            }
        </div>
    )
}

function PageButton({ setPage, id, cur }: { setPage: React.Dispatch<React.SetStateAction<number>>, id: number, cur: number }) {
    return <button title={`Page ${id}`} onClick={() => setPage(id)} className={clsx("px-3 border-b-[2px] border-x-[2px] border-[#7C7A85] hover:bg-[#7C7A85]", { "bg-[#625F69]": cur === id })}>{id}</button>
}