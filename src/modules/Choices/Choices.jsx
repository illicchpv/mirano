import './choices.scss';

export function Choices({children, buttonLabel, className}) {

    return (<>
        <div className={`${['choices', className].filter(el => el).join(' ')}`}>
            <button className="choices__btn"
                type="button">{buttonLabel}</button>

            <div className="choices__box">
                {children}
            </div>
        </div>
    </>);
}
