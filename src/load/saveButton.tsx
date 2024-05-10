import { useCallback } from 'react'
import { useData } from '../dataContext';
import { Icon } from '../components/icon';
import { normalizeMap } from '../normalize';
import { confirmation } from '../confirm';

export const SaveButton = (props: IProps) => {

    const context = useData();

    const clickHandler = useCallback(() => {
        try {
            const data = normalizeMap(context.data);

            const header = `${data.length} ${data[0].length}\n`;
            const content = header + data.map((row) => row.join('')).join('\n');

            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
            element.setAttribute('download', 'map.lmp');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        } catch (error) {
            if (error instanceof Error) {
                confirmation(error.message);
            }
        }
    }, [context]);

    return (
        <Icon className={props.className} onClick={clickHandler} icon='save' />
    );
};
