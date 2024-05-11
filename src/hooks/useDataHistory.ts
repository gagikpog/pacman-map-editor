import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { DataValue } from '../constants';
import { History } from '../utils/history';

export function useDataHistory() {
    const state = useState<DataValue[][]>([]);
    const [, setData] = state;
    const historyRef = useRef(new History())

    const addHistory = useCallback((value: DataValue[][]) => {
        historyRef.current.add(value);
    }, []);

    state[1] = useCallback((value: SetStateAction<DataValue[][]>) => {
        if (typeof value === 'function') {
            setData((prevValue) => {
                const res = value(prevValue);
                if (res !== prevValue) {
                    addHistory(res);
                }
                return res;
            })
        } else {
            setData(value);
            addHistory(value);
        }
    }, [setData, addHistory]);

    const keydownHandler = useCallback((event: KeyboardEvent) => {
        switch (event.code) {
            case 'KeyZ':
                if (event.ctrlKey) {
                    if (historyRef.current.back()) {
                        setData(historyRef.current.get());
                    }
                }
                break;
            case 'KeyY':
                if (event.ctrlKey) {
                    if (historyRef.current.forward()) {
                        setData(historyRef.current.get());
                    }
                }
                break;
        }
    }, [setData]);

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    }, [keydownHandler]);

    return state;
}