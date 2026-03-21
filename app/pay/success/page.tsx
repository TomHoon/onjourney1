import PaymentSuccess from "@/views/payment/PaymentSuccess";

export default function Page() {
	return (
		<PaymentSuccess
			orderId={`ORD-${Math.floor(Math.random() * 10000000)}`}
			amount={5000}
			paymentMethod="토스페이"
		/>
	)
}