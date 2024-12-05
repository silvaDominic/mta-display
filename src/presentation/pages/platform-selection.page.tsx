import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TrainService } from "../../application/services/train.service";
import { PlatformModel } from "../../application/models/platform.model";

export function PlatformSelectionPage() {
  const [platforms, setPlatform] = useState<PlatformModel[]>([]);
  const navigate = useNavigate();
  const {station} = useParams();

  useEffect(() => {
    TrainService.getPlatform(station)
      .then(res => setPlatform(res));
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>): void  {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const destination = formData.get('destination');

    navigate(`./platforms/${destination}`);
  }

  return (
    <div>
      <h1>Select Platform</h1>

      <form onSubmit={onSubmit}>
        <select name="destination" id="platform-select">
          {
            platforms.map(option =>
              <option key={option.id} value={option.id}>
                {option.destination} ({option.direction})
              </option>)
          }
        </select>
        <button>Confirm</button>
      </form>
    </div>
  );
}
