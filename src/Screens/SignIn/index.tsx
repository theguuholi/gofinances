import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from "./styles";
import React, { useContext } from "react";
import { Text } from "react-native";
import SignInSocialButton from "../../components/SigninSocialButton";
import { AuthContext } from "../../AuthContext";

const SignIn = () => {
    const data = useContext(AuthContext);
    console.log("abobora", data);
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
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                    />
                    <SignInSocialButton
                        title="Entrar com Apple"
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}

export default SignIn;