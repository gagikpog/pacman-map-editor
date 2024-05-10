import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useData } from '../dataContext';
import { display } from '../draw/display';

export function useDraw(canvasRef: RefObject<HTMLCanvasElement>, cursorRef: RefObject<IPaintCursor>) {
    const canvas = canvasRef.current;
    const context = useData();
    const animationId = useRef<number>(0);

    const draw = useCallback(() => {
        if (canvas) {
            display(canvas, context, cursorRef.current || undefined)
        }
        animationId.current = requestAnimationFrame(draw);
    }, [cursorRef, canvas, context]);

    useEffect(() => {
        animationId.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationId.current);
    }, [draw, animationId])
}
