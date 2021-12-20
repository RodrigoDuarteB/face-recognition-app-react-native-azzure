import { ViewStyle } from "react-native";

export interface Props {
    styles?: ViewStyle
}

export const resetNavigation = (navigation: any, routeToGo: string) => {
    navigation.reset({
        index: 0,
        routes: [{name: routeToGo}],
    })
}