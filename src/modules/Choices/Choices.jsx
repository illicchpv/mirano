import './choices.scss';
import {useState} from 'react';

export function Choices({children, buttonLabel, className}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(p => !p);

    return (<>
        <div className={`${['choices', className].filter(el => el).join(' ')}`}>
            <button className="choices__btn" onClick={handleToggle}
                type="button">{buttonLabel}</button>

            {isOpen && <div className="choices__box">{children}</div>}
        </div>
    </>);
}
