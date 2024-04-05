import { makeAutoObservable } from "mobx"
import ReactDomServer from 'react-dom/server';
import { PieceCommutationOptions, PieceOptions, defaultCommutation } from './types';
import RenderPiece from "./entities/RenderPiece";

export interface Component{
    props: {
        id?: number;
        left?: string;
        top?: string;
        opt?: PieceOptions,
        comm?: PieceCommutationOptions,
    };
}

export interface ConfigGlobal{
    fieldW: number,
    fieldH: number,
    moveInside: boolean,
}

export interface ConfigCss{
    tailwind: boolean,
}

export interface ConfigHtml{
    cropLeft: boolean,
    cropTop: boolean,
}

class Store {
    elements : Component[] = [
    ];
    fieldRect = {w: 0, h: 0};
    styleSheet = new CSSStyleSheet();
    configCss: ConfigCss = {tailwind: true};
    menuPiecesOpts : PieceOptions[] = [
        { name: "Square", w: 48, h: 48, text: "Elvis", rounded: "", borders: { l: true, r: true, t: true, b: true }, rounds: { tl: true, tr: true, bl: true, br: true }, textOpts: { size: 14, color: "#ffffff", vert: "c", hort: "c", p: 0 }, border: 0, borderColor: "#ffffff", color: "#ec5a72" },
        { name: "Rectangle", w: 92, h: 48, rounded: "", borders: { l: true, r: true, t: true, b: true }, rounds: { tl: true, tr: true, bl: true, br: true }, textOpts: { size: 14, color: "#ffffff", vert: "c", hort: "c", p: 0 }, border: 0, borderColor: "#ffffff", color: "#ec5a72" },
        { name: "Circle", w: 48, h: 48, rounded: "full", borders: { l: true, r: true, t: true, b: true }, rounds: { tl: true, tr: true, bl: true, br: true }, textOpts: { size: 14, color: "#ffffff", vert: "c", hort: "c", p: 0 }, border: 2, borderColor: "#ffffff", color: "#ec5a72" },
        { name: "Rounded", w: 48, h: 48, rounded: "xl", borders: { l: true, r: true, t: true, b: true }, rounds: { tl: true, tr: true, bl: true, br: true }, textOpts: { size: 14, color: "#ffffff", vert: "c", hort: "c", p: 0 }, border: 0, borderColor: "#ffffff", color: "#12a594" },
        { name: "Rotated", w: 48, h: 25, rounded: "md", rotation: 45, borders: { l: true, r: true, t: true, b: true }, rounds: { tl: true, tr: true, bl: true, br: true }, textOpts: { size: 14, color: "#ffffff", vert: "c", hort: "c", p: 0 }, border: 0, borderColor: "#ffffff", color: "#ec5a72" },
    ];
    menuPiecesComms : PieceCommutationOptions[] = [defaultCommutation, defaultCommutation, defaultCommutation, defaultCommutation, defaultCommutation];
    configHtml: ConfigHtml = {
        cropLeft: true,
        cropTop: true,
    }
    configGlobal: ConfigGlobal = {
        fieldW: 0,
        fieldH: 0,
        moveInside: true,
    }

    constructor() {
        makeAutoObservable(this)
    }

    render(){
        let rez = ""
        let lCrop = 0;
        let tCrop = 0;
        if(this.configHtml.cropLeft){
            lCrop = Math.min(...this.elements.map(el=>Number(el.props.left?.split("px")[0])));
        }
        if(this.configHtml.cropTop){
            tCrop = Math.min(...this.elements.map(el=>Number(el.props.top?.split("px")[0])));
        }
        for(let i = 0; i < this.elements.length; i++){
            let el = this.elements[i];
            if(el.props.opt){
                let c = <RenderPiece id={el.props.id} top={String(Number(el.props.top?.split("px")[0]) - tCrop) + "px"} left={String(Number(el.props.left?.split("px")[0]) - lCrop) + "px"} opt={el.props.opt}/>
                let r = ReactDomServer.renderToStaticMarkup(c);
                r = 
                    r.replaceAll('class="absolute','\n   class="absolute')
                    .replaceAll("class", "className")
                    .replaceAll("><span", ">\n   <span")
                    .replaceAll("</div>", "\n</div>");
                rez += r + "\n";
            }
        }
        return rez;
    }

    getCssText() {
        return Array.from(this.styleSheet.cssRules).map(rule=> rule.cssText).join("\n");
    }

    setMenuPiecesOpts(opts: PieceOptions[]){
        this.menuPiecesOpts = opts;
    }

