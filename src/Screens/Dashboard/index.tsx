import { useCallback, useEffect, useState } from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, {
  TransactionCardData,
} from '../../components/TransactionCard';
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LoadContainer,
  LogoutButton,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserContainer,
  UserGreeting,
  UserInfo,
  UserName,
} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { set } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import { listTransactions } from '../../storage/TransactionStorage';
import { TransactionDTO } from '../../dtos/TransactionDTO';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const { signOut, user } = useAuth();

  const createHighlighData = (
    entriesTotal: number,
    expensiveTotal: number,
    lastEntryTransaction: string,
    lastExpenseTransaction: string,
    lastTotalTransaction: string
  ) => {
    const total = entriesTotal - expensiveTotal;

    return {
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastEntryTransaction,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastExpenseTransaction,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTotalTransaction,
      },
    };
  };

  const getLastTransactionsDate = (transactions: any[], type: string) => {
    const filtered = transactions.filter(
      (transaction: TransactionDTO) => transaction.type === type
    );

    if (filtered.length === 0) return 'Nenhuma transação';

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        filtered.map((transaction: TransactionDTO) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    const day = lastTransaction.getDate();
    const month = lastTransaction.toLocaleString('pt-BR', { month: 'long' });
    return `Última ${type === 'positive' ? 'entrada' : 'saída'} ${day} de ${month}`;
  };

  const loadTransactions = async () => {
    const { formattedTransactions, entriesTotal, expensiveTotal } =
      await listTransactions(user.id);
    const lastEntryTransaction = getLastTransactionsDate(
      formattedTransactions,
      'positive'
    );
    const lastExpenseTransaction = getLastTransactionsDate(
      formattedTransactions,
      'negative'
    );

    const lastTransaction = new Date(
      Math.max(
        ...formattedTransactions.map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    const lastTotalTransaction = `01 a ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    const highLightDataCreated = createHighlighData(
      entriesTotal,
      expensiveTotal,
      lastEntryTransaction,
      lastExpenseTransaction,
      lastTotalTransaction
    );
    setHighlightData(highLightDataCreated);

    setTransactions(formattedTransactions);
    setIsLoading(false);
  };

  // useEffect(() => {
  //     console.log("useeffect")
  //     loadTransactions()
  // }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserContainer>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />

                <User>
                  <UserGreeting>Ola, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton
                onPress={() => {
                  signOut();
                }}
              >
                <Icon name="power" />
              </LogoutButton>
            </UserContainer>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title={'Entradas'}
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData!.entries!.lastTransaction}
            />
            <HighlightCard
              type="down"
              title={'Saidas'}
              amount={highlightData?.expensive?.amount}
              lastTransaction={highlightData!.expensive!.lastTransaction}
            />
            <HighlightCard
              type="total"
              title={'Total'}
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData!.total!.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={(item: { id: any }) => item.id}
              renderItem={({ item }: { item: DataListProps }) => (
                <TransactionCard data={item} />
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
