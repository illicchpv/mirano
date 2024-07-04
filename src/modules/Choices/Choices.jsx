import './choices.scss';

export function Choices({children, buttonLabel, className, name, isOpen, cc}) {
    const handleToggle = () => cc(name);

    return (<>
        <div className={`${['choices', className].filter(el => el).join(' ')}`}>
            <button className="choices__btn" onClick={handleToggle}
                type="button">{buttonLabel}</button>

            {isOpen === name && <div className="choices__box">{children}</div>}
        </div>
    </>);
}
