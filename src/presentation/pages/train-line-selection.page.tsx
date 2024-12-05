import { FormEvent, ReactElement, useEffect, useState } from "react";
import { TrainService } from "../../application/services/train.service";
import { RouteModel } from "../../application/models/route.model";
import { useNavigate } from "react-router";


export function TrainLineSelectionPage(): ReactElement {
  const [trainLines, setTrainLines] = useState<RouteModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    TrainService.getRoutes()
      .then(res => setTrainLines(res));
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>): void  {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const trainLine = formData.get('train-line');

    navigate(`./${trainLine}`);
  }

  return (
    <div>
      <h1>Select Train Line</h1>

      <form onSubmit={onSubmit}>
        <select id='train-line-select' name="train-line">
          {
            trainLines.map(route =>
              <option key={route.id} value={route.id}>
                {route.name}
              </option>)
          }
        </select>
        <button>Confirm</button>
      </form>
    </div>
  );
}
