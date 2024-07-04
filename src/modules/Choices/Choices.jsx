import './choices.scss';
// import {useState} from 'react';

export function Choices({children, buttonLabel, className, name, isOpen, cc}) {
    // const [isOpen, setIsOpen] = useState(false);

    // const handleToggle = () => setIsOpen(p => !p);
    const handleToggle = () => cc(name);

    return (<>
        <div className={`${['choices', className].filter(el => el).join(' ')}`}>
            <button className="choices__btn" onClick={handleToggle}
                type="button">{buttonLabel}</button>

            {/* {isOpen && <div className="choices__box">{children}</div>} */}
            {isOpen === name && <div className="choices__box">{children}</div>}
        </div>
    </>);
}
