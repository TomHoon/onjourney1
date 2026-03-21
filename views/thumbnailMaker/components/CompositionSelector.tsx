import {Star, Check} from "lucide-react";

const CompositionSelect = ({
  composition,
  setComposition,
  options,
}: {
  composition: string;
  setComposition: (id: string) => void;
  options: CompositionOption[];
}) => {
  const isSelected = composition !== "";

  return (
    <div className="relative flex gap-4 mb-10">
      {/* Step indicator */}
      <div
        className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold z-10 ring-8 ring-white shrink-0 mt-0.5 transition-colors duration-300 ${
          isSelected ? "bg-emerald-500" : "bg-[#3b82f6]"
        }`}
      >
        {isSelected ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : "2"}
      </div>

      <div className="flex-1">
        <h2 className="font-bold text-gray-900 text-base mb-1">사진 구도 선택</h2>
        <p className="text-gray-500 text-sm mb-4">원하는 인화 구도를 선택해 주세요.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {options.map((opt) => {
            const selected = composition === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setComposition(opt.id)}
                className={`relative flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selected
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                {/* Green check badge */}
                {selected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}

                <div className="relative w-14 h-14 rounded-lg overflow-hidden mb-3 bg-gray-100 border border-gray-200 shadow-sm">
                  <img src={opt.img} alt={opt.label} className="w-full h-full object-cover" />
                  {opt.id === "expert" && (
                    <div className="absolute top-1 left-1 bg-white rounded-full p-0.5 shadow-sm">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>

                <h3
                  className={`text-sm font-bold mb-1 ${
                    selected ? "text-emerald-700" : "text-gray-800"
                  }`}
                >
                  {opt.label}
                </h3>
                <p className="text-[10px] text-gray-500 text-center leading-tight whitespace-pre-line">
                  {opt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompositionSelect;
