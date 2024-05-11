import { useCallback } from 'react';
import { useData } from '../dataContext';
import { importData } from '../data/import';
import { SizeEditor } from './sizeEditor';

export const Empty = (props: IProps) => {

    const { create, loadData } = useData();

    const importHandler = useCallback(() => {
        importData().then((res: string) => {
            if (res) {
                loadData(res);
            }
        });
    }, [loadData]);

    return (
        <div className={`${props.className || ''} tw-bg-emerald-600 tw-p-3 tw-rounded`}>
            <div className="tw-mb-2">
                <button className="tw-underline" onClick={importHandler}>Open</button> file or create
            </div>
            <div className="tw-flex tw-gap-2">
                <SizeEditor onSubmit={create} />
            </div>
        </div>
    );
}
