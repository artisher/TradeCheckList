import { useEffect, useState } from "react"
import { RandomText } from "../../Data/RandomText";
import Clock from "./Clock";
import { Link } from "react-router-dom";

const Header = () => {

    const [randomText, setRandomText] = useState("");


    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * RandomText.length);
        setRandomText(RandomText[randomIndex])

    }, [])


    return (
        <div >
            <div className=" px-2 flex justify-between items-center text-yellow-300 h-32">

                <h2 className="text-[14px] w-[50%] font-bold lg:text-3xl">
                    {randomText}
                </h2>
                <h2 className="cursor-pointer bg-amber-400 p-5 text-center rounded-2xl">
                    <Link to={"/TradeCheckList/journal"} className="text-gray-700">Journal</Link>
                </h2>
                <h2 className="text-xl font-bold lg:text-3xl">
                    <Clock />
                </h2>
            </div>
        </div>
    )
}

export default Header