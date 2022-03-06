import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface TransactionProps {
    id: string;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt' >

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions : Transaction[];
    createTransaction : (transaction : TransactionInput) => void;
}

export const TransactionsContext = createContext<TransactionsContextData[]>({} as TransactionContextData);

export function TransactionsProvider({children} : TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(data => setTransactions(data.data.transactions));
    }, []);

    function createTransaction(transaction : TransactionInput) {
        api.post('/transactions', transaction)
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}