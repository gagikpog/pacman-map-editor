import { DataValue, ITEM_SIZE } from '../constants';
import { IModel } from '../dataContext';
import { drawMap } from './drawBlock';

const TRACK_LAYER = new Set([DataValue.Bonus, DataValue.Score, DataValue.Respawn]);

export function display(canvas: HTMLCanvasElement, context: IModel, cursor?: IPaintCursor): void {
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        context.forEach((row: number, col: number, value: DataValue): void => {
            const calcValue = TRACK_LAYER.has(value) ? DataValue.Track : value;

            const func = drawMap[calcValue];
            if (func) {
                func(ctx, row, col);
            } else {
                console.error(`Unknown value ${calcValue}`);
            }
        });

        context.forEach((row: number, col: number, value: DataValue): void => {
            if (TRACK_LAYER.has(value)) {
                const func = drawMap[value];
                if (func) {
                    func(ctx, row, col);
                } else {
                    console.error(`Unknown value ${value}`);
                }
            }
        });

        if (cursor) {
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(cursor.x * ITEM_SIZE, cursor.y * ITEM_SIZE - (cursor.h - 1) * ITEM_SIZE, cursor.h * ITEM_SIZE, cursor.w * ITEM_SIZE);
        }
    }
}
