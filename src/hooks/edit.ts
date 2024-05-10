import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useData } from '../dataContext';
import { DataValue, ITEM_SIZE } from '../constants';

function convertPosition(event: MouseEvent<HTMLCanvasElement>) {
    const target = event.target as HTMLCanvasElement;

    const left = event.clientX - target.offsetLeft;
    const top = event.clientY - target.offsetTop;
    const x = Math.floor(left / ITEM_SIZE);
    const y = Math.floor(top / ITEM_SIZE);

    return [x, y];
}

const BRUSHES = new Map([
    [
        DataValue.Track, [
            [DataValue.Track,DataValue.Track,DataValue.Track,DataValue.Track],
            [DataValue.Track,DataValue.Track,DataValue.Track,DataValue.Track],
            [DataValue.Track,DataValue.Track,DataValue.Track,DataValue.Track],
            [DataValue.Track,DataValue.Track,DataValue.Track,DataValue.Track]
        ]
    ]
])

export function useEdit() {

    const {drawPixel, brush} = useData();
    const mousePressed = useRef(false);
    const brushRef = useRef<DataValue[][]>([[brush]]);
    const cursorRef = useRef<IPaintCursor>({ x: 0, y: 0, w: 1, h: 1 });

    const onMouseDown = useCallback((event: MouseEvent<HTMLCanvasElement>) => {
        mousePressed.current = true;
        const [x, y]= convertPosition(event);
        drawPixel(x, y, brushRef.current);
    }, [drawPixel, brushRef]);

    const onMouseUp = useCallback((event: MouseEvent<HTMLCanvasElement>) => {
        mousePressed.current = false;
    }, []);

    const onMouseMove = useCallback((event: MouseEvent<HTMLCanvasElement>) => {
        const [x, y]= convertPosition(event);
        if (mousePressed.current) {
            drawPixel(x, y, brushRef.current);
        }

        cursorRef.current = { x, y, w: brushRef.current[0].length, h: brushRef.current.length };

    }, [drawPixel, brushRef]);

    useEffect(() => {
        brushRef.current = BRUSHES.get(brush) || [[brush]];
    }, [brush]);

    return { onMouseDown, onMouseUp, onMouseMove, cursorRef };
}
