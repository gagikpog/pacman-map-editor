interface IIconProps extends IProps {
    icon: string;
    selected?: boolean;
    title?: string;
    type?: string;
    size?: number;
    onClick?: () => void;
}

export const Icon = ({icon, selected, onClick, className, title, type = 'jpg', size = 16}: IIconProps) => {
    return (
        <img
            src={`./assets/${icon}.${type}`}
            className={`tw-cursor-pointer ${ selected ? 'icon-selected' : ''} ${className || ''}`}
            alt={icon}
            width={size}
            height={size}
            title={title}
            onClick={onClick}
        />
    );
};
