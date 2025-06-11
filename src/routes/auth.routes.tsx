import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../Screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="SignIn" component={SignIn} />
        </Navigator>
    )
}

export default AuthRoutes;