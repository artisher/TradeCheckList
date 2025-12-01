import { useEffect, useState } from "react"
import { RandomText } from "../../Data/RandomText";
import Clock from "./Clock";

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
                <h2 className="text-xl font-bold lg:text-3xl">
                    <Clock />
                </h2>

            </div>
        </div>
    )
}

export default Header