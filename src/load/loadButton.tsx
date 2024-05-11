import { useCallback } from 'react';
import { useData } from '../dataContext';
import { Icon } from '../components/icon';
import { importData } from '../data/import';

export const LoadButton = (props: IProps) => {

    const { loadData } = useData();

    const clickHandler = useCallback(() => {
        importData().then((res) => {
            if (res) {
                loadData(res);
            }
        });
    }, [loadData]);

    return (
        <Icon className={props.className} onClick={clickHandler} icon='import' title='load'/>
    );
};
