import Pay from "@/views/home/pay/Pay";
import PayProvider from "@/views/home/pay/PayProvider";
import Script from "next/script";

export default function Page() {
  return (
    <PayProvider>
      <Pay/>
    </PayProvider>
  );
}
