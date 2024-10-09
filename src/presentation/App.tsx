import './App.css'
import { Card } from "./components/card.tsx";

function App() {

  return (
    <>
      <Card
        title='Forest Hills'
        trainLine='R'
        minute={2}
      />
      <Card
        title='96St'
        trainLine='Q'
        minute={1}
      />
    </>
  )
}

export default App
