import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import { Container, Header, HighlightCards, Icon, Photo, Title, Transactions, User, UserContainer, UserGreeting, UserInfo, UserName } from "./style";

const Dashboard = () => {
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
                <TransactionCard />
            </Transactions>
        </Container>
    )
}

export default Dashboard;