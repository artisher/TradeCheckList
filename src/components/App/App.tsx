import { Route, Routes } from "react-router-dom"
import Home from "../../pages/Home"
import { Journal } from "../../pages/Journal"
import History from "../../pages/History"
import Statistic from "../../pages/Statistic"


function App() {


  return (
    <Routes>
      <Route path="/TradeCheckList/" element={<Home />} />
      <Route path="/TradeCheckList/journal" element={<Journal />} />
      <Route path="/TradeCheckList/history" element={<History />} />
      <Route path="/TradeCheckList/statistic" element={<Statistic />} />
    </Routes>
  )
}

export default App
