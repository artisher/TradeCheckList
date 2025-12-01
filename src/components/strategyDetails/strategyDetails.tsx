import { CheckIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

// تایپ برای گزینه‌های گروهی
interface GroupOption {
    label: string;
    weight: number;
    checked: boolean;
}

// تایپ هر چک
interface CheckItem {
    type: "normal" | "group";
    text: string;
    weight?: number; // فقط برای normal
    checked?: boolean; // فقط برای normal
    options?: GroupOption[]; // فقط برای group
}

// تایپ props کامپوننت
interface StrategyItem {
    fullName: string;
    checkList: CheckItem[];
    images: string[];
}

interface StrategyDetailsProps {
    item: StrategyItem;
}

const StrategyDetails = ({ item }: StrategyDetailsProps) => {
    if (!item) return null;

    const [open, setOpen] = useState(false);
    const [checks, setChecks] = useState<CheckItem[]>(item.checkList);

    useEffect(() => {
        setChecks(item.checkList);
    }, [item]);

    const handleToggle = (index: number) => {
        setChecks((prev) =>
            prev.map((c, i) =>
                i === index ? { ...c, checked: !c.checked } : c
            )
        );
    };

    const handleGroupSelect = (parentIndex: number, optionIndex: number) => {
        setChecks((prev) => {
            const copy = [...prev];
            if (!copy[parentIndex].options) return copy;
            copy[parentIndex].options = copy[parentIndex].options.map((o, i) => ({
                ...o,
                checked: i === optionIndex,
            }));
            return copy;
        });
    };

    const winrate = checks.reduce((sum, item) => {
        if (item.type === "normal" && item.checked) return sum + (item.weight || 0);
        if (item.type === "group") {
            const selected = item.options?.find(o => o.checked);
            if (selected) return sum + selected.weight;
        }
        return sum;
    }, 0);

    return (
        <div className="mt-30">
            <h1 className="text-white text-center font-bold text-3xl w-[70%] rounded-3xl mx-auto">
                {item.fullName}
            </h1>

            <div className="flex flex-col gap-10 mt-10">
                <ul className="flex flex-col gap-4 text-2xl">
                    {checks.map((item, i) => (
                        <div key={i}>
                            {item.type === "normal" && (
                                <div
                                    onClick={() => handleToggle(i)}
                                    className="flex items-center gap-4 text-gray-600 bg-amber-400 p-4 rounded-2xl cursor-pointer"
                                >
                                    <li className="flex-1 text-xl">{item.text}</li>
                                    <div className="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                                        {item.checked && <CheckIcon className="w-4 h-4 text-blue-500" />}
                                    </div>
                                </div>
                            )}

                            {item.type === "group" && (
                                <div className="flex flex-col items-center gap-4 text-gray-600 bg-amber-400 p-4 rounded-2xl cursor-pointer">
                                    <li className="flex-1">{item.text}</li>
                                    <div className="flex gap-10">
                                        {item.options?.map((opt, optIndex) => (
                                            <div key={optIndex} className="flex items-center gap-2" onClick={() => handleGroupSelect(i, optIndex)}>
                                                <h1 className="text-xl">{opt.label}</h1>
                                                <div className="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                                                    {opt.checked && <CheckIcon className="w-4 h-4 text-blue-500" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </ul>

                {/* Progress Bar */}
                <div className="mt-6">
                    <h1 className="text-xl font-semibold mb-2">Progress</h1>
                    <div className="w-full h-6 bg-gray-300 rounded-2xl overflow-hidden">
                        <div
                            className="h-6 bg-yellow-500 rounded-2xl transition-all duration-500"
                            style={{ width: `${winrate}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-gray-700 font-medium">%{winrate} winrate</p>
                </div>
            </div>

            <button
                className="bg-amber-400 text-gray-600 w-[30%] rounded-2xl p-3 text-sm"
                onClick={() => setOpen(!open)}
            >
                {open ? "Close Example" : "Open Example"}
            </button>

            {open && (
                <ul className="flex mt-10 flex-wrap gap-10 justify-center">
                    {item.images.map((img, i) => (
                        <li className="text-gray-600 bg-amber-400 p-4 rounded-2xl" key={i}>
                            <img className="w-150" src={img} alt="" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StrategyDetails;
