import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionDTO } from '../dtos/TransactionDTO';
import { TRANSACTIONS_STORAGE } from './storageConfig';

const formatTransactions = (transactions: TransactionDTO[]) => {
  let entriesTotal = 0;
  let expensiveTotal = 0;
  const formattedTransactions = transactions.map((item: TransactionDTO) => {
    const amount = Number(item.amount);
    // .toLocaleString('pt-BR', {
    //     style: 'currency',
    //     currency: 'BRL'
    // });

    if (item.type === 'positive') {
      entriesTotal += Number(item.amount);
    } else {
      expensiveTotal += Number(item.amount);
    }

    const formattedDate = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(new Date(item.date));

    return {
      ...item,
      amount,
      date: formattedDate,
      formattedDate: new Date(item.date),
    };
  });
  return { formattedTransactions, entriesTotal, expensiveTotal };
};

export const listTransactions = async (userID: string): Promise<any> => {
  const response = await AsyncStorage.getItem(TRANSACTIONS_STORAGE + userID);
  const transactionResponse = response ? JSON.parse(response) : [];
  return formatTransactions(transactionResponse);
};
