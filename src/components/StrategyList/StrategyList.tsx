import { StList } from "../../Data/StrategyList"
const StrategyList = ({ onSelect }: any) => {
    return (
        <div className="mt-10">
            <div className="flex justify-center gap-5 flex-wrap">
                {StList.map((st) => {
                    return (
                        <div key={st.id} onClick={() => onSelect(st)} className="w-[30%] cursor-pointer bg-amber-400 p-5 text-center rounded-2xl">
                            <button className="cursor-pointer text-xl text-gray-600">
                                {st.name}</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default StrategyList