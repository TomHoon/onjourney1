const Header = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (lang: string) => void;
}) => (
  <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-6 border-b border-gray-100 gap-4 shrink-0">
    <div>
      <h1 className="text-xl font-bold text-gray-900">블로그 썸네일 만들기</h1>
      <p className="text-sm text-gray-500 mt-1">4x6 커스텀 사진 인화 쿠폰</p>
    </div>
    {/* <div className="flex border border-gray-200 rounded-md overflow-hidden bg-white text-sm">
      <button
        onClick={() => setLanguage("ko")}
        className={`px-4 py-1.5 transition-colors ${language === "ko" ? "bg-[#3b82f6] text-white" : "text-gray-600 hover:bg-gray-50"}`}
      >
        한글
      </button>
      <div className="w-px bg-gray-200" />
      <button
        onClick={() => setLanguage("en")}
        className={`px-4 py-1.5 transition-colors ${language === "en" ? "bg-[#3b82f6] text-white" : "text-gray-600 hover:bg-gray-50"}`}
      >
        English
      </button>
      <div className="w-px bg-gray-200" />
      <button
        onClick={() => setLanguage("zh")}
        className={`px-4 py-1.5 transition-colors ${language === "zh" ? "bg-[#3b82f6] text-white" : "text-gray-600 hover:bg-gray-50"}`}
      >
        中文
      </button>
    </div> */}
  </header>
);

export default Header;
