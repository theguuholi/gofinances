import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import { useState } from "react";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import CategorySelect from "../CategorySelect";
import InputForm from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    amount: yup.number()
        .typeError("Informe um valor numérico")
        .positive("O valor não pode ser negativo")
        .required("Preço é obrigatório"),
});

const Register = () => {
    const [transactionType, setTransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
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

    function handleRegister(form: FormData): void {
        if (!transactionType) {
            return alert("Selecione o tipo da transação");
        }

        if (category.key === "category") {
            return alert("Selecione a categoria");
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
        }

        console.log(data);
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        {/* characteres, sentence */}
                        <InputForm
                            placeholder="Nome"
                            name="name"
                            control={control}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            error={errors.name?.message}

                        />
                        <InputForm placeholder="Preco" name="amount" control={control} keyboardType="numeric" error={errors.amount?.message}
                        />

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

                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}
export default Register;