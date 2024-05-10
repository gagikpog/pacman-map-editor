import { useRef } from 'react';
import { useData } from '../dataContext';
import { ITEM_SIZE } from '../constants';
import { useDraw } from '../hooks/draw';
import { useEdit } from '../hooks/edit';

export const Editor = (props: IProps) => {
    const context = useData();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {cursorRef, ...handlers} = useEdit();
    useDraw(canvasRef, cursorRef);

    return (
        <canvas
            ref={canvasRef}
            {...handlers}
            className={props.className}
            width={context.width * ITEM_SIZE}
            height={context.height * ITEM_SIZE}></canvas>
    );
}
