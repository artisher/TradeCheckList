// Journal.tsx
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
    result: "Win" | "Loss" ,
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
                <div className="flex gap-4 mb-4 flex-wrap justify-center">
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
                    <div className="flex flex-col gap-4">
                        {filteredTrades.map((trade, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition relative"
                            >
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                                >
                                    حذف
                                </button>
                                <p><strong>نتیجه:</strong> {trade.result}</p>
                                <p><strong>تاریخ:</strong> {trade.date}</p>
                                <p><strong>زمان ورود:</strong> {trade.entryTime}</p>
                                <p><strong>زمان خروج:</strong> {trade.exitTime}</p>
                                <p><strong>جفت ارز:</strong> {trade.pair}</p>
                                <p><strong>تایم فریم:</strong> {trade.timeframe}</p>
                                <p><strong>نوع ترید:</strong> {trade.type}</p>
                                <p><strong>ستاپ:</strong> {trade.setup}</p>
                                <p><strong>R/R:</strong> {trade.riskReward}</p>
                                <p><strong>نکات:</strong> {trade.notes}</p>
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