    setMenuPiecesComm(comms: PieceCommutationOptions[]){
        this.menuPiecesComms = comms;
    }

    addStyleRule(rule: string){
        let rules = Array.from(this.styleSheet.cssRules);
        for (let i = 0; i < rules.length; i++) {
            if(rules[i].cssText.split("{")[0].slice(1) === rule.split("{")[0].slice(1)){
                return;
            }          
        }
        this.styleSheet.insertRule(rule);
    }

    editStyleRule(id: number, newRule: string){
        this.styleSheet.deleteRule(id)
        this.styleSheet.insertRule(newRule, id);
    }

    removeStyleRule(id: number){
        this.styleSheet.deleteRule(id);
    }

    getRules(){
        let rules = Array.from(this.styleSheet.cssRules)
        return rules;
    }

    getRule(id: number){
        return this.styleSheet.cssRules[id]
    }

    get(id: number){
        for (let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].props.id === id){
                return this.elements[i]
            }
        }
    }
    
    getOpts(id: number){
        let opt = this.elements[id].props.opt;
        if(opt){
            return opt;
        } else {
            let a : PieceOptions = {
                w: 0,
                h: 0,
                rounds: {tl: false, tr: false, bl: false, br: false},
                border: 0,
                borders: {l: false, r: false, t: false, b: false},
                textOpts: {size: 14, color: "#fff", vert: "c", hort: "c", p: 0},
            }
            return a;
        }
    }

    setXY(id: number, x: number, y: number){
        if(this.elements[id]){
            let props = this.elements[id].props;
            props.left = `${x}px`;
            props.top = `${y}px`;
            this.elements = this.elements.map((el, i)=> (i === id) ? {...el, props: props} : {...el})
        }
    }

    setX(id: number, x: number){
        if(this.elements[id]){
            let props = this.elements[id].props;
            props.left = `${x}px`;
            this.elements = this.elements.map((el, i)=> (i === id) ? {...el, props: props} : {...el})
        }
    }

    setY(id: number, x: number){
        if(this.elements[id]){
            let props = this.elements[id].props;
            props.top = `${x}px`;
            this.elements = this.elements.map((el, i)=> (i === id) ? {...el, props: props} : {...el})
        }
    }

    setZ(id: number, z: number){
        if(this.elements[id]){
            let opts = this.elements[id].props.opt;
            if(!opts){
                return;
            }
            opts.z = z;
            let props = this.elements[id].props;
            props.opt = opts;
            this.elements = this.elements.map((el, i)=> (i === id) ? {...el, props: props} : {...el})
        }
    }

    set(id: number, opt: PieceOptions){
        if(this.elements[id]){
            let props = this.elements[id].props;
            props.opt = opt;
            this.elements = this.elements.map((el, i)=> (i === id) ? {...el, props: props} : {...el})
        }
    }

    setRotation(id: number, deg: number){
        if(this.elements[id]){
            let props = this.elements[id].props;
            if(props.opt)
            props.opt.rotation = deg;
            this.elements = this.elements.map((el, i)=> (i === id) ? {...el, props: props} : {...el})
        }
    }

    saveElement(element : HTMLDivElement){
        let id = Number(element.id.split("_")[1]);
        this.elements = this.elements.map(el=>{
            if(el.props.id === id){
                return {props: {
                    id: id,
                    top: element.style.top,
                    left: element.style.left,
                    opt: el.props.opt,
                    comm: el.props.comm
                }}
            }else{
                return el;
            }
        })
    }

    setConfigHtml(config: ConfigHtml){
        this.configHtml = config;
    }

    setConfigCss(config: ConfigCss){
        this.configCss = config;
    }

    setConfigGlobal(config: ConfigGlobal){
        this.configGlobal = config;
    }

    add(opt?: PieceOptions, comm?: PieceCommutationOptions) {
        if(this.fieldRect.w && this.fieldRect.h){
            this.elements.push({props: {id: this.elements.length, 
                left: Math.ceil(this.fieldRect.w /2) + "px", 
                top: Math.ceil(this.fieldRect.h /2) + "px",
                opt: opt,
                comm: comm,    
            }});
        }else{
            this.elements.push({props: {id: this.elements.length, opt: opt, comm: comm}});
        }
    }

    delete(id: number){
        this.elements = this.elements.filter((el, i)=> i !== id);
        this.elements = this.elements.map((el, id)=>{ let p =  el.props; p.id = id ; return {el, props: p}})
    }

    setRect(w: number, h: number){
        this.fieldRect = {w: w, h: h}
    }
}

const store = new Store()

export default store;