interface IIconProps extends IProps {
    icon: string;
    selected?: boolean;
    title?: string;
    onClick?: () => void;
}

export const Icon = ({icon, selected, onClick, className, title}: IIconProps) => {
    return (
        <img
            src={`/assets/${icon}.jpg`}
            className={`tw-cursor-pointer ${ selected ? 'icon-selected' : ''} ${className || ''}`}
            alt={icon}
            width={16}
            height={16}
            title={title}
            onClick={onClick}
        />
    );
};