import { useCallback } from 'react';
import { useData } from '../dataContext';
import { LoadButton } from '../load/loadButton';
import { SaveButton } from '../load/saveButton';
import { getScoreMap } from '../utils/getScoreMap';
import { Brushes } from './brushes';
import { Icon } from './icon';

export const Menu = (props: IProps) => {

    const {data, drawPixel} = useData();

    const fillHandler = useCallback(() => {
        const res = getScoreMap(data);
        drawPixel(0, res.length - 1, res);
    }, [data, drawPixel]);

    return (
        <div className={`${props.className || ''} tw-flex tw-p-2 tw-flex-col tw-flex-shrink-0 tw-sticky tw-top-10`}>
            <div className='tw-flex tw-items-center'>
                <SaveButton/>
                <LoadButton className='tw-ml-1'/>
            </div>
            <Brushes className='tw-mt-4 tw-mr-auto'/>
            <span className='tw-border-solid tw-border tw-mt-4 tw-mb-4 tw-w-4 tw-border-black'></span>
            <Icon icon="autofill"  title='auto fill scores' onClick={fillHandler} />
        </div>
    );
}
