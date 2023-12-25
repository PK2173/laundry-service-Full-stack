import { SafeAreaView, TextInput, View ,Text, KeyboardAvoidingView, Pressable} from "react-native";
import React, {useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loginscreen = () => {
    const navigation = useNavigation();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const hendleLogin = ()=>{
        let user = ({email,password})
        console.log(user);
        axios.post('http://localhost:8000/user/login',user).then((result) => {
            console.log(result.data.token);
            AsyncStorage.setItem("authToken",result.data.token)
            setemail("")
            setpassword("")
            navigation.navigate('Home')
        }).catch((err) => {
            navigation.navigate('Register');
            console.log(err);
        });
    }
  return (
    <SafeAreaView>
        <View style={{alignItems: 'center',marginTop: 150,}}>
            <Text style={{fontSize:20,marginBottom: 80,}}>Login your Account</Text>
            <KeyboardAvoidingView style={{alignItems: 'center',}}>

                <View style={{backgroundColor: "#D0D0D0" ,width : "85%", gap:5, height: 40, margin: 12, borderWidth: 1, padding: 7,flexDirection: 'row',alignItems: 'center',borderRadius: 4,marginBottom:40}}>
                <MaterialCommunityIcons name="email-outline" size={24} color="gray" />
                    <TextInput value={email} onChange={(e)=>{setemail(e.target.value)}} type="text" style={{color: email ? 'black' : 'gray',marginLeft: 10,width: '100%', fontSize: 22,padding: 2}} placeholder="Enter your email"  />
                </View>

                <View style={{backgroundColor: "#D0D0D0" ,width : "85%", gap:5, height: 40, margin: 12, borderWidth: 1, padding: 7,flexDirection: 'row',alignItems: 'center',borderRadius: 4}}>
                <FontAwesome name="lock" size={24} color="gray" />
                    <TextInput value={password} onChange={(e)=>{setpassword(e.target.value)}} password={true} secureTextEntry={true} style={{color: password ? 'black' : 'gray',marginLeft: 10,width: '100%', fontSize: 22,padding: 2}} placeholder="Enter your password"  />
                </View>
                
                <View style={{flexDirection:'row',justifyContent: 'space-between',width:'90%'}}>
                    <Text style={{fontSize: 18}}>Keep me logged in</Text>
                    <Pressable ><Text style={{fontSize: 18,color:'blue'}}>Forget Password</Text></Pressable>
                </View>

                <Pressable style={{padding:10,marginRight:'auto',marginLeft:"auto",backgroundColor:"#FEBE10",borderRadius:6,width:200,alignItems:'center',marginTop: 40,}} onPress={hendleLogin}>
                    <Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>Login</Text>
                </Pressable>

                <Pressable onPress={()=>{navigation.navigate("Register")}} style={{marginTop: 10}}>
                    <Text style={{color:'gray',cursor: 'pointer'}} >Create an account? Sing Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </View>
    </SafeAreaView>
  );
}

export default Loginscreen