import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from "./styles";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import SignInSocialButton from "../../components/SigninSocialButton";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components";

const SignIn = () => {
    const { signInWithApple } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const handleSignInWithApple = async () => {
        console.log("handleSignInWithApple");
        try {
            console.log("signInWithApple");
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            Alert.alert('Não foi possível conectar a conta Apple');
            console.log(error);
        } finally {
            setIsLoading(false);
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

                {isLoading && <ActivityIndicator color={theme.colors.shape} size="large" style={{ marginTop: 18 }} />}
            </Footer>
        </Container>
    )
}

export default SignIn;