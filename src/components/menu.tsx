import { LoadButton } from '../load/loadButton';
import { SaveButton } from '../load/saveButton';
import { Brushes } from './brushes';

export const Menu = (props: IProps) => {
    return (
        <div className={`${props.className || ''} tw-flex tw-p-2 tw-flex-col tw-flex-shrink-0 tw-sticky tw-top-10`}>
            <div className='tw-flex tw-items-center'>
                <SaveButton/>
                <LoadButton className='tw-ml-1'/>
            </div>
            <Brushes className='tw-mt-4 tw-mr-auto'/>
        </div>
    );
}
