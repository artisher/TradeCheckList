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
    result: "Win" | "Loss";
};

export default function Statistic() {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [filter, setFilter] = useState({
        pair: "",
        type: "",
        setup: "",
    });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("trades") || "[]");
        setTrades(data);
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const filtered = trades.filter(t =>
        (filter.pair === "" || t.pair === filter.pair) &&
        (filter.type === "" || t.type === filter.type) &&
        (filter.setup === "" || t.setup === filter.setup)
    );

    const calcWinRate = (items: Trade[]) => {
        if (items.length === 0) return 0;
        const wins = items.filter(t => t.result === "Win").length;
        return ((wins / items.length) * 100).toFixed(1);
    };

    const overall = calcWinRate(filtered);
    const byPair = calcWinRate(filtered.filter(t => t.pair === filter.pair));
    const bySetup = calcWinRate(filtered.filter(t => t.setup === filter.setup));
    const byType = calcWinRate(filtered.filter(t => t.type === filter.type));

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-4xl text-blue-900 font-bold text-center mb-6">
                Win Rate Analysis
            </h1>
            <Link to={"/TradeCheckList/history"} className=" text-2xl bg-blue-700 p-3 text-white rounded-2xl">Back</Link>
            {/* Filters */}
            <div className="flex gap-4 mb-6 justify-center flex-wrap">
                <select name="pair" value={filter.pair} onChange={handleFilterChange}
                    className="p-2 border rounded">
                    <option value="">همه جفت ارزها</option>
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="XAU/USD">XAU/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                </select>
                <select name="setup" value={filter.setup} onChange={handleFilterChange}
                    className="p-2 border rounded">
                    <option value="">همه ستاپ‌ها</option>
                    <option value="CP">CP</option>
                    <option value="FTR">FTR</option>
                    <option value="RTI">RTI</option>
                    <option value="QM">QM</option>
                </select>
                <select name="type" value={filter.type} onChange={handleFilterChange}
                    className="p-2 border rounded">
                    <option value="">همه نوع‌ها</option>
                    <option value="Long">Long</option>
                    <option value="Short">Short</option>
                </select>

                <select name="setup" value={filter.setup} onChange={handleFilterChange}
                    className="p-2 border rounded">
                    <option value="">همه ستاپ‌ها</option>
                    <option value="CP">CP</option>
                    <option value="FTR">FTR</option>
                    <option value="RTI">RTI</option>
                    <option value="QM">QM</option>
                </select>
            </div>

            {/* Results */}
            <div className="bg-white p-6 rounded-xl shadow text-xl text-blue-900 flex flex-col gap-3">
                <p><strong>Winrate :</strong> {overall}%</p>

                {filter.pair && <p><strong>Winrate  {filter.pair}:</strong> {byPair}%</p>}

                {filter.setup && <p><strong>Winrate  {filter.setup}:</strong> {bySetup}%</p>}

                {filter.type && <p><strong>Winrate  {filter.type}:</strong> {byType}%</p>}
            </div>
        </div>
    );
}
