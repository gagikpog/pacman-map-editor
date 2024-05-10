import { DataValue } from '../constants';
import { useData } from '../dataContext';
import { Icon } from './icon';

export const Brushes = (props: IProps) => {
    const {brush, setBrush} = useData();

    return (
        <div className={`${props.className || ''} tw-flex tw-items-center tw-gap-x-1`}>
            <Icon icon="wall" selected={brush === DataValue.Wall} onClick={() => setBrush(DataValue.Wall)}/>
            <Icon icon="erase" selected={brush === DataValue.Empty} onClick={() => setBrush(DataValue.Empty)}/>
        </div>
    );
}
