import { Link } from "react-router-dom"
import bgHeader from "../assets/img/bgJornalHeader.png"
import { Form } from "../components/Form/Form"
export const Journal = () => {
    return (
        <div
            className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgHeader})` }}
        >
            <div className="flex  pt-5 flex-col justify-center items-center gap-10">
                <div className="flex gap-10 items-center">

                    <Link to={"/TradeCheckList/"} className="text-white text-2xl font-bold cursor-pointer bg-blue-800 p-5 text-center rounded-2xl">Home</Link>

                    <h1 className="text-white text-5xl font-bold">Write Jornal</h1>

                    <Link to={"/TradeCheckList/history"} className="cursor-pointer bg-blue-800 p-5 text-center rounded-2xl text-white text-2xl font-bold">History</Link>

                </div>

                <div className="w-full">
                    <Form />
                </div>
            </div>

        </div>
    )
}
