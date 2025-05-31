import { Text } from "react-native";
import { Container, Fields, Form, Header, Title } from "./styles";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

const Register = () => {
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>


            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="E-mail" />
                </Fields>

                <Button title="Enviar" />
            </Form>

        </Container>
    );
}
export default Register;