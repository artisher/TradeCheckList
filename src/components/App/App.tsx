import { useState } from "react"
import Header from "../Header/Header"
import StrategyDetails from "../strategyDetails/strategyDetails"
import StrategyList from "../StrategyList/StrategyList"


function App() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="backgroundImage px-4 pb-4">

        <Header />
        <StrategyList onSelect={(item: any) => setSelected(item)} />
        {selected && <StrategyDetails item={selected} />}
      </div>
    </>
  )
}

export default App
