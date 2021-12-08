import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";


export const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: theme.colors.discord,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',

    },
    image: {
        width: 60,
        height: 60,

    },


})