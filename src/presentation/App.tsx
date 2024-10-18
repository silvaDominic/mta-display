import './App.scss'
import { Card } from "./components/card.tsx";

function App() {

  return (
    <>
      <div id="deck">
        <div className="left-direction direction">
          <img src="./public/icons/arrow-left-circle-outlined.svg" alt="Left arrow"/>
          <Card
            title='Forest Hills'
            trainLine='R'
            minute={2}
          />
        </div>

        <div className="right-direction direction">
          <img src="./public/icons/arrow-right-circle-outlined.svg" alt="Right arrow"/>
          <Card
            title='96St'
            trainLine='Q'
            minute={1}
          />
        </div>
      </div>
    </>
  )
}

export default App
