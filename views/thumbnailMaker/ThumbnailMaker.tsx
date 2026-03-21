"use client";

import React, {useState} from "react";
import {
  Bold,
  Italic,
  AlignCenter,
  ChevronDown,
  Sparkles,
  Star,
  User,
  Image as ImageIcon,
  Camera,
} from "lucide-react";
import PreviewCard from "./components/PreviewCard";
import TextInputForm from "./components/TextInputForm";
import CompositionSelect from "./components/CompositionSelector";
import ImageUpload from "./components/ImageUpload";
import {compositionOptions} from "./mocks/mock";
import Header from "./components/Header";

export default function ThumbnailMaker() {
  const [subtitle, setSubtitle] = useState("작은 실천으로 시작하는 건강한 하루");
  const [title, setTitle] = useState("건강을 지키는 생활 습관");
  const [composition, setComposition] = useState("");
  const [language, setLanguage] = useState("ko");
  const [selectedFont, setSelectedFont] = useState("font-nanum");

  return (
    <div className="min-h-screen bg-[#f1f3f5] p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="bg-white w-full max-w-[1200px] rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {/* 분리된 Header 컴포넌트 */}
        <Header language={language} setLanguage={setLanguage} />

        {/* Main Content 영역 */}
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left Panel: Controls */}
          <div className="w-full lg:w-[55%] p-8 lg:border-r border-gray-100 relative">
            {/* 연결선 (전체 스텝을 잇는 회색 실선) */}
            <div className="absolute left-[43px] top-12 bottom-12 w-[2px] bg-gray-100" />

            {/* 분리된 조작부 컴포넌트들 */}
            <ImageUpload />

            <CompositionSelect
              composition={composition}
              setComposition={setComposition}
              options={compositionOptions}
            />

            <TextInputForm
              title={title}
              setTitle={setTitle}
              subtitle={subtitle}
              setSubtitle={setSubtitle}
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
            />
          </div>

          {/* Right Panel: Preview (분리된 컴포넌트) */}
          <PreviewCard title={title} subtitle={subtitle} selectedFont={selectedFont} />
        </div>
      </div>
    </div>
  );
}
