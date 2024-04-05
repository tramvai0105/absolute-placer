import Piece from "../../../../../entities/Piece";
import { PieceCommutationOptions, PieceOptions } from "../../../../../types";

export default function Preview({ opt, comm, save, append }: { opt: PieceOptions, comm: PieceCommutationOptions, save(o: PieceOptions, c: PieceCommutationOptions): void, append: (o: PieceOptions, c: PieceCommutationOptions) => void }) {

    function scale() {
        if (opt && opt.h + 0.01 > opt.w && opt.h > 200) {
            let s = 200 / opt.h;
            return `Current scale 1/${(1 / s).toFixed(2)}`
        }
        if (opt && opt.w > opt.h && opt.w > 150) {
            let s = 150 / opt.w;
            return `Current scale 1/${(1 / s).toFixed(2)}`
        }
        return ""
    }

    console.log(comm, opt)

    return (
        <div className='w-full flex min-h-[270px] overflow-hidden justify-center flex-col items-center pt-3 pb-3'>
            <div className='mt-auto mb-auto'>
                <Piece comm={comm} prewiew={true} opt={opt} abs={false} />
            </div>
            <span className="relative z-50">{scale()}</span>
            <div className='flex flex-row gap-2'>
                <button title='Save' onClick={() => save(opt, comm)}
                    className="w-fit hover:underline relative z-50 border-[1px] p-1 px-2 border-[#7C7A85] hover:bg-[#625F69]">
                    SAVE</button>
                <button title='Save copy' onClick={() => append(opt, comm)}
                    className="w-fit text-[12px] hover:underline relative z-50 border-[1px] p-1 px-1 border-[#7C7A85] hover:bg-[#625F69]">
                    +COPY</button>
            </div>
        </div>
    )
}