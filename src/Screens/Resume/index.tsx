import HistoryCard from "../../components/HistoryCard";
import { ChartContainer, Container, Content, Header, Title } from "./styles"
import React, { useEffect, useState } from "react";
import { listTransactions } from "../../storage/TransactionStorage";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-pie";
import theme from "../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

interface CategoryData {
    name: string;
    total: string;
    color: string;
    totalNumber: number;
    percent: string;
}

const Resume = () => {
    const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

    const loadData = async () => {
        const { formattedTransactions } = await listTransactions();
        const transactions = formattedTransactions;
        const expenses = transactions.filter((transaction: { type: string; }) => transaction.type === 'negative')
        const expensesTotal = expenses.reduce((sum: number, expense: { amount: number }) => sum + Number(expense.amount), 0);

        const totalByCategory: CategoryData[] = categories
            .map(category => {
                const categorySum = expenses
                    .filter((expense: { category: string }) => expense.category === category.key)
                    .reduce((sum: number, expense: { amount: number }) => sum + Number(expense.amount), 0);

                if (categorySum === 0) {
                    return null;
                }

                return {
                    name: category.name,
                    color: category.color,
                    total: categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    totalNumber: categorySum,
                    percent: `${((categorySum / expensesTotal) * 100).toFixed(0)}%`
                } as CategoryData;
            })
            .filter((category): category is CategoryData => category !== null);

        setTotalByCategory(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content>
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
                                fontFamily: theme.fonts.medium
                            }
                        }} />
                </ChartContainer>

                {
                    totalByCategory.map((item: CategoryData) => (
                        <HistoryCard
                            key={item.name}
                            title={item.name}
                            amount={item.total}
                            color={categories.find(category => category.name === item.name)?.color || '#000'}
                        />
                    ))
                }
            </Content>
        </Container>
    )
}

export default Resume;