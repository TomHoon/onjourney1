import {useState, useRef, useCallback} from "react";

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

const ImageIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="5" y="8" width="30" height="24" rx="3" stroke="#d1d5db" strokeWidth="1.5" />
    <circle cx="14" cy="16" r="3" stroke="#d1d5db" strokeWidth="1.5" />
    <path d="M5 28l8-7 6 5 5-4 11 7" stroke="#d1d5db" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

type UploadedFile = {
  name: string;
  size: number;
  url: string;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ImageUpload = () => {
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(
      (f) => (f.type === "image/jpeg" || f.type === "image/png") && f.size <= 10 * 1024 * 1024,
    );
    const next: UploadedFile[] = valid.map((f) => ({
      name: f.name,
      size: f.size,
      url: URL.createObjectURL(f),
    }));
    setUploaded((prev) => [...prev, ...next]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    setUploaded((prev) => prev.filter((_, i) => i !== index));
  };

  const isDone = uploaded.length > 0;

  return (
    <div className="relative flex gap-4 mb-10">
      {/* Step indicator */}
      <div
        className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold z-10 ring-8 ring-white shrink-0 mt-0.5 transition-colors duration-300 ${
          isDone ? "bg-emerald-500" : "bg-[#3b82f6]"
        }`}
      >
        {isDone ? <CheckIcon /> : "1"}
      </div>

      <div className="flex-1">
        <h2 className="font-bold text-gray-900 text-base mb-1">사진 업로드</h2>
        <p className="text-gray-500 text-sm mb-4">인화할 사진을 업로드해 주세요.</p>

        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer
            ${dragging ? "border-blue-400 bg-blue-50" : isDone ? "border-emerald-200 bg-emerald-50/40" : "border-gray-200 bg-gray-50/50 hover:bg-gray-50"}
          `}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {isDone ? (
            <>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckIcon />
              </div>
              <p className="text-sm font-medium text-emerald-700">
                {uploaded.length}장 업로드 완료
              </p>
              <button
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                사진 변경하기
              </button>
            </>
          ) : (
            <>
              <ImageIcon />
              <button className="bg-white border border-gray-200 shadow-sm px-6 py-2.5 rounded-lg font-medium text-gray-700 text-sm hover:border-gray-300 transition-colors">
                사진 업로드
              </button>
              <p className="text-xs text-gray-400 font-medium">
                JPG, PNG 파일 / 최대 10MB · 드래그해서 올리기
              </p>
            </>
          )}
        </div>

        {/* Uploaded file list */}
        {/* {uploaded.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {uploaded.map((file, i) => (
              <li
                key={i}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm animate-fade-in"
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-10 h-10 object-cover rounded-md shrink-0 border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                </div>
                <span className="text-emerald-500 shrink-0">
                  <CheckIcon />
                </span>
                <button
                  className="text-gray-300 hover:text-red-400 transition-colors shrink-0 ml-1"
                  onClick={() => handleRemove(i)}
                  title="삭제"
                >
                  <XIcon />
                </button>
              </li>
            ))}
          </ul>
        )} */}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease both; }
      `}</style>
    </div>
  );
};

export default ImageUpload;
