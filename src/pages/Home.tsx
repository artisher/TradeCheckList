import { useState } from "react"
import Header from "../components/Header/Header"
import StrategyList from "../components/StrategyList/StrategyList"
import StrategyDetails from "../components/strategyDetails/strategyDetails"



function Home() {
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

export default Home
