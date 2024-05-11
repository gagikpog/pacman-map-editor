import { SyntheticEvent, useCallback } from "react";

interface ISizeEditorProps extends IProps {
    onSubmit?(width: number, height: number): void;
}

export const SizeEditor = ({ onSubmit, className }: ISizeEditorProps) => {

    const submitHandler = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (event.target) {
            const data = new FormData(event.target as HTMLFormElement);
            const width = Number(data.get('width'));
            const height = Number(data.get('height'));
            onSubmit?.(width, height);
        }
    }, [onSubmit]);

    return (
        <form action="" onSubmit={submitHandler} className={`${className || ''} tw-grid tw-grid-cols-2 tw-gap-1`}>
            <div>Width</div>
            <div>
                <input className="tw-p-1 tw-rounded tw-w-14" min={10} max={70} maxLength={2} name="width" defaultValue={64} type="number" />
                <span className="tw-p-1"></span>
            </div>
            <div>Height</div>
            <div>
                <input className="tw-p-1 tw-rounded tw-w-14" min={10} max={70} maxLength={2} name="height" defaultValue={64} type="number" />
                <span className="tw-p-1"></span>
            </div>
            <span></span>
            <input className="tw-underline tw-cursor-pointer" type="submit" value="Create" />
        </form>
    );
};
