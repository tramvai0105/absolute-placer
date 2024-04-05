import SideBar from "./sidebar/index";
import WorkSpace from "./workspace/index";

export default function Placer(){
    return(
        <div className="flex flex-row relative bg-[#49474E]">
            <SideBar/>
            <WorkSpace/>
        </div>
    )
}