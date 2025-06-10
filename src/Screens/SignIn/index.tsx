import { Container, Footer, Header, SignInTitle, Title, TitleWrapper } from "./styles";
import React from "react";
import { Text } from "react-native";

const SignIn = () => {
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <Text>Logo</Text>

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
            </Footer>
        </Container>
    )
}

export default SignIn;