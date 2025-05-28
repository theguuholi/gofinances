import { Amount, Category, CategoryName, Container, Footer, Icon, Title, Date } from "./styles";


const TransactionCard = () => {
    return (
        <Container>
            <Title>Software Development</Title>
            <Amount>R$ 95.000,00</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign" />
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>13/04/2025</Date>
            </Footer>
        </Container>
    )
}
export default TransactionCard;