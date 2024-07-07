import './choices.scss';

export function Choices({children, buttonLabel, className, isOpen, handleChoicesToggle}) {

    return (<>
        <div className={`${['choices', className].filter(el => el).join(' ')}`}>
            <button className="choices__btn" onClick={handleChoicesToggle}
                type="button">{buttonLabel}</button>

            {isOpen && <div className="choices__box">{children}</div>}
        </div>
    </>);
}
