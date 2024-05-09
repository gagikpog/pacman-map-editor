import { useRef } from 'react';
import { useData } from '../dataContext';

const ITEM_SIZE = 10;

export const Editor = (props: IProps) => {
    const context = useData();
    const canvasRef = useRef(null);

    return (
        <canvas
            ref={canvasRef}
            className={props.className}
            width={context.width * ITEM_SIZE}
            height={context.height * ITEM_SIZE}></canvas>
    )

}
