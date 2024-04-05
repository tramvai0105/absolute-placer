import { PieceCommutationOptions, PieceOptions, defaultCommutation } from "../../../../../types";

export default function NewPiece({ id, setRedactor }: { setRedactor(opt: PieceOptions, comm: PieceCommutationOptions, id: number): void, id: number }) {

    const opt: PieceOptions = { name: "Square", w: 48, h: 48, text: "Elvis", rounded: "", borders: { l: true, r: true, t: true, b: true }, rounds: { tl: true, tr: true, bl: true, br: true }, textOpts: { size: 14, color: "#ffffff", vert: "c", hort: "c", p: 0 }, border: 0, borderColor: "#ffffff", color: "#ec5a72" };
    const comm: PieceCommutationOptions = defaultCommutation;

    return (
        <div className="flex min-h-[158px] flex-col p-2 bg-[#49474E] items-center w-full h-fit">
            <div className='mt-auto mb-auto'>
                <button title='Add new element' onClick={() => { setRedactor(opt, comm, id) }} className="mt-auto border-[1px] p-1 px-2 border-[#7C7A85] hover:bg-[#625F69]">+</button>
            </div>
        </div>
    )
}