
import { SafeAreaView, TextInput, View ,Text, KeyboardAvoidingView, Pressable} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const Registerscreen = () => {
    const navigation = useNavigation();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [address, setaddress] = useState('')
    const hendleRegister = ()=>{
        let user = {name,email,password,addresses:address}
        axios.post("http://localhost:8000/user/createacc",user).then((result) => {
            console.log(result);
            setname("")
            setemail("")
            setpassword("")
            setaddress("")
            navigation.navigate('Login')
        }).catch((err) => {
            console.log(err);
        });
    }
  return (
    <SafeAreaView>
        <View style={{alignItems: 'center',marginTop: 150,}}>
            <Text style={{fontSize:20,marginBottom: 80,}}>Register to your Account</Text>
            <KeyboardAvoidingView style={{alignItems: 'center',}}>
                <View style={{backgroundColor: "#D0D0D0" ,width : "85%", gap:5, height: 40, margin: 12, borderWidth: 1, padding: 7,flexDirection: 'row',alignItems: 'center',borderRadius: 4,marginBottom:40}}>
                    <FontAwesome5 name="user-alt" size={24} color="gray" />
                    <TextInput value={name} onChange={(e)=>{setname(e.target.value)}} type="text" style={{marginLeft: 10,width: '100%', fontSize: 22,padding: 2, color: name ? 'black' : 'gray'}} placeholder="Enter your name"  />
                </View>

                <View style={{backgroundColor: "#D0D0D0" ,width : "85%", gap:5, height: 40, margin: 12, borderWidth: 1, padding: 7,flexDirection: 'row',alignItems: 'center',borderRadius: 4,marginBottom:40}}>
                    <Entypo name="location-pin" size={36} color="gray" />
                    <TextInput value={address} onChange={(e)=>{setaddress(e.target.value)}} type="text" style={{marginLeft: 10,width: '100%', fontSize: 22,padding: 2, color: address ? 'black' : 'gray'}} placeholder="Enter your address"  />
                </View>

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
                    <Pressable><Text style={{fontSize: 18,color:'blue'}}>Forget Password</Text></Pressable>
                </View>

                <Pressable style={{padding:10,marginRight:'auto',marginLeft:"auto",backgroundColor:"#FEBE10",borderRadius:6,width:200,alignItems:'center',marginTop: 40,}} onPress={hendleRegister}>
                    <Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>Register</Text>
                </Pressable>

                <Pressable onPress={()=>{navigation.navigate('Login')}} style={{marginTop: 10}}>
                    <Text style={{color:'gray',cursor: 'pointer'}} >Already have an account? Sing In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </View>
    </SafeAreaView>
  );
};

export default Registerscreen;