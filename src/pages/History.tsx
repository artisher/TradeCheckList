// Journal.tsx
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import historyBg from "../assets/img/historyBg.jpg"




type Trade = {
    date: string;
    entryTime: string;
    exitTime: string;
    pair: string;
    timeframe: string;
    type: "Long" | "Short";
    setup: string;
    riskReward: string;
    notes: string;
    result: "Win" | "Loss",
};

export const History = () => {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [filter, setFilter] = useState({
        pair: "",
        type: "",
        setup: "",
        timeframe: "",
    });

    useEffect(() => {
        const storedTrades = JSON.parse(localStorage.getItem("trades") || "[]");
        setTrades(storedTrades);
    }, []);

    const handleDelete = (index: number) => {
        const updatedTrades = trades.filter((_, i) => i !== index);
        setTrades(updatedTrades);
        localStorage.setItem("trades", JSON.stringify(updatedTrades));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const filteredTrades = trades.filter(trade => {
        return (
            (filter.pair === "" || trade.pair === filter.pair) &&
            (filter.type === "" || trade.type === filter.type) &&
            (filter.setup === "" || trade.setup === filter.setup)&&
            (filter.timeframe === "" || trade.timeframe === filter.timeframe)
        );
    });

    return (
        <div className="p-6  mx-auto  bg-cover bg-center " style={{ backgroundImage: `url(${historyBg})` }}>
            <div className="flex justify-between">
                <Link to={"/TradeCheckList/journal"} className=" text-2xl bg-blue-700 p-3 text-white rounded-2xl">Back</Link>
                <h2 className="text-4xl font-bold text-blue-600 mb-4 text-center ">
                    Trade Journal History
                </h2>
                <Link to={"/TradeCheckList/statistic"} className=" text-2xl bg-blue-700 p-3 text-white rounded-2xl">statistic</Link>

            </div>

            <div>
                <div className="flex  flex-wrap gap-4 mb-4 justify-center">
                    <select
                        name="pair"
                        value={filter.pair}
                        onChange={handleFilterChange}
                        className="p-2 text-blue-600 font-bold border rounded bg-white border-gray-300"
                    >
                        <option className="text-blue-600 font-bold" value="">همه جفت ارزها</option>
                        <option className="text-blue-600 font-bold" value="EUR/USD">EUR/USD</option>
                        <option className="text-blue-600 font-bold" value="XAU/USD">XAU/USD</option>
                        <option className="text-blue-600 font-bold" value="USD/JPY">USD/JPY</option>
                    </select>

                    <select
                        name="type"
                        value={filter.type}
                        onChange={handleFilterChange}
                        className="p-2 border rounded bg-white text-blue-600 font-bold border-gray-300"
                    >
                        <option className="text-blue-600 font-bold" value="">همه نوع تریدها</option>
                        <option className="text-blue-600 font-bold" value="Long">Long</option>
                        <option className="text-blue-600 font-bold" value="Short">Short</option>
                    </select>

                    <select
                        name="timeframe"
                        value={filter.timeframe}
                        onChange={handleFilterChange}
                        className="p-2 border rounded bg-white text-blue-600 font-bold border-gray-300"
                    >
                        <option className="text-blue-600 font-bold" value="">All Time Frame</option>
                        <option className="text-blue-600 font-bold" value="1m">1m</option>
                        <option className="text-blue-600 font-bold" value="5m">5m</option>
                        <option className="text-blue-600 font-bold" value="10m">10m</option>
                        <option className="text-blue-600 font-bold" value="15m">15m</option>
                        <option className="text-blue-600 font-bold" value="30m">30m</option>
                        <option className="text-blue-600 font-bold" value="1h">1h</option>
                        <option className="text-blue-600 font-bold" value="4h">4h</option>
                    </select>

                    <select
                        name="setup"
                        value={filter.setup}
                        onChange={handleFilterChange}
                        className="p-2 border rounded bg-white text-blue-600 font-bold border-gray-300"
                    >
                        <option className="text-blue-600 font-bold" value="">همه ستاپ‌ها</option>
                        <option className="text-blue-600 font-bold" value="CP">CP</option>
                        <option className="text-blue-600 font-bold" value="FTR">FTR</option>
                        <option className="text-blue-600 font-bold" value="RTI">RTI</option>
                        <option className="text-blue-600 font-bold" value="QM">QM</option>
                    </select>
                </div>

                {/* لیست تریدها */}
                {filteredTrades.length === 0 ? (
                    <div className="p-6 text-center text-2xl text-gray-700">
                        هیچ تریدی پیدا نشد
                    </div>
                ) : (
                    <div className="flex flex-col gap-10 ">
                        {filteredTrades.map((trade, index) => (
                            <div
                                key={index}
                                className={`bg-gray-600 flex flex-col justify-center items-center gap-10 pt-10.5  shadow-md border border-gray-200 rounded-xl p-4 
                                     w-[49%] mx-auto   hover:shadow-md transition relative`}

                            >
                                {/* ${trade.result === "Win" ? `bg-green-50` : `bg-red-50 `} */}
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="absolute top-2 right-2 cursor-pointer bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 transition"
                                >
                                    حذف
                                </button>
                                <p><strong className="text-white text-xl">Result:</strong> <span className={`text-xl ${trade.result === "Win" ? `text-green-500 font-bold` : `text-red-500 font-bold`}`}>{trade.result}</span></p>
                                <div className="flex gap-10">
                                    <p className="text-l text-white "><strong>Entry :</strong> {trade.entryTime}</p>
                                    <p className="text-l text-white "><strong>Exit :</strong> {trade.exitTime}</p>
                                    <p className="text-l text-white "><strong>Date:</strong> {trade.date}</p>

                                </div>
                                <div className="flex gap-10">
                                    <p><strong className="text-white text-xl"> Pair: </strong><span className={`font-bold ${trade.pair === "EUR/USD" ? "text-blue-600" : trade.pair === "XAU/USD" ? "text-yellow-400" : "text-pink-500"} text-xl`}>{trade.pair}</span> </p>
                                    <div className="flex gap-1 items-center">
                                        <Clock className="w-5 h-5 text-white" />
                                        <p className="text-white text-xl"><strong>Time Frame :</strong> {trade.timeframe}</p>

                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-white text-xl"><strong>Type :</strong> {trade.type}</p>
                                        {trade.type === "Long" ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                                    </div>

                                </div>
                                <div className="flex gap-10 text-white">
                                    <p className="text-xl"><strong>Setup:</strong> {trade.setup}</p>
                                    <p className="text-xl"><strong>R/R:</strong> {trade.riskReward}</p>
                                    {trade.notes &&
                                        <p><strong>نکات:</strong> {trade.notes}</p>}

                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* فیلتر */}

        </div>
    );
};

export default History;
