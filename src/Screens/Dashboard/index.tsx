import { useCallback, useEffect, useState } from "react";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, { TransactionCardData } from "../../components/TransactionCard";
import { Container, Header, HighlightCards, Icon, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserContainer, UserGreeting, UserInfo, UserName } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardData {
    id: string;
}

const Dashboard = () => {
    const [data, setData] = useState<DataListProps[]>([]);

    const loadTransactions = async () => {
        const dataKey = "@gofinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];
        const formattedTransactions: DataListProps[] = transactions.map((item: DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

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
        console.log("Formatted Transactions: ", formattedTransactions);
        setData(formattedTransactions);
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
                    amount={"R$ 30.000,00"}
                    lastTransaction={"Ultima entrada dia 13 de abril"} />
                <HighlightCard
                    type="down"
                    title={"Saidas"}
                    amount={"R$ 1.259,00"}
                    lastTransaction={"Ultima saida dia 13 de abril"} />
                <HighlightCard
                    type="total"
                    title={"Total"}
                    amount={"R$ 16.300,00"}
                    lastTransaction={"01 a 16 de abril"} />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}

export default Dashboard;