import { LoadButton } from '../load/loadButton';
import { Brushes } from './brushes';

export const Menu = (props: IProps) => {
    return (
        <div className={`${props.className} tw-flex tw-items-center`}>
            <LoadButton/>
            <Brushes className='tw-ml-1'/>
        </div>
    );
}
