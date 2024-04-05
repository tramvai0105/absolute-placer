import { useEffect, useRef, useState } from "react"
import store from "../../store"

export default function ConfigMenu({ close }: { close: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [configHtml, setConfigHtml] = useState(store.configHtml);
    const [configGlobal, setConfigGlobal] = useState(store.configGlobal);
    const [showInfo, setShowInfo] = useState(false);
    const [infoText, setInfoText] = useState("")
    const first = useRef<boolean>(true)

    useEffect(() => {
        store.setConfigHtml(configHtml);
    }, [configHtml])

    useEffect(() => {
        store.setConfigGlobal(configGlobal);
    }, [configGlobal])

    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        if (infoText !== "") {
            setShowInfo(true)
            return;
        }
        setShowInfo(false);
    }, [infoText])

    return (
        <div className="absolute z-50 flex items-center justify-center w-full h-full bg-black left-0 bg-opacity-25">
            {showInfo ? <div className="absolute min-w-[300px] max-w-[300px] min-h-[400px] bg-[#625F69] shadow-[#323035] shadow-lg z-50">
                <button onClick={() => setInfoText("")} className="absolute left-[100%] -translate-x-[200%] text-[20px]">x</button>
                <p className="px-4 py-6 whitespace-pre-wrap">{infoText}</p>
            </div> : <></>}
            <div className="bg-[#49474E] min-h-[550px] min-w-[924px] py-3 px-3 flex flex-col gap-2">
                <div className="w-full flex">
                    <span className="">Options</span>
                    <button onClick={() => setInfoText("   This menu allows you to configure and set all the necessary editor options.\n   To get information about the functioning  of a specific option, click info button next to it.")} className="ml-auto mr-2 cursor-pointer hover:underline text-[12px]">info</button>
                    <button className="border-[1px] ml-auto border-[#7C7A85] hover:bg-[#7C7A85] px-1 rounded-xl" onClick={() => close(false)}>close</button>
                </div>
                <div className="w-fit flex flex-col p-2">
                    <div className="pb-1 w-full flex items-center"><span>Crop</span><button onClick={() => setInfoText("   Allows you to crop the coordinates of all elements by the coordinates of the extreme elements on each side.\n   Thus, the space up to the edge of the workspace to the set of elements will not be taken into account.")} className="ml-auto mr-2 cursor-pointer hover:underline text-[12px]">info</button></div>
                    <div className="p-2 border-y-[1px] w-fit flex flex-row gap-4">
                        <div className="gap-2 flex">
                            <label htmlFor="cropLeft">Left</label>
                            <input id="cropLeft" checked={configHtml.cropLeft} onChange={(e) => setConfigHtml(prev => { return { ...prev, cropLeft: !prev.cropLeft } })} type="checkbox" />
                        </div>
                        <div className="gap-2 flex">
                            <label htmlFor="cropTop">Top</label>
                            <input id="cropTop" checked={configHtml.cropTop} onChange={(e) => setConfigHtml(prev => { return { ...prev, cropTop: !prev.cropTop } })} type="checkbox" />
                        </div>
                    </div>
                </div>
                <div className="w-fit flex flex-col p-2">
                    <div className="pb-1 w-full flex items-center"><span>Workspace size</span><button onClick={() => setInfoText("   Sets the width and height of the workspace.\n   All elements outside the new boundaries will be moved to coordinates 0, 0. You can turn it Off by Move option.")} className="ml-auto mr-2 cursor-pointer hover:underline text-[12px]">info</button></div>
                    <div className="p-2 border-y-[1px] w-fit flex flex-row gap-4">
                        <div className="gap-2 flex">
                            <label htmlFor="Fwidth">W</label>
                            <input className="bg-[#625F69] pl-1 border border-[#7C7A85] w-[50px]" id="Fwidth" value={configGlobal.fieldW} onChange={(e) => setConfigGlobal(prev => { return { ...prev, fieldW: Number(e.target.value) } })} type="number" />
                        </div>
                        <div className="gap-2 flex">
                            <label htmlFor="Fheight">H</label>
                            <input className="bg-[#625F69] pl-1 border border-[#7C7A85] w-[50px]" id="Fheight" value={configGlobal.fieldH} onChange={(e) => setConfigGlobal(prev => { return { ...prev, fieldH:  Number(e.target.value) } })} type="number" />
                        </div>
                        <div className="gap-2 flex">
                            <label htmlFor="moveInside">Move</label>
                            <input id="moveInside" checked={configGlobal.moveInside} onChange={(e) => setConfigGlobal(prev => { return { ...prev, moveInside: !prev.moveInside } })} type="checkbox" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}