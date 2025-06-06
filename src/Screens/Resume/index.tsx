import HistoryCard from "../../components/HistoryCard";
import { Container, Header, Title } from "./styles"

const Resume = () => {
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>


            <HistoryCard
                title="Compras"
                amount="R$ 1.200,00"
                color="#5636D3"
            />
        </Container>
    )
}

export default Resume;