import {useRef} from 'react';
import './choices.scss';
import {useEffect} from 'react';
import {adjustElementPosition, debounce} from '../../const';

export function Choices({children, buttonLabel, className, isOpen, handleChoicesToggle}) {
  const choiceRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      adjustElementPosition(choiceRef.current);
    }
    const debAdjustElementPosition = debounce(() => {
      if (isOpen) {
        adjustElementPosition(choiceRef.current);
      }
    }, 100);

    window.addEventListener('resize', debAdjustElementPosition);
    return () => window.removeEventListener('resize', debAdjustElementPosition);
  }, [isOpen]);

  return (<>
    <div className={`${['choices', className].filter(el => el).join(' ')}`}>
      <button className="choices__btn" onClick={handleChoicesToggle}
        type="button">{buttonLabel}</button>

      {isOpen && <div className="choices__box" ref={choiceRef}>{children}</div>}
    </div>
  </>);
}
