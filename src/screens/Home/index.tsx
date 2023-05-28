import React, { Image, Text, View } from "react-native";
import { styles } from "./style";
import logo from "../../../assets/logo1x.png"
import { Forms } from "../../components/forms";

export function Home(){
    return(
        <>
         <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
         </View>
         <View style={styles.subContainer}>
              <View style={styles.input}>
                 <Forms/> 
              </View>     
         </View>
        </>
    )
}