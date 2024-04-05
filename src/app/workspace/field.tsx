import { useEffect, useRef, useState } from "react";
import store, { Component } from "../../store";
import React from "react";
import Piece from "../../entities/Piece";
import { observer } from "mobx-react-lite"
import Menu from "./menu";

function Field() {

    const fieldRef = useRef<HTMLDivElement>(null);
    const fieldRect = useRef<DOMRect | null>(null);
    const dragEl = useRef<HTMLDivElement | null>(null);
    const dragSetArr = useRef<HTMLDivElement[]>([]);
    const shift = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);

    const selectStart = useRef({ x: 0, y: 0 });
    const setDragStart = useRef({ x: 0, y: 0 });
    const selectRef = useRef<HTMLDivElement | null>(null);
    const selecting = useRef(false);
    const movingSet = useRef(false);
    const selectedSetRef = useRef<HTMLDivElement | null>(null);
    const selectShift = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

    const [id, setId] = useState(-1);
    const [redactor, setRedactor] = useState(false);
    const showTimer = useRef(false)
    const [menuCoords, setMenuCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const menuEl = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (fieldRef.current) {
            let rect = fieldRef.current.getBoundingClientRect()
            store.setRect(Math.ceil(rect.width), Math.ceil(rect.height))
            // store.setConfigGlobal({fieldH: Math.floor(rect.height), fieldW: Math.floor(rect.width), moveInside: store.configGlobal.moveInside})
        }
    }, [])

    useEffect(() => {
        if(!fieldRef.current){
            return;
        }
        fieldRect.current = fieldRef.current.getBoundingClientRect();
        store.setRect(Math.ceil(fieldRect.current.width), Math.ceil(fieldRect.current.height))
        if(store.configGlobal.moveInside){
        store.elements.forEach((el)=>{
            if(typeof el.props.id == "number" && el.props.opt && el.props.left && el.props.top && fieldRect.current){
                console.log(Number(el.props.left.split("px")[0]) + el.props.opt.w, fieldRect.current.width)
                if( Number(el.props.left.split("px")[0]) + el.props.opt.w > fieldRect.current.width 
                || Number(el.props.top.split("px")[0]) + el.props.opt.h > fieldRect.current.height){
                    store.setXY(el.props.id, 0, 0)
                }
            }
        })}
    }, [store.configGlobal])

    useEffect(() => {
        if (showMenu && menuEl.current) {
            let coords = menuEl.current.getBoundingClientRect();
            setMenuCoords({
                x: menuPos(coords, "x"),
                y: menuPos(coords, "y"),
            })
        }
    }, [store.elements])

    function changeMenu(state: boolean) {
        setRedactor(state);
        if (menuEl.current) {
            let coords = menuEl.current.getBoundingClientRect()
            setMenuCoords({
                x: menuPos(coords, "x", !state),
                y: menuPos(coords, "y", !state)
            })
        }
    }

    function remove(id: number) {
        dragEl.current = null;
        setShowMenu(false);
        setId(-1);
        menuEl.current = null;
        store.delete(id);
    }

    function menuPos(coords: DOMRect, dir: "x" | "y", closed = false) {
        let menuW = 100;
        let menuH = 135;
        if (redactor && !closed) {
            menuW += 150;
            menuH += 55;
        }
        if (fieldRect.current) {
            if (dir === "x") {
                let x: number = 0;
                if (coords.right - fieldRect.current.x < fieldRect.current.width / 2) {
                    x = coords.right + 4 - fieldRect.current.x;
                } else {
                    x = coords.right + 4 - fieldRect.current.x;
                    // x = coords.left - 4 - fieldRect.current.x - menuW;
                }
                if (x < 0) {
                    x = 0;
                }
                if (x > fieldRect.current.width - menuW) {
                    x = coords.left - 4 - fieldRect.current.x - menuW
                }
                if (fieldRect.current.width < 400) {
                    x = fieldRect.current.width + 4;
                }
                return x;
            }
            if (dir === "y") {
                let y: number = 0;
                if (coords.top - fieldRect.current.y < fieldRect.current.height / 2) {
                    y = coords.top - fieldRect.current.y - 1;
                } else {
                    y = coords.bottom - fieldRect.current.y - menuH - 1;
                }
                if (y < 0) {
                    y = 0;
                }
                if (y > fieldRect.current.y + fieldRect.current.height) {
                    y = fieldRect.current.y + fieldRect.current.height - menuH;
                }
                return y;
            }
        }
        return 0;
    }

    function mouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (fieldRef.current) {
            fieldRect.current = fieldRef.current.getBoundingClientRect()
        }
        if (e.button !== 0) {
            return;
        }
        let target: HTMLElement | null;
        if (!(e.target instanceof HTMLElement)) {
            return
        }
        if (e.target.closest("#menu")) {
            return
        }
        target = e.target.closest("div");
        let div: HTMLDivElement;
        if (!(target instanceof HTMLDivElement)) {
            return
        }
        div = target;
        if (div.id === "set") {
            setShowMenu(false);
            selectSet(div, e);
            return;
        }
        if (div.id.split("_")[0] === "piece") {
            setShowMenu(false);
            selectSingle(div, e);
            return;
        }
        if (div.id === "field") {
            setShowMenu(false);
            selectMany(div, e)
            return
        }
    }

    function selectSingle(div: HTMLDivElement, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let coords = div.getBoundingClientRect()
        if (fieldRect.current) {
            shift.current.x = e.pageX - Number(div.style.left.split("px")[0]) - fieldRect.current.x;
            shift.current.y = e.pageY - Number(div.style.top.split("px")[0]) - fieldRect.current.y;
        }
        dragEl.current = div;
        setId(Number(div.id.split("_")[1]))
        if (fieldRect.current) {
            setMenuCoords({
                x: menuPos(coords, "x"),
                y: menuPos(coords, "y")
            })
            setTimeout(() => {
                setShowMenu(showTimer.current)
                if (showTimer.current) {
                    menuEl.current = div;
                }
            }, 150);
            showTimer.current = true;
        }
    }

    function selectSet(div: HTMLDivElement, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (fieldRect.current) {
            selectShift.current.x = e.pageX - Number(div.style.left.split("px")[0]) - fieldRect.current.x;
            selectShift.current.y = e.pageY - Number(div.style.top.split("px")[0]) - fieldRect.current.y;
        }
        setDragStart.current.x = Number(div.style.left.split("px")[0]);
        setDragStart.current.y = Number(div.style.top.split("px")[0]);
        movingSet.current = true;
    }

    function selectMany(div: HTMLDivElement, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!selectRef.current || !fieldRect.current) {
            return;
        }
        dragSetArr.current = [];
        clearSelected();
        selectStart.current = { x: e.pageX - fieldRect.current.x, y: e.pageY - fieldRect.current.y }
        selecting.current = true;
    }

    function dragSingle(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!dragEl.current || !fieldRect.current) {
            return;
        }
        if (dragSetArr.current) {
            dragSetArr.current = [];
        }
        let rect = fieldRect.current
        let coords = dragEl.current.getBoundingClientRect();
        if (Math.abs(menuPos(coords, "x") - menuCoords.x) > 5) {
            showTimer.current = false;
            setShowMenu(false);
        }
        if (Math.abs(menuPos(coords, "y") - menuCoords.y) > 5) {
            showTimer.current = false;
            setShowMenu(false);
        }
        dragEl.current.style.left = (e.pageX - rect.x - shift.current.x).toFixed(0) + 'px';
        dragEl.current.style.top = (e.pageY - rect.y - shift.current.y).toFixed(0) + 'px';
        if (e.pageX - rect.x - shift.current.x < 0) {
            dragEl.current.style.left = 0 + 'px';
        }
        if (e.pageY - rect.y - shift.current.y < 0) {
            dragEl.current.style.top = 0 + 'px';
        }
        if (rect.x + rect.width - (dragEl.current.offsetWidth - shift.current.x) - e.pageX < 0) {
            dragEl.current.style.left = (rect.width - dragEl.current.offsetWidth).toFixed(0) + 'px';
        }
        if (rect.y + rect.height - (dragEl.current.offsetHeight - shift.current.y) - e.pageY < 0) {
            dragEl.current.style.top = (rect.height - dragEl.current.offsetHeight).toFixed(0) + 'px';
        }
    }

    function dragSet(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!dragSetArr.current || !selectedSetRef.current || dragSetArr.current.length === 0 || !fieldRect.current) {
            return;
        }
        let rect = fieldRect.current
        selectedSetRef.current.style.left = (e.pageX - rect.x - selectShift.current.x).toFixed(0) + 'px';
        selectedSetRef.current.style.top = (e.pageY - rect.y - selectShift.current.y).toFixed(0) + 'px';
        if (e.pageX - rect.x - selectShift.current.x < 0) {
            selectedSetRef.current.style.left = 0 + 'px';
        }
        if (e.pageY - rect.y - selectShift.current.y < 0) {
            selectedSetRef.current.style.top = 0 + 'px';
        }
        if (rect.x + rect.width - (selectedSetRef.current.offsetWidth - selectShift.current.x) - e.pageX < 0) {
            selectedSetRef.current.style.left = (rect.width - selectedSetRef.current.offsetWidth).toFixed(0) + 'px';
        }
        if (rect.y + rect.height - (selectedSetRef.current.offsetHeight - selectShift.current.y) - e.pageY < 0) {
            selectedSetRef.current.style.top = (rect.height - selectedSetRef.current.offsetHeight).toFixed(0) + 'px';
        }
        let deltaX = setDragStart.current.x - Number(selectedSetRef.current.style.left.split("px")[0]);
        let deltaY = setDragStart.current.y - Number(selectedSetRef.current.style.top.split("px")[0]);
        dragSetArr.current.forEach((el) => {
            el.style.left = Number(el.style.left.split("px")[0]) - deltaX + "px"
            el.style.top = Number(el.style.top.split("px")[0]) - deltaY + "px"
        })
        setDragStart.current.x = Number(selectedSetRef.current.style.left.split("px")[0]);
        setDragStart.current.y = Number(selectedSetRef.current.style.top.split("px")[0]);
    }

    function dragSelection(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!selectRef.current || !fieldRect.current) {
            return;
        }
        dragSetArr.current = [];
        let endPoint = { x: e.pageX - fieldRect.current.x, y: e.pageY - fieldRect.current.y }
        let startPoint = selectStart.current;
        selectRef.current.style.left = (startPoint.x > endPoint.x) ? endPoint.x + "px" : startPoint.x + "px";
        selectRef.current.style.top = (startPoint.y > endPoint.y) ? endPoint.y + "px" : startPoint.y + "px";
        selectRef.current.style.height = Math.abs(endPoint.y - startPoint.y) + "px";
        selectRef.current.style.width = Math.abs(endPoint.x - startPoint.x) + "px";
        store.elements.forEach((el) => {
            if (isIntersect(el, selectRef.current) && fieldRef.current) {
                let element: HTMLDivElement | null = fieldRef.current.querySelector(`#piece_${el.props.id}`)
                if (element && !dragSetArr.current.includes(element)) {
                    dragSetArr.current.push(element);
                }
            }
        })
    }

    function isIntersect(el: Component, current: HTMLDivElement | null) {
        if (el && current) {
            let rect1 = { x: Number(el.props.left?.split("px")[0]) || 0, y: Number(el.props.top?.split("px")[0]) || 0, w: el.props.opt?.w || 0, h: el.props.opt?.h || 0 }
            let rect2 = { x: Number(current.style.left?.split("px")[0]) || 0, y: Number(current.style.top?.split("px")[0]) || 0, w: Number(current.style.width.split("px")[0]) || 0, h: Number(current.style.height.split("px")[0]) || 0 }
            if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x &&
                rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y) {
                return true;
            }
        }
        return false;
    }

    function mouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (selectedSetRef.current && movingSet.current) {
            dragSet(e);
            return;
        }
        if (dragEl.current && fieldRect.current) {
            dragSingle(e);
            return;
        }
        if (fieldRect.current && selecting.current) {
            dragSelection(e);
            return;
        }
    }

    function clearSelected() {
        if (selectedSetRef.current && dragSetArr.current.length === 0) {
            selectedSetRef.current.style.width = "0px";
            selectedSetRef.current.style.height = "0px";
            selectedSetRef.current.style.left = "-5000px";
            selectedSetRef.current.style.top = "-5000px";
        }
    }

    function mouseUp() {
        shift.current = { x: 0, y: 0 };
        if (dragEl.current) {
            store.saveElement(dragEl.current);
        }
        clearSelected();
        if (!movingSet.current && dragSetArr.current.length > 0 && selectedSetRef.current) {
            let left = Math.min(...dragSetArr.current.map(el => Number(el.style.left.split("px")[0])))
            let top = Math.min(...dragSetArr.current.map(el => Number(el.style.top.split("px")[0])))
            selectedSetRef.current.style.left = left - 2 + "px"
            selectedSetRef.current.style.top = top - 2 + "px"
            selectedSetRef.current.style.width =
                Math.max(...dragSetArr.current.map(el => Number(el.style.left.split("px")[0]) + Number(el.style.width.split("px")[0])))
                - left
                + 4
                + "px"
            selectedSetRef.current.style.height =
                Math.max(...dragSetArr.current.map(el => Number(el.style.top.split("px")[0]) + Number(el.style.height.split("px")[0])))
                - top
                + 4
                + "px"
        }
        if (movingSet.current && dragSetArr.current.length > 0 && selectedSetRef.current) {
            dragSetArr.current.forEach((el) => {
                store.saveElement(el);
            })
        }
        dragEl.current = null;
        movingSet.current = false;
        selecting.current = false;
        if (selectRef.current) {
            selectRef.current.style.width = "0px";
            selectRef.current.style.height = "0px";
            selectRef.current.style.left = "-5000px";
            selectRef.current.style.top = "-5000px";
        }
    }

    return (
        <div ref={fieldRef} style={{width: (store.configGlobal.fieldW) ? store.configGlobal.fieldW : undefined, height: (store.configGlobal.fieldH) ? store.configGlobal.fieldH : undefined}} id="field" onMouseUp={(e) => mouseUp()} onMouseMove={e => mouseMove(e)} onMouseDown={(e) => mouseDown(e)}
            className="relative w-full h-full bg-dot-white">
            {store.elements.map((el, i) => {
                return <Piece comm={el.props.comm} pointer={true} key={i} id={el.props.id} top={el.props.top} left={el.props.left} opt={el.props.opt} />
            })}
            {showMenu ? <Menu remove={remove} changeMenu={changeMenu} edit={redactor} id={id} x={menuCoords.x} y={menuCoords.y} /> : <></>}
            <div ref={selectRef} className="absolute bg-[#49474E] border-[#625F69] opacity-70 border-[2px]"></div>
            <div ref={selectedSetRef} id="set" className="absolute border-white border-[2px]"></div>
        </div>
    )
}

let observedField = observer(Field);

export default observedField;