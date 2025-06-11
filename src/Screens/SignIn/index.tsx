import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from "./styles";
import React from "react";
import { Alert, Text } from "react-native";
import SignInSocialButton from "../../components/SigninSocialButton";
import { useAuth } from "../../hooks/auth";

const SignIn = () => {
    const { user, signInWithApple } = useAuth();

    const handleSignInWithApple = async () => {
        console.log("handleSignInWithApple");
        try {
            console.log("signInWithApple");
            await signInWithApple();
        } catch (error) {
            Alert.alert('Não foi possível conectar a conta Apple');
            console.log(error);
        }
    }

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
                        onPress={() => { console.log("Entrar com Google") }}
                    />
                    <SignInSocialButton
                        title="Entrar com Apple" 
                        onPress={() => handleSignInWithApple()}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}

export default SignIn;