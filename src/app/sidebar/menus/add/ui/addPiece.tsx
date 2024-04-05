import Piece from "../../../../../entities/Piece"
import store from "../../../../../store"
import { PieceCommutationOptions, PieceOptions } from "../../../../../types"

export default function AddPiece({ opt, comm, name, id, setRedactor }: { setRedactor(opt: PieceOptions, comm: PieceCommutationOptions, id: number): void, opt: PieceOptions, comm: PieceCommutationOptions, name: string, id: number }) {

    return (
        <div className="flex min-h-[158px] flex-col p-2 bg-[#49474E] items-center w-full h-fit">
            <span className="mb-2 border-b-[1px] border-[#7C7A85] overflow-hidden max-h-[25px] w-[90%] text-center text-[16px]">{name}</span>
            <div title='Add to workspace' className='mt-auto mb-auto' onClick={() => store.add(opt, comm)}>
                <Piece comm={comm} onlist={true} pointer={true} opt={opt} abs={false} />
            </div>
            <button title={"Options"} onClick={() => { setRedactor(opt, comm, id) }} className="mt-auto border-[1px] p-1 px-2 border-[#7C7A85] hover:bg-[#625F69] hover:underline">OPTIONS</button>
        </div>
    )
}