import PaymentFail from "@/views/payment/PaymentFail";

export default function Page() {
	return (
		<PaymentFail
			errorCode="ERR_INSUFFICIENT_FUNDS"
			errorMessage="잔액이 부족하여 결제가 거절되었습니다. 다른 결제 수단을 사용하거나 계좌 잔액을 확인해 주세요."
			// onRetry={() => setCurrentPage('HOME')} // 데모이므로 홈으로 보내서 다시 시도하게 함
			// onNavigateHome={() => setCurrentPage('HOME')}
		/>
	)
}