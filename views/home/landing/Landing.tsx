import {Camera} from "lucide-react";

export default function Landing() {
  // --- 핸들러 함수 ---
  const startOrder = (): void => {
    setView("order");
    setOrderStep(1);
    window.scrollTo(0, 0);
  };
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

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Camera className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">Mемо리핏</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#products"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                상품 소개
              </a>
              <button
                onClick={startOrder}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md"
              >
                주문하기
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 text-center max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          스마트폰 속 사진이
          <br />
          <span className="text-blue-600">특별한 굿즈</span>가 됩니다
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          차량용 디퓨저부터 다이어리까지, 당신의 소중한 순간을 일상의 아이템으로 소장하세요.
        </p>
        <button
          onClick={startOrder}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1"
        >
          지금 제작 시작하기
        </button>
      </section>

      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* 배경색이 확실히 보이도록 opacity와 보색 대비를 고려한 클래스 적용 */}
              <div
                style={{color: "black"}}
                className={`${p.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl text-gray-700 shadow-inner`}
              >
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
              <p className="text-gray-600 mb-6">
                고해상도 인쇄와 최고급 부자재로 제작되는 {p.title}를 만나보세요.
              </p>
              <button
                onClick={startOrder}
                className="w-full py-3 rounded-xl border border-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all"
              >
                이 상품 선택하기
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
