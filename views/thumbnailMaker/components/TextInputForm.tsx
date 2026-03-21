import {ChevronDown, Bold, Italic, AlignCenter} from "lucide-react";
import {useState} from "react";

// Google Fonts 스타일 주입 (다양한 한글 폰트 사용을 위함)
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Gowun+Dodum&family=Jua&family=Nanum+Pen+Script&display=swap');
  
  .font-nanum { font-family: 'Nanum Pen Script', cursive; font-size: 1.5rem; }
  .font-gowun { font-family: 'Gowun Dodum', sans-serif; font-size: 1.1rem; }
  .font-jua { font-family: 'Jua', sans-serif; font-size: 1.2rem; }
  .font-dohyeon { font-family: 'Do Hyeon', sans-serif; font-size: 1.2rem; }
  .font-sans { font-family: ui-sans-serif, system-ui, sans-serif; }
`;

// 폰트 설정
const fonts = [
  {id: "font-nanum", name: "나눔펜글씨 (감성)"},
  {id: "font-gowun", name: "고운돋움 (단정)"},
  {id: "font-jua", name: "주아 (귀여움)"},
  {id: "font-dohyeon", name: "도현 (강조)"},
  {id: "font-sans", name: "기본 고딕"},
];
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8l3.5 3.5L13 4.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TextInputForm = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  selectedFont,
  setSelectedFont,
}: {
  title: string;
  setTitle: (val: string) => void;
  subtitle: string;
  setSubtitle: (val: string) => void;
  selectedFont: string;
  setSelectedFont: (val: string) => void;
}) => {
  const isDone = selectedFont.length > 0 && title.length > 0 && subtitle.length > 0;

  return (
    <div className="relative flex gap-4">
      <style>{fontStyles}</style>

      <div
        className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold z-10 ring-8 ring-white shrink-0 mt-0.5 transition-colors duration-300 ${
          isDone ? "bg-emerald-500" : "bg-[#3b82f6]"
        }`}
      >
        {isDone ? <CheckIcon /> : "3"}
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-gray-900 text-base mb-1">문구 입력 및 스타일 설정</h2>
        <p className="text-gray-500 text-sm mb-4">인화할 문구를 입력하고 스타일을 선택해 주세요.</p>

        {/* 폰트 스타일 선택 (추가된 부분) */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
            폰트 스타일 선택
          </label>
          <div className="relative">
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all cursor-pointer"
            >
              {fonts.map((font) => (
                <option key={font.id} value={font.id} className={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </div>
            <select className="hidden"></select> {/* Accessibility placeholder */}
          </div>
        </div>

        {/* Toolbar */}
        {/* <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-1.5 flex items-center gap-1 w-fit mb-6 shadow-sm">
        <button className="flex items-center justify-between gap-6 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 w-32">
          소제목 <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600">
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <button className="p-1.5 bg-[#dbeafe] text-[#2563eb] rounded transition-all">
          <AlignCenter className="w-4 h-4" />
        </button>
      </div> */}

        {/* Inputs */}
        <div className="space-y-6">
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-gray-400 font-medium z-10">
              소제목
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className={`${selectedFont} w-full border border-gray-200 rounded-lg px-4 py-3.5 text-gray-800 text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-transparent relative z-0`}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-gray-400 font-medium z-10">
              대제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${selectedFont} w-full border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 font-bold focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all bg-transparent relative z-0`}
            />
          </div>
        </div>

        {/* Notice */}
        <div className="mt-4 bg-[#f0fdf4] rounded-lg p-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
          <p className="text-xs text-[#166534] font-medium">
            문구는 가운데 정렬, 글자크기는 변경이 안 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextInputForm;
