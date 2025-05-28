import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import { Container, Header, HighlightCards, Icon, Photo, Title, TransactionList, Transactions, User, UserContainer, UserGreeting, UserInfo, UserName } from "./style";

const Dashboard = () => {
    var transactions = [
        {
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: { name: 'Vendas', icon: 'dollar-sign' },
            date: '13/04/2024'
        },
        {
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            category: { name: 'Alimentação', icon: 'coffee' },
            date: '10/04/2024'
        },
        {
            title: 'Aluguel do apartamento',
            amount: 'R$ 1.200,00',
            category: { name: 'Casa', icon: 'shopping-bag' },
            date: '27/03/2024'
        }
    ]

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

                    <Icon name="power" />
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
                    data={transactions}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}

export default Dashboard;