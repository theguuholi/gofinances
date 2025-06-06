import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryCard from "../../components/HistoryCard";
import { Container, Header, Title } from "./styles"
import { use, useEffect } from "react";

const Resume = () => {

    const loadData = async () => {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey); 
        const transactions = response ? JSON.parse(response) : [];
        console.log(transactions);
    }

    useEffect(() => {
        loadData();
    }, []);

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