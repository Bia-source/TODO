import { StyleSheet } from "react-native";
import { color, size } from "../../shared/global/styles";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
   textBold: {
    fontSize: size.big,
    color: color.base["gray-300"], 
    fontWeight: "700"
   },
   text: {
    fontSize: size.big,
    color: color.base["gray-300"], 
    marginLeft: responsiveScreenWidth(1.2)
   },
   line: {
      marginLeft: responsiveScreenWidth(5.1), 
      color: color.base["gray-400"],
      maxWidth: responsiveScreenWidth(92)
   },
   image: {
      marginLeft: responsiveScreenWidth(30), 
      marginBottom: responsiveScreenHeight(1.4)
   }
})