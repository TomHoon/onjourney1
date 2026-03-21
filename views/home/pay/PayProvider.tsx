'use client';

import {createContext, ReactNode, useContext, useState} from "react";

type PayContextType = {
	orderStep: number;
	setOrderStep: React.Dispatch<React.SetStateAction<number>>;
};

const PayContext = createContext<PayContextType | null>(null);

export default function PayProvider({children}:{children: ReactNode}) {
	
	const [orderStep, setOrderStep] = useState(1);
	
	return (
		<PayContext.Provider value={{orderStep, setOrderStep}}>
			{children}
		</PayContext.Provider>
	)
}

export const usePay = () => {
	const context = useContext(PayContext);
	if (!context) throw new Error("PayProvider 안에서 써야함");
	return context;
};