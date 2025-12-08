// Journal.tsx
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            (filter.setup === "" || trade.setup === filter.setup)
        );
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between">
                <Link to={"/TradeCheckList/journal"} className=" text-2xl bg-blue-700 p-3 text-white rounded-2xl">Back</Link>
                <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center ">
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
                        className="p-2 border rounded border-gray-300"
                    >
                        <option value="">همه جفت ارزها</option>
                        <option value="EUR/USD">EUR/USD</option>
                        <option value="XAU/USD">XAU/USD</option>
                        <option value="USD/JPY">USD/JPY</option>
                    </select>

                    <select
                        name="type"
                        value={filter.type}
                        onChange={handleFilterChange}
                        className="p-2 border rounded border-gray-300"
                    >
                        <option value="">همه نوع تریدها</option>
                        <option value="Long">Long</option>
                        <option value="Short">Short</option>
                    </select>

                    <select
                        name="setup"
                        value={filter.setup}
                        onChange={handleFilterChange}
                        className="p-2 border rounded border-gray-300"
                    >
                        <option value="">همه ستاپ‌ها</option>
                        <option value="CP">CP</option>
                        <option value="FTR">FTR</option>
                        <option value="RTI">RTI</option>
                        <option value="QM">QM</option>
                    </select>
                </div>

                {/* لیست تریدها */}
                {filteredTrades.length === 0 ? (
                    <div className="p-6 text-center text-2xl text-gray-700">
                        هیچ تریدی پیدا نشد
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-10 ">
                        {filteredTrades.map((trade, index) => (
                            <div
                                key={index}
                                className={`${trade.result === "Win" ? `bg-green-50` : `bg-red-50 `} flex flex-col justify-center items-center gap-10 pt-10.5  shadow-md border border-gray-200 rounded-xl p-4  w-[75%] mx-auto   hover:shadow-md transition relative`}

                            >

                                <button
                                    onClick={() => handleDelete(index)}
                                    className="absolute top-2 right-2 bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 transition"
                                >
                                    حذف
                                </button>
                                <p><strong>Result:</strong> <span className={` ${trade.result === "Win" ? `text-green-600 font-bold` : `text-red-600 font-bold`}`}>{trade.result}</span></p>
                                <div className="flex gap-10">
                                    <p className="text-sm text-gray-600"><strong>زمان ورود:</strong> {trade.entryTime}</p>
                                    <p className="text-sm text-gray-600"><strong>زمان خروج:</strong> {trade.exitTime}</p>
                                    <p className="text-sm text-gray-600"><strong>تاریخ:</strong> {trade.date}</p>

                                </div>
                                <div className="flex gap-10">
                                    <p><strong> Pair:</strong><span className={`px-2 py-1 font-bold ${trade.pair === "EUR/USD" ? "text-blue-600" : trade.pair === "XAU/USD" ? "text-yellow-400" : "text-pink-500"} text-xs`}>{trade.pair}</span> </p>
                                    <div className="flex gap-1 items-center">
                                        <Clock className="w-5 h-5 " />
                                        <p><strong>Time Frame :</strong> {trade.timeframe}</p>

                                    </div>
                                    <div className="flex items-center">
                                        <p><strong>نوع ترید:</strong> {trade.type}</p>
                                        {trade.type === "Long" ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                                    </div>

                                </div>
                                <div className="flex gap-10">
                                    <p><strong>ستاپ:</strong> {trade.setup}</p>
                                    <p><strong>R/R:</strong> {trade.riskReward}</p>
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
