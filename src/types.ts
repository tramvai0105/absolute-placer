export interface PieceOptions{
    name?: string,
    shape?: "s" | "r" | "c",
    w: number,
    h: number,
    color?: string,
    rounded?: string | number,
    rounds: {tl: boolean, tr: boolean, bl: boolean, br: boolean},
    borderColor?: string,
    border: number,
    borders: {l: boolean, r: boolean, t: boolean, b: boolean},
    rotation?: number,
    z?: number,
    text?: string,
    classes?: string[],
    textOpts: {size: number, color: string, vert: "t" | "b" | "c", hort: "l" | "r" | "c", p: number},
}

export interface PieceCommutationOptions{
    w: boolean,
    h: boolean,
    color: boolean,
    rounded: boolean,
    rounds: boolean,
    borderColor: boolean,
    border: boolean,
    rotation: boolean,
    z: boolean,
    text: boolean,
    classes: boolean,
    textOpts: {size: boolean, color: boolean, align: boolean, p: boolean},
}

export let defaultCommutation = {
    w: true,
    h: true,
    color: true,
    rounded: true,
    rounds: true,
    borderColor: true,
    border: true,
    borders: true,
    rotation: true,
    z: true,
    text: true,
    classes: true,
    textOpts: {size: true, color: true, align: true, p: true},
}

export interface Config{
    tailwind: boolean,
    cropTop: boolean,
    cropLeft: boolean,
}