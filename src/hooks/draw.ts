import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useData } from '../dataContext';
import { display } from '../draw/display';

export function useDraw(ref: RefObject<HTMLCanvasElement>) {
    const canvas = ref.current;
    const context = useData();
    const animationId = useRef<number>(0);

    const draw = useCallback(() => {
        if (canvas) {
            display(canvas, context)
        }
        animationId.current = requestAnimationFrame(draw);
    }, [canvas, context])

    useEffect(() => {
        animationId.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationId.current);
    }, [draw, animationId])
}
