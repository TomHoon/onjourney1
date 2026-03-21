'use client';

import {CheckCircle, ChevronRight, Home} from "lucide-react";
import {useRouter} from "next/navigation";

interface PaymentSuccessProps {
	orderId: string;
	amount: number;
	paymentMethod: string;
	// onNavigateHome: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ orderId, amount, paymentMethod }) => {
	
	const router = useRouter();
	
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
				<div className="flex justify-center mb-6">
					<div className="bg-green-100 p-4 rounded-full">
						<CheckCircle className="w-16 h-16 text-green-500" />
					</div>
				</div>
				
				<h1 className="text-2xl font-bold text-gray-900 mb-2">결제가 완료되었습니다</h1>
				<p className="text-gray-500 mb-8">주문이 성공적으로 접수되었습니다.</p>
				
				<div className="bg-gray-50 rounded-xl p-6 text-left mb-8 space-y-4 border border-gray-100">
					<div className="flex justify-between items-center">
						<span className="text-gray-500 text-sm">주문 번호</span>
						<span className="font-medium text-gray-900">{orderId}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-gray-500 text-sm">결제 수단</span>
						<span className="font-medium text-gray-900">{paymentMethod}</span>
					</div>
					<div className="border-t border-gray-200 pt-4 flex justify-between items-center">
						<span className="font-bold text-gray-700">총 결제 금액</span>
						<span className="font-bold text-xl text-blue-600">
              {amount.toLocaleString()}원
            </span>
					</div>
				</div>
				
				<div className="space-y-3">
					<button
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
						onClick={() => alert('주문 상세 페이지로 이동합니다.')}
					>
						주문 내역 보기
						<ChevronRight className="w-4 h-4 ml-1" />
					</button>
					<button
						onClick={() => {
							router.push('/')
						}}
						className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 border border-gray-200 flex items-center justify-center"
					>
						<Home className="w-4 h-4 mr-2" />
						홈으로 돌아가기
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;