export type TransactionDTO = {
    id: string;
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}