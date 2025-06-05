import { useCallback, useEffect, useState } from "react";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, { TransactionCardData } from "../../components/TransactionCard";
import { Container, Header, HighlightCards, Icon, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserContainer, UserGreeting, UserInfo, UserName } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { set } from "react-hook-form";

export interface DataListProps extends TransactionCardData {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensive: HighlightProps;
    total: HighlightProps;
}

const Dashboard = () => {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const loadTransactions = async () => {
        let entriesTotal = 0;
        let expensiveTotal = 0;
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];
        const formattedTransactions: DataListProps[] = transactions.map((item: DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            if (item.type === 'positive') {
                entriesTotal += Number(item.amount);
            } else {
                expensiveTotal += Number(item.amount);
            }

            const formattedDate = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                ...item,
                amount,
                date: formattedDate
            };
        }
        );

        const  total = entriesTotal - expensiveTotal;
        console.log("Formatted Transactions: ", formattedTransactions);
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });

        console.log("Highlight Data: ", highlightData);
        setTransactions(formattedTransactions);

    }

    useEffect(() => {
        loadTransactions()
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []));

    return (
        <Container>
            <Header>
                <UserContainer>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/12762300?v=4' }} />

                        <User>
                            <UserGreeting>Ola, </UserGreeting>
                            <UserName>Gustavo</UserName>
                        </User>
                    </UserInfo>

                    <LogoutButton onPress={() => { console.log("Logout") }}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserContainer>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title={"Entradas"}
                    amount={highlightData?.entries?.amount}
                    lastTransaction={"Ultima entrada dia 13 de abril"} />
                <HighlightCard
                    type="down"
                    title={"Saidas"}
                    amount={highlightData?.expensive?.amount}
                    lastTransaction={"Ultima saida dia 13 de abril"} />
                <HighlightCard
                    type="total"
                    title={"Total"}
                    amount={highlightData?.total?.amount}
                    lastTransaction={"01 a 16 de abril"} />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={transactions}
                    keyExtractor={(item: { id: any; }) => item.id}
                    renderItem={({ item }: { item: DataListProps }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}

export default Dashboard;