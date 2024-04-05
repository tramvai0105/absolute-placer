import clsx from "clsx"

export default function CssClass({ clss, add, remove, select }: { clss: string, add?: (name: string) => void, select?: boolean, remove?: (name: string)=> void}) {
    return (
        <button 
        onClick={() =>{ if(add){add(clss)} if(remove){remove(clss)}}} 
        className={clsx({ "border-white": select }, "px-4 border-[#625F69] border-[2px] w-auto bg-[#625F69] rounded-xl")}>{clss}</button>
    )
}