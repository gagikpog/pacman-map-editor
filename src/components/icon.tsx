interface IIconProps extends IProps {
    icon: string;
    selected?: boolean;
    onClick?: () => void;
}

export const Icon = ({icon, selected, onClick, className}: IIconProps) => {
    return (
        <img
            src={`/assets/${icon}.jpg`}
            className={`tw-cursor-pointer ${ selected ? 'icon-selected' : ''} ${className || ''}`}
            alt={icon}
            width={16}
            height={16}
            onClick={onClick}
        />
    );
};