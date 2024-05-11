import { useCallback, useRef } from 'react';
import { useData } from '../dataContext';
import { Icon } from '../components/icon';

export const LoadButton = (props: IProps) => {

    const context = useData();
    const inputRef =  useRef<HTMLInputElement>(null);

    const clickHandler = useCallback(() => inputRef.current?.click(), [inputRef]);

    const loadHandler = useCallback(() => {
        new Promise<boolean>((resolve) => {
            if (inputRef.current) {
                const files = inputRef.current.files;
                const reader = new FileReader();
                reader.onload = function () {
                    if (typeof reader.result === 'string') {
                        context.loadData(reader.result);
                        resolve(false);
                    } else {
                        resolve(false);
                    }
                };
                reader.onerror = () => resolve(false);

                if(files?.length) {
                    reader.readAsText(files[0]);
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        }).then(() => {
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        });
    }, [inputRef, context]);

    return (
        <>
            <input type="file" ref={inputRef} className="tw-hidden" accept=".lmp" onChange={loadHandler}/>
            <Icon className={props.className} onClick={clickHandler} icon='import' title='load'/>
        </>
    );
};
