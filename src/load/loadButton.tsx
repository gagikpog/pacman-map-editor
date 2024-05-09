import { useCallback, useRef } from 'react'
import { useData } from '../dataContext';

export const LoadButton = () => {

    const context = useData();
    const inputRef =  useRef<HTMLInputElement>(null);

    const clickHandler = useCallback(() => inputRef.current?.click(), [inputRef]);

    const loadHandler = useCallback(() => {
        if (inputRef.current) {
            const files = inputRef.current.files;
            const reader = new FileReader();
            reader.onload = function () {
                if (typeof reader.result === 'string') {
                    context.loadData(reader.result);
                }
            };
            if(files?.length) {
                reader.readAsText(files[0]);
            }
        }
    }, [inputRef, context]);

    return (
        <>
            <input type="file" ref={inputRef} className="tw-hidden" accept=".lmp" onChange={loadHandler}/>
            <button onClick={clickHandler} className="text-3xl">import</button>
        </>
    );
};
