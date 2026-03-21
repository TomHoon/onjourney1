'use client';

import {HeadphonesIcon, Home, RefreshCcw, XCircle} from "lucide-react";
import {useRouter} from "next/navigation";

interface PaymentFailProps {
	errorCode: string;
	errorMessage: string;
	// onRetry: () => void;
	// onNavigateHome: () => void;
}

const PaymentFail: React.FC<PaymentFailProps> = ({ errorCode, errorMessage }) => {
	
	const router = useRouter();
	
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
				<div className="flex justify-center mb-6">
					<div className="bg-red-100 p-4 rounded-full">
						<XCircle className="w-16 h-16 text-red-500" />
					</div>
				</div>
				
				<h1 className="text-2xl font-bold text-gray-900 mb-2">결제에 실패했습니다</h1>
				<p className="text-gray-500 mb-8">요청하신 결제를 처리하지 못했습니다.</p>
				
				<div className="bg-red-50 rounded-xl p-6 text-left mb-8 border border-red-100">
					<h3 className="text-sm font-bold text-red-800 mb-2 flex items-center">
						오류 안내
					</h3>
					<p className="text-red-600 text-sm mb-4">
						{errorMessage}
					</p>
					<div className="flex items-center text-xs text-red-400 bg-white p-2 rounded inline-block border border-red-100">
						에러 코드: {errorCode}
					</div>
				</div>
				
				<div className="space-y-3">
					<button
						// onClick={onRetry}
						className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
					>
						<RefreshCcw className="w-4 h-4 mr-2" />
						다시 시도하기
					</button>
					<div className="grid grid-cols-2 gap-3">
						<button
							onClick={() => {
								router.push('/');
							}}
							className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 border border-gray-200 flex items-center justify-center text-sm"
						>
							<Home className="w-4 h-4 mr-2" />
							홈으로
						</button>
						<button
							className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 border border-gray-200 flex items-center justify-center text-sm"
							onClick={() => alert('고객센터 페이지로 이동합니다.')}
						>
							<HeadphonesIcon className="w-4 h-4 mr-2" />
							고객센터
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentFail;