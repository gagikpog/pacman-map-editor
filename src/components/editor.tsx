import { useRef } from 'react';
import { useData } from '../dataContext';
import { ITEM_SIZE } from '../constants';
import { useDraw } from '../hooks/draw';

export const Editor = (props: IProps) => {
    const context = useData();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useDraw(canvasRef);

    return (
        <canvas
            ref={canvasRef}
            className={props.className}
            width={context.width * ITEM_SIZE}
            height={context.height * ITEM_SIZE}></canvas>
    )

}
