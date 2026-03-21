// import React, {useState, useRef} from "react";
// import {Camera, Image as ImageIcon, Type, Palette, Download} from "lucide-react";
//
// // Google Fonts 스타일 주입 (다양한 한글 폰트 사용을 위함)
// const fontStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Gowun+Dodum&family=Jua&family=Nanum+Pen+Script&display=swap');
//
//   .font-nanum { font-family: 'Nanum Pen Script', cursive; font-size: 1.5rem; }
//   .font-gowun { font-family: 'Gowun Dodum', sans-serif; font-size: 1.1rem; }
//   .font-jua { font-family: 'Jua', sans-serif; font-size: 1.2rem; }
//   .font-dohyeon { font-family: 'Do Hyeon', sans-serif; font-size: 1.2rem; }
//   .font-sans { font-family: ui-sans-serif, system-ui, sans-serif; }
// `;
//
// export default function App() {
//   // 상태 관리
//   const [image, setImage] = useState(null);
//   const [caption, setCaption] = useState("우리의 소중한 순간 ✨");
//   const [selectedTemplate, setSelectedTemplate] = useState("classic");
//   const [selectedFont, setSelectedFont] = useState("font-nanum");
//
//   const fileInputRef = useRef(null);
//
//   // 템플릿 설정 (배경색, 글자색, 사진 필터 등)
//   const templates = {
//     classic: {
//       id: "classic",
//       name: "클래식 화이트",
//       bg: "bg-white",
//       text: "text-gray-800",
//       border: "border border-gray-200",
//       filter: "none",
//     },
//     vintage: {
//       id: "vintage",
//       name: "빈티지 옐로우",
//       bg: "bg-[#FDF6E3]",
//       text: "text-[#5C4B37]",
//       border: "border border-[#EADAB8]",
//       filter: "sepia(40%) contrast(90%) brightness(105%)",
//     },
//     dark: {
//       id: "dark",
//       name: "다크 모드",
//       bg: "bg-gray-800",
//       text: "text-gray-100",
//       border: "border border-gray-700",
//       filter: "grayscale(20%) contrast(110%)",
//     },
//     pink: {
//       id: "pink",
//       name: "러블리 핑크",
//       bg: "bg-pink-50",
//       text: "text-pink-900",
//       border: "border border-pink-200",
//       filter: "saturate(120%) brightness(105%)",
//     },
//   };
//
//   // 폰트 설정
//   const fonts = [
//     {id: "font-nanum", name: "나눔펜글씨 (감성)"},
//     {id: "font-gowun", name: "고운돋움 (단정)"},
//     {id: "font-jua", name: "주아 (귀여움)"},
//     {id: "font-dohyeon", name: "도현 (강조)"},
//     {id: "font-sans", name: "기본 고딕"},
//   ];
//
//   // 이미지 업로드 핸들러
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   const currentTemplate = templates[selectedTemplate];
//
//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
//       <style>{fontStyles}</style>
//
//       <div className="max-w-5xl mx-auto">
//         <header className="mb-8 text-center md:text-left">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
//             <Camera className="w-8 h-8 text-blue-500" />
//             4x6 사진편집
//           </h1>
//           <p className="text-gray-500 mt-2">나만의 감성 사진을 만들어보세요.</p>
//         </header>
//
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* 왼쪽: 컨트롤 패널 (모바일에서는 위로 올라감) */}
//           <div className="w-full md:w-1/2 space-y-6">
//             {/* 1. 사진 업로드 */}
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <ImageIcon className="w-5 h-5" /> 1. 사진 선택
//               </h2>
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//               <button
//                 onClick={() => fileInputRef && fileInputRef?.current.click()}
//                 className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-xl transition-colors border border-blue-200 flex justify-center items-center gap-2"
//               >
//                 <Camera className="w-5 h-5" />
//                 기기에서 사진 불러오기
//               </button>
//             </div>
//
//             {/* 2. 템플릿 선택 */}
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <Palette className="w-5 h-5" /> 2. 템플릿(배경) 선택
//               </h2>
//               <div className="grid grid-cols-2 gap-3">
//                 {Object.values(templates).map((tpl) => (
//                   <button
//                     key={tpl.id}
//                     onClick={() => setSelectedTemplate(tpl.id)}
//                     className={`p-3 rounded-xl border text-sm font-medium transition-all
//                       ${
//                         selectedTemplate === tpl.id
//                           ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50 text-blue-700"
//                           : "border-gray-200 hover:bg-gray-50 text-gray-700"
//                       }`}
//                   >
//                     <div className={`w-full h-8 mb-2 rounded ${tpl.bg} ${tpl.border}`}></div>
//                     {tpl.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//
//             {/* 3. 문구 및 폰트 설정 */}
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <Type className="w-5 h-5" /> 3. 문구 작성
//               </h2>
//
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
//                   <input
//                     type="text"
//                     value={caption}
//                     onChange={(e) => setCaption(e.target.value)}
//                     placeholder="사진 아래에 들어갈 문구를 적어주세요."
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   />
//                 </div>
//
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     폰트 스타일
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {fonts.map((font) => (
//                       <button
//                         key={font.id}
//                         onClick={() => setSelectedFont(font.id)}
//                         className={`px-3 py-1.5 rounded-full text-sm transition-colors border
//                           ${
//                             selectedFont === font.id
//                               ? "bg-gray-800 text-white border-gray-800"
//                               : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
//                           }`}
//                       >
//                         {font.name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//
//           {/* 오른쪽: 미리보기 (모바일에서는 아래로 내려감) */}
//           <div className="w-full md:w-1/2 flex flex-col items-center justify-start">
//             <div className="sticky top-8 w-full max-w-sm mx-auto">
//               {/* 폴라로이드 렌더링 영역 */}
//               <div
//                 className={`w-full p-4 pb-16 shadow-2xl rounded-sm transition-colors duration-300
//                   ${currentTemplate.bg} ${currentTemplate.border}`}
//                 style={{
//                   boxShadow:
//                     "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//                 }}
//               >
//                 {/* 이미지 영역 */}
//                 <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative border border-black/5">
//                   {image ? (
//                     <img
//                       src={image}
//                       alt="Uploaded"
//                       className="w-full h-full object-cover transition-all duration-300"
//                       style={{filter: currentTemplate.filter}}
//                     />
//                   ) : (
//                     <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
//                       <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
//                       <p className="text-sm">사진을 업로드해주세요</p>
//                     </div>
//                   )}
//                 </div>
//
//                 {/* 텍스트(캡션) 영역 */}
//                 <div className="mt-6 w-full flex justify-center items-center">
//                   <p
//                     className={`${selectedFont} ${currentTemplate.text} text-center leading-relaxed break-keep w-full`}
//                     style={{minHeight: "1.5em"}}
//                   >
//                     {caption || " "}
//                   </p>
//                 </div>
//               </div>
//
//               <p className="text-center text-gray-400 text-sm mt-6">
//                 💡 팁: 사진을 업로드하고 다양한 템플릿을 눌러보세요!
//               </p>
//
//               <button className="w-full py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all mt-20">
//                 적용하기
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
