import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import { useAuth } from "../hooks/auth";
import AppRoutes from "./app.routes";

const Routes = () => {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}

export default Routes;