import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import { useState } from "react";
import CategorySelect from "../../components/Form/CategorySelect";

const Register = () => {
    const [transactionType, setTransactionType] = useState("");

    function handleTransactionTypeSelect(type: "up" | "down"): void {
        setTransactionType(type);
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

                    <CategorySelect title="Categoria" />
                </Fields>

                <Button title="Enviar" />
            </Form>

        </Container>
    );
}
export default Register;