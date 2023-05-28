import React, { Text, SafeAreaView, Image } from "react-native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import { styles } from "./style";
import clipboard from "../../../assets/clipboard.png"

export function EmptyComponent(){
    return (
        <>
        <Text style={styles.line}>______________________________________________</Text>
         <SafeAreaView style={{ marginLeft: responsiveWidth(10), marginTop: responsiveHeight(4) ,padding: 30 }}>
           <Image style={styles.image} source={clipboard} />
           <Text style={styles.textBold}> Você ainda não tem tarefas cadastradas</Text>
           <Text style={styles.text}> Crie tarefas e organize seus itens a fazer</Text>
         </SafeAreaView>
       </>
    )
}