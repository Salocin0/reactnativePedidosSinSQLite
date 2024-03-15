import { StyleSheet, Text, View,TextInput } from 'react-native'
import fonts from '../Styles/Fonts'
import { Colors } from '../Styles/Colors'


const InputForm = ({label,value, onChangeText,isSecure,error}) => {


  return (
    <View style={styles.inputContainer}>
        <Text style={styles.titleInput}>{label}</Text>
        <TextInput  
            value={value}  
            onChangeText={onChangeText} 
            style={styles.input}
            secureTextEntry={isSecure}
        />
        {error ? <View><Text style={styles.error}>{error}</Text></View> : null}
    </View>
  )
}


export default InputForm


const styles = StyleSheet.create({
    inputContainer:{
        width:"100%"
    },
    input:{
        width:"90%",
        borderWidth:0,
        backgroundColor:Colors.Blanco,
        padding:2,
        borderRadius:10,
        fontFamily:fonts.Spartan,
        fontSize:14,
        marginHorizontal:"5%",
      },
      titleInput:{
        width:"90%",
        marginHorizontal:"5%",
        fontSize:14,
        fontFamily:fonts.Spartan
      },
      error:{
        fontSize:14,
        color:"red",
        fontFamily:fonts.Spartan,
        fontStyle:"italic",
        marginLeft:20
      }
})