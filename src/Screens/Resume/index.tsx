import HistoryCard from '../../components/HistoryCard';
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Month,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Title,
} from './styles';
import React, { useCallback, useState } from 'react';
import { listTransactions } from '../../storage/TransactionStorage';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-pie';
import theme from '../../global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface CategoryData {
  name: string;
  total: string;
  color: string;
  totalNumber: number;
  percent: string;
}

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleMonthSelect = (action: 'next' | 'previous') => {
    setIsLoading(true);
    if (action === 'next') {
      setCurrentDate(prevDate => {
        const date = new Date(prevDate);
        date.setMonth(date.getMonth() + 1);
        return date;
      });
    } else {
      setCurrentDate(prevDate => {
        const date = new Date(prevDate);
        date.setMonth(date.getMonth() - 1);
        return date;
      });
    }
    setIsLoading(true);
  };

  const loadData = async () => {
    const { formattedTransactions } = await listTransactions(user.id);
    const transactions = formattedTransactions;
    const expenses = transactions.filter(
      (transaction: { type: string; formattedDate: Date }) =>
        transaction.type === 'negative' &&
        transaction.formattedDate.getMonth() === currentDate.getMonth() &&
        transaction.formattedDate.getFullYear() === currentDate.getFullYear()
    );
    const expensesTotal = expenses.reduce(
      (sum: number, expense: { amount: number }) =>
        sum + Number(expense.amount),
      0
    );

    const totalByCategory: CategoryData[] = categories
      .map(category => {
        const categorySum = expenses
          .filter(
            (expense: { category: string }) => expense.category === category.key
          )
          .reduce(
            (sum: number, expense: { amount: number }) =>
              sum + Number(expense.amount),
            0
          );

        if (categorySum === 0) {
          return null;
        }

        return {
          name: category.name,
          color: category.color,
          total: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          totalNumber: categorySum,
          percent: `${((categorySum / expensesTotal) * 100).toFixed(0)}%`,
        } as CategoryData;
      })
      .filter((category): category is CategoryData => category !== null);

    setTotalByCategory(totalByCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [currentDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <ActivityIndicator
          color={theme.colors.primary}
          size="large"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: bottomTabBarHeight,
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleMonthSelect('previous')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(currentDate, 'MMMM yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleMonthSelect('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategory}
              x="percent"
              y="total"
              labelRadius={50}
              colorScale={totalByCategory.map(item => item.color)}
              style={{
                labels: {
                  fill: theme.colors.shape,
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fontFamily: theme.fonts.medium,
                },
              }}
            />
          </ChartContainer>

          {totalByCategory.map((item: CategoryData) => (
            <HistoryCard
              key={item.name}
              title={item.name}
              amount={item.total}
              color={
                categories.find(category => category.name === item.name)
                  ?.color || '#000'
              }
            />
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Resume;
