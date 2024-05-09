import { IModel } from '../dataContext';
import { drawMap } from './drawBlock';

export function display(canvas: HTMLCanvasElement, context: IModel): void {
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        context.data.forEach((rowData, row) => {
            rowData.forEach((colData, col) => {
                const func = drawMap[colData];
                if (func) {
                    func(ctx, row, col);
                } else {
                    console.error(`Unknown value ${colData}`);
                }
            });
        });
    }
}
