import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteKey } from "./routeKey";

export type ParamListBase = Record<string, object | undefined>;

type NavigationParams = {
    [key: string]: object | undefined;
};

type RootStackParamList = {
    [key: string]: NavigationParams;
};

export type DefaultRoute = RouteProp<RootStackParamList, any>;

type NavigationProp<RouteName extends keyof ParamListBase, NavigatorID extends string | undefined = undefined> = {
    navigation: NativeStackNavigationProp<ParamListBase, RouteName, NavigatorID>;
    route: RouteName;
};

type testeScreenParam<T> = {
    [key: string]: T;
};

type ScreenNavigationProps = NavigationProp<RouteKey>;

export interface DefaultScreenProps extends ScreenNavigationProps { }
