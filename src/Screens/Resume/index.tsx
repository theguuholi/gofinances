import HistoryCard from "../../components/HistoryCard";
import { Container, Content, Header, Title } from "./styles"
import { useEffect, useState } from "react";
import { listTransactions } from "../../storage/TransactionStorage";
import { categories } from "../../utils/categories";

interface CategoryData {
    name: string;
    total: string;
    color: string;
}

const Resume = () => {
    const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

    const loadData = async () => {
        const { formattedTransactions } = await listTransactions();
        const transactions = formattedTransactions;
        const expenses = transactions.filter((transaction: { type: string; }) => transaction.type === 'negative')

        const totalByCategory: CategoryData[] = categories
            .map(category => {
                const categorySum = expenses
                    .filter((expense: { category: string }) => expense.category === category.key)
                    .reduce((sum: number, expense: { amount: number }) => sum + Number(expense.amount), 0);

                return {
                    name: category.name,
                    color: category.color,
                    total: categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                };


            })
            .filter(Boolean) as CategoryData[];


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