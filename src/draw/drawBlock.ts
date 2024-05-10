import { DataValue, ITEMS_COLOR, ITEM_SIZE } from '../constants';

type TDrawBlock = (ctx: CanvasRenderingContext2D, row: number, col: number) => void;
type TDrawMap = Record<DataValue, TDrawBlock>;

function rect(color: string): TDrawBlock {
    return (ctx: CanvasRenderingContext2D, row: number, col: number): void => {
        ctx.fillStyle = color;
        ctx.fillRect(col * ITEM_SIZE, row * ITEM_SIZE, ITEM_SIZE, ITEM_SIZE);
    };
}

function circle(color: string): TDrawBlock {
    const r = ITEM_SIZE * 0.2;

    return (ctx: CanvasRenderingContext2D, row: number, col: number): void =>  {
        ctx.fillStyle = color;
        const circle = new Path2D();
        circle.arc(col * ITEM_SIZE + ITEM_SIZE * 2, row * ITEM_SIZE - ITEM_SIZE, r, 0, 2 * Math.PI, false);
        ctx.fill(circle);
    };
}

function pass(color: string): TDrawBlock {
    return () => {};
}

export const drawMap: TDrawMap = {
    [DataValue.Empty]: pass(ITEMS_COLOR[DataValue.Empty]),
    [DataValue.Wall]: rect(ITEMS_COLOR[DataValue.Wall]),
    [DataValue.Track]: pass(ITEMS_COLOR[DataValue.Track]),
    [DataValue.Bonus]: circle(ITEMS_COLOR[DataValue.Bonus]),
    [DataValue.Score]: circle(ITEMS_COLOR[DataValue.Score]),
    [DataValue.PrivateTrack]: rect(ITEMS_COLOR[DataValue.PrivateTrack]),
    [DataValue.Respawn]: circle(ITEMS_COLOR[DataValue.Respawn]),
    [DataValue.Hidden]: pass(ITEMS_COLOR[DataValue.Hidden])
};
