import {  FlatList } from "react-native";
import {  Category, Container, Footer, Header, Icon, Name, Separator, Title } from "./styles";
import { categories } from "../../utils/categories";
import Button from "../../components/Form/Button";


interface Category {
    key: string;
    name: string;
}

interface Props {
    title: string;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

const CategorySelect = () => {
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList data={categories}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon} />
                        <Name> {item.name}</Name>
                    </Category>
                )}
                contentContainerStyle={{ flex: 1, width: '100%' }}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecionar" />
            </Footer>

        </Container>
    )
}
export default CategorySelect;