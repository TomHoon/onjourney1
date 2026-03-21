import {useEffect, useState} from "react";
import {loadTossPayments, TossPaymentsWidgets} from "@tosspayments/tosspayments-sdk";

export default function usePayView() {
	const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
	const customerKey = "1T7TkvbjPHbZ12sRifsNe";
	
	const [amount, setAmount] = useState({
		currency: "KRW",
		value: 50_000,
	});
	const [ready, setReady] = useState(false);
	const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
	
	useEffect(() => {
		async function fetchPaymentWidgets() {
			// ------  결제위젯 초기화 ------
			const tossPayments = await loadTossPayments(clientKey);
			// 회원 결제
			const widgets = tossPayments.widgets({
				customerKey,
			});
			// 비회원 결제
			// const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
			
			setWidgets(widgets);
		}
		
		fetchPaymentWidgets();
	}, [clientKey, customerKey]);
	
	async function renderPaymentWidgets() {
		if (widgets == null) {
			return;
		}
		// ------ 주문의 결제 금액 설정 ------
		await widgets.setAmount(amount);
		
		await Promise.all([
			// ------  결제 UI 렌더링 ------
			widgets.renderPaymentMethods({
				selector: "#payment-method",
				variantKey: "DEFAULT",
			}),
			// ------  이용약관 UI 렌더링 ------
			widgets.renderAgreement({
				selector: "#agreement",
				variantKey: "AGREEMENT",
			}),
		]);
		
		setReady(true);
	}

	// useEffect(() => {
	// 	async function renderPaymentWidgets() {
	// 		if (widgets == null) {
	// 			return;
	// 		}
	// 		// ------ 주문의 결제 금액 설정 ------
	// 		await widgets.setAmount(amount);
	//
	// 		await Promise.all([
	// 			// ------  결제 UI 렌더링 ------
	// 			widgets.renderPaymentMethods({
	// 				selector: "#payment-method",
	// 				variantKey: "DEFAULT",
	// 			}),
	// 			// ------  이용약관 UI 렌더링 ------
	// 			widgets.renderAgreement({
	// 				selector: "#agreement",
	// 				variantKey: "AGREEMENT",
	// 			}),
	// 		]);
	//
	// 		setReady(true);
	// 	}
	//
	// 	renderPaymentWidgets();
	// }, [widgets]);
	
	useEffect(() => {
		if (widgets == null) {
			return;
		}
		
		widgets.setAmount(amount);
	}, [widgets, amount]);
	
	return {
		widgets,
		renderPaymentWidgets
	}
}