import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import Button from "../../components/Form/Button";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import { useState } from "react";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import CategorySelect from "../CategorySelect";
import InputForm from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    amount: yup.number()
        .typeError("Informe um valor numérico")
        .positive("O valor não pode ser negativo")
        .required("Preço é obrigatório"),
});

interface FormData {
    name: string;
    amount: number;
}

const Register = () => {
    const { user } = useAuth();
    const dataKey = "@gofinances:transactions_user:" + user.id;
    const [transactionType, setTransactionType] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });

    const navigation = useNavigation();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: "positive" | "negative"): void {
        setTransactionType(type);
    }

    function handleCloseSelectCategory(): void {
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategory(): void {
        setCategoryModalOpen(true);
    }

    async function handleRegister(form: FormData): Promise<void> {
        if (!transactionType) {
            return Alert.alert("Selecione o tipo da transação");
        }

        if (category.key === "category") {
            return Alert.alert("Selecione a categoria");
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date(),
        }

        try {
            const dataStorage = await AsyncStorage.getItem(dataKey);
            const currentData = dataStorage ? JSON.parse(dataStorage) : [];
            const transactions = [
                ...currentData,
                newTransaction
            ];
            await AsyncStorage.setItem(dataKey, JSON.stringify(transactions));

            setTransactionType("");
            setCategory({
                key: "category",
                name: "Categoria",
            });
            reset();
            navigation.navigate("Listagem" as never);
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível cadastrar");
        }
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
                            error={errors.name && errors.name.message}

                        />
                        <InputForm placeholder="Preco" name="amount" control={control} keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionsType>
                            <TransactionTypeButton
                                isActive={transactionType === "positive"}
                                title="Income"
                                type="up"
                                onPress={() => handleTransactionTypeSelect("positive")} />
                            <TransactionTypeButton
                                isActive={transactionType === "negative"}
                                title="Outcome"
                                type="down"
                                onPress={() => handleTransactionTypeSelect("negative")} />
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