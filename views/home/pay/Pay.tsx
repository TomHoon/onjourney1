"use client";

import React, {useState, useRef, ChangeEvent, useEffect} from "react";
import {
  Camera,
  Image as ImageIcon,
  Book,
  Car,
  Upload,
  Settings2,
  Truck,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  Check,
  CreditCard,
  Smartphone,
  UploadCloud,
} from "lucide-react";

// --- Types & Interfaces ---
interface Product {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  price: number;
}

interface Template {
  id: string;
  title: string;
  slots: number;
}

interface UserInfo {
  name: string;
  phone: string;
  authCode: string;
  isAuthed: boolean;
}

interface OrderData {
  product: Product | null;
  template: Template | null;
  images: {[key: number]: string};
  caption: string;
  userInfo: UserInfo;
}

type ViewMode = "landing" | "order";
export default function PayStep1() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [view, setView] = useState<ViewMode>("landing");
  const [orderStep, setOrderStep] = useState<number>(1);

  // 주문 데이터 상태 초기화
  const [orderData, setOrderData] = useState<OrderData>({
    product: null,
    template: null,
    images: {},
    caption: "",
    userInfo: {name: "", phone: "", authCode: "", isAuthed: false},
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  // --- 데이터 정의 ---
  // bg-indigo-50 대신 배경색이 더 잘 보이는 클래스로 조정 및 배경색 명시
  const products: Product[] = [
    {id: "diffuser", title: "차량용 디퓨저", icon: <Car />, color: "bg-indigo-100", price: 25000},
    {id: "diary", title: "커스텀 다이어리", icon: <Book />, color: "bg-emerald-100", price: 18000},
    {
      id: "print",
      title: "프리미엄 사진인화",
      icon: <ImageIcon />,
      color: "bg-amber-100",
      price: 5000,
    },
  ];

  const templates: Template[] = [
    {id: "1-grid", title: "1분할", slots: 1},
    {id: "2-grid", title: "2분할", slots: 2},
    {id: "4-grid", title: "4분할", slots: 4},
  ];

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && activeSlot !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrderData((prev) => ({
          ...prev,
          images: {...prev.images, [activeSlot]: reader.result as string},
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthRequest = (): void => {
    if (!orderData.userInfo.phone) return alert("휴대폰 번호를 입력해주세요.");
    alert("인증번호가 발송되었습니다. (테스트용: 1234)");
  };

  const handleAuthConfirm = (): void => {
    if (orderData.userInfo.authCode === "1234") {
      setOrderData((prev) => ({
        ...prev,
        userInfo: {...prev.userInfo, isAuthed: true},
      }));
      alert("인증에 성공했습니다.");
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const processPayment = (): void => {
    if (!orderData.userInfo.isAuthed) return alert("본인 인증이 필요합니다.");
    const isSuccess = Math.random() > 0.1;
    setOrderStep(isSuccess ? 6 : 7);
  };

  // 랜딩 페이지 뷰
  if (view === "landing") {
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() =>
              orderStep === 1 ? setView("landing") : setOrderStep((prev) => prev - 1)
            }
            className="flex items-center text-gray-600 hover:text-black font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> 이전 단계
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${orderStep === s ? "w-6 bg-blue-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: 상품 선택 */}
        {orderStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">제작할 상품 선택</h2>
              <p className="text-gray-500 mt-2">원하시는 상품 타입을 선택해주세요.</p>
            </div>
            <div className="grid gap-4">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setOrderData({...orderData, product: p});
                    setOrderStep(2);
                  }}
                  className={`flex items-center p-6 rounded-2xl border-2 transition-all ${orderData.product?.id === p.id ? "border-blue-600 bg-blue-50" : "border-white bg-white hover:border-gray-200 shadow-sm"}`}
                >
                  <div
                    style={{color: "black"}}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mr-6 text-xl ${p.color}`}
                  >
                    {p.icon}
                  </div>
                  <div className="text-left">
                    <h3 style={{color: "black"}} className="font-bold text-lg">
                      {p.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {p.price.toLocaleString()}원
                    </p>
                  </div>
                  <div style={{color: "black"}} className="ml-auto">
                    <ArrowRight className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: 템플릿 선택 */}
        {/* {orderStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 style={{color: "black"}} className="text-3xl font-bold mb-2">
              사진 레이아웃
            </h2>
            <p className="text-gray-500 mb-8">4x6 비율 내에서 사진이 배치될 구성을 선택하세요.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setOrderData({...orderData, template: t});
                    setOrderStep(3);
                  }}
                  className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-blue-300 transition-all shadow-sm group"
                >
                  <div className="aspect-[4/6] bg-gray-100 mb-4 rounded-lg flex gap-1 p-2 border border-gray-200 group-hover:bg-blue-50">
                    {Array.from({length: t.slots}).map((_, i) => (
                      <div key={i} className="flex-1 bg-gray-300 rounded-sm"></div>
                    ))}
                  </div>
                  <p style={{color: "black"}} className="font-bold text-center">
                    {t.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )} */}

        {/* Step 3: 이미지 업로드 */}
        {/* {orderStep === 3 && orderData.template && (
          <div className="animate-in fade-in slide-in-from-bottom-4 text-center">
            <h2 style={{color: "black"}} className="text-3xl font-bold mb-2">
              이미지 채우기
            </h2>
            <p className="text-gray-500 mb-8">각 칸을 클릭하여 추억이 담긴 사진을 올려주세요.</p>

            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={handleImageUpload}
              accept="image/*"
            />

            <div className="max-w-xs mx-auto aspect-[4/6] bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 flex gap-2">
              {Array.from({length: orderData.template.slots}).map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setActiveSlot(i);
                    fileInputRef.current?.click();
                  }}
                  className="flex-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all relative group"
                >
                  {orderData.images[i] ? (
                    <img
                      src={orderData.images[i]}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                  ) : (
                    <div className="text-gray-400">
                      <UploadCloud className="w-6 h-6 mx-auto mb-1 opacity-50" />
                      <span className="text-[10px] font-bold">UPLOAD</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              disabled={Object.keys(orderData.images).length < orderData.template.slots}
              onClick={() => setOrderStep(4)}
              className="w-full mt-10 bg-blue-600 text-white py-4 rounded-2xl font-bold disabled:bg-gray-200 disabled:text-gray-400 transition-colors shadow-lg"
            >
              사진 배치 완료
            </button>
          </div>
        )} */}

        {/* Step 4: 텍스트 입력 */}
        {/* {orderStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 style={{color: "black"}} className="text-3xl font-bold mb-2">
              문구 추가
            </h2>
            <p className="text-gray-500 mb-8">상품 하단에 인쇄될 짧은 메시지를 적어주세요.</p>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <input
                type="text"
                placeholder="문구를 입력하세요 (최대 20자)"
                value={orderData.caption}
                style={{color: "black"}}
                onChange={(e) => setOrderData({...orderData, caption: e.target.value})}
                className="w-full bg-gray-50 border-0 rounded-xl p-4 text-xl focus:ring-2 focus:ring-blue-500 transition-all"
                maxLength={20}
              />
              <div className="flex justify-between mt-4 px-1">
                <span className="text-xs text-gray-400">공백 포함 20자 이내</span>
                <span
                  className={`text-xs font-bold ${orderData.caption.length === 20 ? "text-red-500" : "text-blue-500"}`}
                >
                  {orderData.caption.length}/20
                </span>
              </div>
            </div>

            <button
              onClick={() => setOrderStep(5)}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg"
            >
              최종 확인 및 결제
            </button>
          </div>
        )} */}

        {/* Step 5: 최종 확인 및 본인인증 */}
        {orderStep === 5 && orderData.product && orderData.template && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
            <h2 style={{color: "black"}} className="text-3xl font-bold">
              최종 확인
            </h2>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex gap-6">
              <div className="w-24 aspect-[4/6] bg-gray-100 rounded-lg flex gap-1 p-1 border">
                {Array.from({length: orderData.template.slots}).map((_, i) => (
                  <div key={i} className="flex-1 bg-gray-200 rounded-sm overflow-hidden">
                    {orderData.images[i] && (
                      <img
                        src={orderData.images[i]}
                        className="w-full h-full object-cover"
                        alt="summary"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-tighter mb-1">
                  Your Selection
                </p>
                <h3 style={{color: "black"}} className="text-2xl font-black">
                  {orderData.product.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{orderData.template.title} 레이아웃</p>
                <p style={{color: "black"}} className="text-xl font-bold">
                  {orderData.product.price.toLocaleString()}원
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-blue-600" /> 본인 인증 시스템
              </h3>
              <input
                type="text"
                placeholder="받으실 분 성함"
                style={{color: "black"}}
                className="w-full bg-gray-50 border-0 rounded-xl p-4"
                onChange={(e) =>
                  setOrderData({
                    ...orderData,
                    userInfo: {...orderData.userInfo, name: e.target.value},
                  })
                }
              />
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="휴대폰 번호 (숫자만)"
                  style={{color: "black"}}
                  className="flex-1 bg-gray-50 border-0 rounded-xl p-4"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      userInfo: {...orderData.userInfo, phone: e.target.value},
                    })
                  }
                />
                <button
                  onClick={handleAuthRequest}
                  className="bg-gray-900 text-white px-6 rounded-xl font-bold text-sm"
                >
                  인증번호
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="인증번호 4자리 (1234)"
                  style={{color: "black"}}
                  className="flex-1 bg-gray-50 border-0 rounded-xl p-4"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      userInfo: {...orderData.userInfo, authCode: e.target.value},
                    })
                  }
                />
                <button
                  onClick={handleAuthConfirm}
                  className="bg-blue-600 text-white px-6 rounded-xl font-bold text-sm"
                >
                  확인
                </button>
              </div>
              {orderData.userInfo.isAuthed && (
                <div
                  style={{color: "black"}}
                  className="text-center p-3 bg-green-50 text-green-700 rounded-xl text-sm font-bold border border-green-100"
                >
                  인증되었습니다. 결제를 진행해주세요.
                </div>
              )}
            </div>

            <button
              onClick={processPayment}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center gap-3"
            >
              <CreditCard className="w-6 h-6" /> 토스페이 결제하기
            </button>
          </div>
        )}

        {/* Step 6: 결제 성공 */}
        {orderStep === 6 && (
          <div className="text-center py-12 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">주문이 완료되었습니다!</h2>
            <p className="text-gray-500 mb-10 text-lg">입금 확인 후 바로 제작이 시작됩니다.</p>
            <button
              onClick={() => setView("landing")}
              className="bg-gray-900 text-white px-12 py-4 rounded-full font-bold"
            >
              홈으로 가기
            </button>
          </div>
        )}

        {/* Step 7: 결제 실패 */}
        {orderStep === 7 && (
          <div className="text-center py-12 animate-in fade-in">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <X className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">결제 실패</h2>
            <button
              onClick={() => setOrderStep(5)}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mb-4"
            >
              다시 시도
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
