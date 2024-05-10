import { LoadButton } from '../load/loadButton';
import { SaveButton } from '../load/saveButton';
import { Brushes } from './brushes';

export const Menu = (props: IProps) => {
    return (
        <div className={`${props.className} tw-flex tw-p-2 tw-items-center`}>
            <SaveButton/>
            <LoadButton className='tw-ml-1'/>
            <Brushes className='tw-ml-4'/>
        </div>
    );
}
