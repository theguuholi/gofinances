import { Container, Header, Photo, User, UserContainer, UserGreeting, UserInfo, UserName } from "./style";

const Dashboard = () => {
    return (
        <Container>
            <Header>
                <UserContainer>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/12762300?v=4' }} />

                        <User>
                            <UserGreeting>Ola, </UserGreeting>
                            <UserName>Gustavo</UserName>
                        </User>
                    </UserInfo>
                </UserContainer>
            </Header>
        </Container>
    )
}

export default Dashboard;