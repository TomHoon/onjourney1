import {Sparkles} from "lucide-react";
import {usePay} from "@/views/home/pay/PayProvider";

type PreviewCardProps = {
  title: string;
  subtitle: string;
  selectedFont: string;
};

const PreviewCard = ({title, subtitle, selectedFont}: PreviewCardProps) => {
  const { orderStep, setOrderStep } = usePay();
  
  return  (
    <div className="w-full lg:w-[45%] bg-[#fafafa] p-8 flex flex-col items-center relative">
      {/* Top Info Bar */}
      <div className="w-full max-w-[360px] flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm text-xs font-medium text-gray-600">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          실시간 미리보기
        </div>
        <div className="text-xs text-gray-500 font-medium tracking-tight">
          <span className="text-gray-800 font-bold">4 x 6 inch</span>{" "}
          <span className="text-gray-300 mx-1">|</span> 실제 인화 비율
        </div>
      </div>
  
      {/* Preview Area Container */}
      <div className="relative w-full max-w-[340px]">
        {/* Left Annotation */}
        <div className="absolute top-1/2 -left-12 -translate-y-1/2 -translate-x-full text-right hidden xl:block">
          <p className="text-sm font-medium text-gray-700">4x6 inch</p>
          <p className="text-xs text-gray-500 whitespace-nowrap">(100mm x 150mm)</p>
        </div>
  
        {/* The Preview Card */}
        <div className="relative w-full aspect-[2/3] bg-white shadow-xl shadow-gray-200/50 border border-gray-200 flex flex-col shrink-0">
          {/* Photo Area */}
          <div className="flex-1 bg-gray-100 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400&h=500&fit=crop"
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Text Area */}
          <div className="h-[140px] bg-white flex flex-col items-center justify-center p-6 text-center shrink-0 border-t border-gray-50 relative">
            <p
              className={`${selectedFont} text-gray-600 text-[13px] mb-2 font-medium tracking-tight break-keep leading-snug`}
            >
              {subtitle}
            </p>
            <h3
              className={`${selectedFont} text-gray-900 text-[22px] font-bold tracking-tight break-keep leading-tight`}
            >
              {title}
            </h3>
          </div>
  
          {/* Right Side Measurements */}
          <div className="absolute top-0 -right-16 h-full w-12 hidden xl:flex flex-col text-[11px] text-gray-500">
            <div className="absolute top-0 right-4 w-4 border-t border-gray-400" />
            <div className="absolute top-1 right-4 w-4 border-t border-gray-400" />
            <div className="absolute top-[-4px] left-8">1mm</div>
            <div className="absolute bottom-[140px] right-4 w-4 border-t border-gray-400" />
            <div className="absolute bottom-[70px] right-4 w-4 border-t border-gray-400" />
            <div className="absolute bottom-[100px] left-8">10mm</div>
            <div className="absolute bottom-[0px] right-4 w-4 border-t border-gray-400" />
            <div className="absolute bottom-[35px] left-8">20mm</div>
            <div className="absolute top-0 bottom-[140px] right-4 border-r border-gray-400" />
            <div className="absolute bottom-[70px] h-[70px] right-4 border-r border-gray-400" />
            <div className="absolute bottom-0 h-[70px] right-4 border-r border-gray-400" />
          </div>
        </div>
      </div>
  
      {/* Bottom Info & Action */}
      <div className="mt-8 flex flex-col items-center w-full max-w-[340px]">
        <div className="text-center mb-6">
          <p className="text-[15px] text-gray-800 font-medium">4x6 inch</p>
          <p className="text-[13px] text-gray-500">(100mm x 150mm)</p>
        </div>
  
        <button
          className="w-full bg-[#ff7a2d] hover:bg-[#f36b1d] text-white rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 active:scale-[0.98]"
          onClick={() => setOrderStep(orderStep + 1)}
        >
          <Sparkles className="w-5 h-5" />
          사진 생성하기
        </button>
      </div>
  </div>
);
}

export default PreviewCard;
