import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import { useState } from "react";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import { Modal } from "react-native";
import CategorySelect from "../CategorySelect";

const Register = () => {
    const [transactionType, setTransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    function handleTransactionTypeSelect(type: "up" | "down"): void {
        setTransactionType(type);
    }

    function handleCloseSelectCategory(): void {
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategory(): void {
        setCategoryModalOpen(true);
    }


    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="E-mail" />

                    <TransactionsType>
                        <TransactionTypeButton
                            isActive={transactionType === "up"}
                            title="Income"
                            type="up"
                            onPress={() => handleTransactionTypeSelect("up")} />
                        <TransactionTypeButton
                            isActive={transactionType === "down"}
                            title="Outcome"
                            type="down"
                            onPress={() => handleTransactionTypeSelect("down")} />
                    </TransactionsType>

                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategory} />
                </Fields>

                <Button title="Enviar" />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategory}
                />
            </Modal>

        </Container>
    );
}
export default Register;