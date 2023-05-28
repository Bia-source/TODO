import { StyleSheet } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { color, size } from "../../shared/global/styles";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: color.base["gray-500"],
        marginTop: 8,
        borderRadius: 12,
        marginLeft: responsiveWidth(5),
        maxWidth: responsiveWidth(90),
        flexDirection: "row",
        alignItems: "center",
    },
    viewTexts: {
        alignItems: "flex-start",
        width: responsiveScreenWidth(70),
        marginLeft: responsiveScreenWidth(2)
    },
    titleTask: {
        color: color.base["gray-100"],
        fontSize: size.big,
        fontWeight: "700"
    },
    descriptionTask: {
        color: color.base["gray-100"],
        fontSize: size.mid,
    },
    iconTrash: {
        marginTop: responsiveScreenHeight(1)
    },
    titleTaskComplete: {
        color: color.base["gray-100"],
        fontSize: size.big,
        fontWeight: "700",
        textDecorationLine: 'line-through'
    },
    descriptionTaskComplete: {
        color: color.base["gray-100"],
        fontSize: size.mid,
        textDecorationLine: 'line-through'
    }

})