import { FormEvent } from "react";
import { useNavigate } from "react-router";

import './pages.styles.scss';
import { DIRECTION } from "../../shared/constants/direction.enum";

export function DirectionSelectionPage() {
  const navigate = useNavigate();

  function onSubmit(event: FormEvent<HTMLFormElement>): void  {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const direction = formData.get('direction');

    navigate(`./platforms/${direction}`);
  }

  return (
    <div className='selection__container'>
      <h1>Select Train Direction</h1>

      <form onSubmit={onSubmit}>
        <select name="direction" id="direction-select">
          <option value={DIRECTION.N}>Northbound</option>
          <option value={DIRECTION.S}>Southbound</option>
          <option value={DIRECTION.BOTH}>Both</option>
        </select>
        <button>Confirm</button>
      </form>
    </div>
  );
}
