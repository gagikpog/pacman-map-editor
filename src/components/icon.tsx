export const Icon = ({icon, selected, onClick}: { icon: string, selected?: boolean, onClick?: () => void }) => {
    return (
        <img
            src={`/assets/${icon}.jpg`}
            className={`tw-cursor-pointer ${ selected ? 'icon-selected' : ''}`}
            alt={icon}
            width={16}
            height={16}
            onClick={onClick}
        />
    );
};