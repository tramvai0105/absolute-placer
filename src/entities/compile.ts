import { ConfigCss } from "../store";
import { PieceOptions } from '../types';

export default class CompileCss{
    options : PieceOptions;
    config: ConfigCss;
    classList: string[] = [];
    textClassList: string[] = [];
    styleList: React.CSSProperties = {};
    class: string = "";

    constructor(opt: PieceOptions, config: ConfigCss){
        this.options = opt;
        this.config = config;
        this.compile();
    }

    width(){
        if(this.config.tailwind){
            this.classList.push(`w-[${this.options.w}px]`)
        } 
    }

    height(){
        if(this.config.tailwind){
            this.classList.push(`h-[${this.options.h}px]`)
        } 
    }

    border(){
        let borders = this.options.borders;
        if(this.options.border == 0){
            return;
        }
        if(this.config.tailwind){
            if(!Object.values(borders).some(b=> b == false)){
                this.classList.push(`border-[${this.options.border}px]`)
                return;
            }
            if(borders.l && borders.r && borders.t){
                this.classList.push(`border-t-[${this.options.border}px] border-x-[${this.options.border}px]`)
                return;
            }
            if(borders.l && borders.r && borders.b){
                this.classList.push(`border-b-[${this.options.border}px] border-x-[${this.options.border}px]`)
                return;
            }
            if(borders.t && borders.b && borders.l){
                this.classList.push(`border-y-[${this.options.border}px] border-l-[${this.options.border}px]`)
                return;
            }
            if(borders.t && borders.b && borders.r){
                this.classList.push(`border-y-[${this.options.border}px] border-r-[${this.options.border}px]`)
                return;
            }
            if(borders.r && borders.l){
                this.classList.push(`border-x-[${this.options.border}px]`)
                return;
            }
            if(borders.t && borders.b){
                this.classList.push(`border-y-[${this.options.border}px]`)
                return;
            }
            if(borders.l){
                this.classList.push(`border-l-[${this.options.border}px]`)
                return;
            }
            if(borders.r){
                this.classList.push(`border-r-[${this.options.border}px]`)
                return;
            }
            if(borders.b){
                this.classList.push(`border-b-[${this.options.border}px]`)
                return;
            }
            if(borders.t){
                this.classList.push(`border-t-[${this.options.border}px]`)
                return;
            }
        }
    }

    background(){
        if(this.config.tailwind){
            if(this.options.color){
                this.classList.push(`bg-[${this.options.color}]`)
                return;
            }
        }
    }

    borderColor(){
        if(this.config.tailwind){
            if(this.options.border > 0){
                this.classList.push(`border-[${this.options.borderColor}]`)
            }
            return;
        }
    }

    padding(){
        if(this.config.tailwind){
            if(this.options.textOpts.p > 0){
                this.classList.push(`p-[${this.options.textOpts.p}px]`)
            }
            return;
        }
    }

    alignVert(){
        if(this.config.tailwind){
            if(this.options.textOpts.vert == "c"){
                this.classList.push("items-center")
            }
            if(this.options.textOpts.vert == "t"){
                this.classList.push("items-start")
            }
            if(this.options.textOpts.vert == "b"){
                this.classList.push("items-end")
            }
            return;
        }
    }

    alignHort(){
        if(this.config.tailwind){
            if(this.options.textOpts.hort == "l"){
                this.classList.push("justify-start")
                return;
            }
            if(this.options.textOpts.hort == "c"){
                this.classList.push("justify-center")
                return;
            }
            if(this.options.textOpts.hort == "r"){
                this.classList.push("justify-end")
                return;
            }
            return;
        }
    }

    textColor(){
        if(this.config.tailwind){
            this.textClassList.push(`text-[${this.options.textOpts.color}]`)
            return;
        }
    }

    textSize(){
        if(this.config.tailwind){
            this.textClassList.push(`text-[${this.options.textOpts.size}px]`)
            return;
        }
    }

    rounded(){
        if(this.config.tailwind){
            if(typeof this.options.rounded == "number"){
                let rounds = this.options.rounds;
                if(!Object.values(rounds).some(b=> b == false)){
                    this.classList.push(`rounded-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.tl && rounds.tr && rounds.bl){
                    this.classList.push(`rounded-t-[${this.options.rounded}px] rounded-bl-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.tl && rounds.tr && rounds.br){
                    this.classList.push(`rounded-t-[${this.options.rounded}px] rounded-br-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.bl && rounds.br && rounds.tl){
                    this.classList.push(`rounded-b-[${this.options.rounded}px] rounded-tl-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.bl && rounds.br && rounds.tr){
                    this.classList.push(`rounded-b-[${this.options.rounded}px] rounded-tr-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.tl && rounds.tr){
                    this.classList.push(`rounded-t-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.bl && rounds.br){
                    this.classList.push(`rounded-b-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.tr && rounds.br){
                    this.classList.push(`rounded-r-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.bl && rounds.tl){
                    this.classList.push(`rounded-l-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.bl){
                    this.classList.push(`rounded-bl-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.tl){
                    this.classList.push(`rounded-tl-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.br){
                    this.classList.push(`rounded-br-[${this.options.rounded}px]`)
                    return;
                }
                if(rounds.tr){
                    this.classList.push(`rounded-tr-[${this.options.rounded}px]`)
                    return;
                }
            }
            if(this.options.rounded == ""){
                this.classList.push(`rounded-none`)
                return;
            }
            if(this.options.rounded == "full"){
                this.classList.push(`rounded-full`)
                return;
            }
            if(this.options.rounded == "sm"){
                this.classList.push(`rounded-sm`)
                return;
            }
            if(this.options.rounded == "md"){
                this.classList.push(`rounded-md`)
                return;
            }
            if(this.options.rounded == "lg"){
                this.classList.push(`rounded-lg`)
                return;
            }
            if(this.options.rounded == "xl"){
                this.classList.push(`rounded-xl`)
                return;
            }
            if(this.options.rounded == "2xl"){
                this.classList.push(`rounded-2xl`)
                return;
            }
            return;
        }
    }

    rotation(){
        if(this.config.tailwind){
            if(this.options.rotation){
                this.classList.push(`rotate-[${this.options.rotation}deg]`)
            }
            return;
        } 
    }

    compile(){
        this.width();
        this.height();
        this.border();
        this.borderColor();
        this.background();
        this.textColor();
        this.textSize();
        this.padding();
        this.alignHort();
        this.alignVert();
        this.rounded();
        this.rotation();
        if(this.options.classes){
            this.classList = [...this.classList, ...this.options.classes]
        }
    }
}