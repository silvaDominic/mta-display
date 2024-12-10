import { FormEvent, ReactElement, useEffect, useState } from "react";
import { TrainService } from "../../application/services/train.service";
import { StationModel } from "../../application/models/station.model";
import { useNavigate, useParams } from "react-router";

import './pages.styles.scss';

export function StationSelectionPage(): ReactElement {
  const [stations, setStations] = useState<StationModel[]>([]);
  const navigate = useNavigate();
  const {line} = useParams()

  useEffect(() => {
    TrainService.getStations(line)
      .then(res => setStations(res));
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>): void  {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const station = formData.get('station');

    navigate(`./stations/${station}`);
  }

  return (
    <div className='selection__container'>
      <h1>Select Station</h1>

      <form onSubmit={onSubmit}>
        <select name="station" id="station-select">
          {
            stations.map(station =>
              <option key={station.id} value={station.id}>
                {station.name}
              </option>)
          }
        </select>
        <button>Confirm</button>
      </form>
    </div>
  );
}
