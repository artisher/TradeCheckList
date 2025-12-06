import { useState } from "react";

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

export const Form = () => {

    const [trade, setTrade] = useState<Trade>({
        date: "",
        entryTime: "",
        exitTime: "",
        pair: "EUR/USD",
        timeframe: "1m",
        type: "Long",
        setup: "CP",
        riskReward: "",
        notes: "",
        result: "Win",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTrade((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. اول داده‌های قبلی رو بخون از Local Storage
        const existingTrades = JSON.parse(localStorage.getItem("trades") || "[]");

        // 2. اضافه کردن ترید جدید
        const updatedTrades = [...existingTrades, trade];

        // 3. ذخیره مجدد تو Local Storage
        localStorage.setItem("trades", JSON.stringify(updatedTrades));

        // 4. اطلاع کاربر
        alert("Trade logged! Check console.");

        console.log(updatedTrades);

        // 5. ریست فرم (اختیاری)
        setTrade({
            date: "",
            entryTime: "",
            exitTime: "",
            pair: "EUR/USD",
            timeframe: "1m",
            type: "Long",
            setup: "CP",
            riskReward: "",
            notes: "",
            result: "Win",
        });
    };


    return (
        <div className="rounded-xl w-[80%] flex flex-col items-center justify-center bg-blue-900 p-4 mx-auto">
            <h2 className="text-4xl font-semibold text-white mb-2  text-center">Trade Journal</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md justify-center  w-[60%] flex flex-wrap gap-25"
            >
                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    نتیجه ترید:
                    <select
                        name="result"
                        value={trade.result}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                        required
                    >
                        <option value="Win">Win</option>
                        <option value="Loss">Loss</option>
                    </select>
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    تاریخ:
                    <input
                        type="date"
                        name="date"
                        value={trade.date}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                        required
                    />
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    زمان ورود:
                    <input
                        type="time"
                        name="entryTime"
                        value={trade.entryTime}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                        required
                    />
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    زمان خروج:
                    <input
                        type="time"
                        name="exitTime"
                        value={trade.exitTime}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                        required

                    />
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    جفت ارز:
                    <select
                        name="pair"
                        value={trade.pair}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                    >
                        <option value="EUR/USD">EUR/USD</option>
                        <option value="XAU/USD">XAU/USD</option>
                        <option value="USD/JPY">USD/JPY</option>
                    </select>
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    تایم فریم:
                    <select
                        name="timeframe"
                        value={trade.timeframe}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                    >
                        <option value="1m">1 دقیقه</option>
                        <option value="5m">5 دقیقه</option>
                        <option value="10m">10 دقیقه</option>
                        <option value="15m">15 دقیقه</option>
                        <option value="30m">30 دقیقه</option>
                        <option value="1h">1 ساعت</option>
                        <option value="4h">4 ساعت</option>
                    </select>
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    نوع ترید:
                    <select
                        name="type"
                        value={trade.type}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                    >
                        <option value="Long">Long</option>
                        <option value="Short">Short</option>
                    </select>
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    ستاپ:
                    <select
                        name="setup"
                        value={trade.setup}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded border-gray-300"
                    >
                        <option value="CP">CP</option>
                        <option value="FTR">FTR</option>
                        <option value="RTI">RTI</option>
                        <option value="QM">QM</option>
                    </select>
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    R/R :
                    <input
                        type="text"
                        name="riskReward"
                        value={trade.riskReward}
                        onChange={handleChange}
                        placeholder="1:2"
                        className="mt-1 p-2 border rounded w-full border-gray-300"
                    />
                </label>

                <label className="flex flex-col text-2xl text-blue-900 font-medium">
                    نکات مثبت / اشتباه:
                    <textarea
                        name="notes"
                        value={trade.notes}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 p-2 border rounded w-full border-gray-300 resize-none h-13"
                    />
                </label>

                <button
                    type="submit"
                    className="bg-blue-900 text-white text-2xl p-2 rounded hover:bg-blue-800 transition"
                >
                    ثبت ترید
                </button>
            </form>
        </div>
    );
};
