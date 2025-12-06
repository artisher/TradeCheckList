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
                    <h2 className="cursor-pointer bg-blue-800 p-5 text-center rounded-2xl">
                        <Link to={"/TradeCheckList/history"} className="text-white text-2xl font-bold">Back</Link>
                    </h2>
                    <h1 className="text-white text-5xl font-bold">Write Jornal</h1>
                    <h2 className="cursor-pointer bg-blue-800 p-5 text-center rounded-2xl">
                        <Link to={"/TradeCheckList/history"} className="text-white text-2xl font-bold">History</Link>
                    </h2>
                </div>

                <div className="w-full">
                    <Form />
                </div>
            </div>

        </div>
    )
}
