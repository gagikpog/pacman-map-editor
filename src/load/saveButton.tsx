import { useCallback } from 'react'
import { useData } from '../dataContext';
import { Icon } from '../components/icon';

export const SaveButton = (props: IProps) => {

    const context = useData();

    const clickHandler = useCallback(() => {

        const header = `${context.data.length} ${context.data[0].length}\n`;
        const content = header + context.data.map((row) => row.join('')).join('\n');

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', 'map.lmp');
        
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

    }, [context]);

    return (
        <Icon className={props.className} onClick={clickHandler} icon='save' />
    );
};
