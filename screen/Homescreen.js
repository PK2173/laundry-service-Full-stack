import { Dimensions, FlatList, Image, ScrollView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Homescreen = () => {
  const {width,height} = Dimensions.get('screen');
  const [Address, setAddress] = useState('');
  const [products, setproducts] = useState([])
  const [search, setsearch] = useState('');
  const [total, settotal] = useState({price:0,item:0,pice:0});
  const navigation = useNavigation();
  useEffect(() => {
    let perform = async()=>{
      let checkcooki = await AsyncStorage.getItem('authToken');
      if(!!checkcooki){
        axios.get('http://localhost:8000/user',{
          headers:{
            seingtoken: checkcooki
          }
        }).then((result) => {
          setAddress(result.data.addresses)
        }).catch((err) => {
          console.log(err);
        });
        axios.get('http://localhost:8000/product',{ 
          headers:{
            seingtoken: checkcooki
          }
        }).then((result) => {
          setproducts(result.data)
        }).catch((err) => {
          console.log(err);
        });
      }else{
        navigation.navigate("Login")
      }
      
    }
    perform();
  }, [])

  const Process = ()=>{
    let cartlist = []
    products.map((item)=>{
      if (item.quantity > 0) {
        let {quantity,price,_id,image,name} = item
        cartlist.push({quantity,price,_id,image,name})
      }
    })
    
    let insertcart = async() =>{
      let checkcooki = await AsyncStorage.getItem('authToken');
      if(!!checkcooki){
      axios.post('http://localhost:8000/cart/cart',cartlist,{
        headers:{
          seingtoken: checkcooki
        }
      }).then((result) => {
        navigation.navigate("Pickup")
      }).catch((err) => {
        console.log(err);
      });
      }else{
        navigation.navigate("Login")
      }
    }
    insertcart();
  }

  const totalcheck= ()=>{
    let item = 0;
    let price = 0;
    let pice = 0;
  products.map((ite)=>{
      if (ite.quantity > 0) {
          price = price + (ite.price*ite.quantity)
          pice = pice + ite.quantity
          item ++
      }
  })
  settotal({price,item,pice})
  }

  const addtocart = (index,opr)=>{
    if (opr == "+") {
      setproducts((products.filter((item,ind)=>{
        let info = []
        if (index == ind) {
           item.quantity = item.quantity +1
        }
        info.push(item)
        return info
      })))
    }else{
      setproducts((products.filter((item,ind)=>{
      let info = []
      if (index == ind) {
         item.quantity = item.quantity - 1
      }
      info.push(item)
      return info
    })))
    }
    totalcheck();
  }

  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

   const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
     
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry"
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
     
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
   
  ];

  return (
    <SafeAreaView style={{padding: 10,width:width,backgroundColor:'#F4F6F9'}} showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="location-pin" size={36} color="red" />
        <View>
          <Text style={{fontSize:24, fontWeight: '500',fontFamily: 'bold',}}>Home</Text>
          <Text style={{fontSize:19}}>{Address}</Text>
        </View>
        <Pressable style={{marginLeft: 'auto',}}>
            <Image style={{width: 50,height:50, borderRadius: 50,backgroundPosition: 'center'}} source={{uri:'https://yt3.ggpht.com/ZgnOZtktg-tvZGXWwkX69kYP0PHldLdvX7w9vQe0Ym7MhIH1aDvmmSKLeZutQYp9tLnGaXUolOk=s88-c-k-c0x00ffffff-no-rj'}}/>
        </Pressable>
      </View>

      <View style={{backgroundColor: "#F4F6F9" ,width : "100%", gap:5, height: 40, borderWidth: 1, padding: 7,flexDirection: 'row',alignItems: 'center',borderRadius: 4,borderRadius:7,marginTop:5}}>
          <TextInput value={search} type="text" onChange={(e)=>{setsearch(e.target.value)}} style={{marginLeft: 10,width: '100%', fontSize: 22,padding: 2, color: search ? 'black' : 'gray'}} placeholder="Search"  />
          <Feather style={{color: search ? 'red' : 'black'}} name="search" size={24} color="black" />
      </View>

      <View>
        <FlatList data={images} horizontal renderItem={(item)=>{
          return(
            <Image style={{width:width,height:200,borderRadius:8,marginTop:5}} source={{uri:item.item}}/>
          )
        }}/>
      </View>
      <View>
        {(total.item == 0) ? (<View style={{marginTop:8,marginBottom:15}}>
          <Text style={{fontSize:16,pedding :2,color:'#088F8F'}}>Services Available</Text>
        </View>):
        (<Pressable style={{ backgroundColor: "#088F8F", padding: 8, marginBottom: 30, margin: 1, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 1 }}>
        <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>{total.item} Items | Pieces {total.pice} | ${total.price} </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "white", marginVertical: 10 }}>Extra charges might apply</Text>
        </View>

        <Pressable onPress={()=>{Process()}}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#fcf3bd" }}>Proceed to pickUP</Text>
        </Pressable>
    </Pressable>)}
        
        <FlatList data={services} horizontal showsHorizontalScrollIndicator={false} renderItem={(item)=>{;
          return(
            <View key={item.item.id} style={{borderRadius: 7,margin:10,backgroundColor: 'white',padding:20}}>
            <Image style={{width:70,height:70}} source={{uri:item.item.image}}/>
            <Text>{item.item.name}</Text>
            </View>
          )
        }}/>
      </View>
      
      <View>
        <FlatList data={products} renderItem={(item)=>{
          return(
            <View style={{backgroundColor:'white',marginTop:20,marginBottom:20}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',pedding:2,marginLeft:20,marginRight:20}}>
              <Image style={{width: 70,height:70,marginRight:'auto'}} source={{uri:item.item.image}}/>
              <View>
                <Text style={{fontSize:15}}>{item.item.name}</Text>
                <Text style={{fontSize:15}}>$ {item.item.price}</Text>
              </View>
              
              <Pressable style={{marginLeft:'auto',marginRight:15}}>
                {(item.item.quantity == 0)
                 ? (<Text onPress={()=>{addtocart(item.index,"+")}} style={{color:"#088F8F",fontWeight:'bold',padding:10,borderWidth:1,borderBlockColor:'gray',borderRadius:7}}>Add</Text>)
                 : (<View style={{flexDirection:"row"}}>
                      <Text onPress={()=>{addtocart(item.index,"-")}} style={{color:"#088F8F",fontWeight:'bold',padding:10,borderWidth:1,borderBlockColor:'gray',borderRadius:7,marginRight:2}}>-</Text>
                        <Text style={{color:"#088F8F",fontWeight:'bold',padding:10,borderWidth:1,borderBlockColor:'gray',borderRadius:7}}>{item.item.quantity}</Text>
                      <Text onPress={()=>{addtocart(item.index,"+")}} style={{color:"#088F8F",fontWeight:'bold',padding:10,borderWidth:1,borderBlockColor:'gray',borderRadius:7,marginLeft:2}}>+</Text>
                    </View>) }
              </Pressable>
            </View>
            </View>
          )
        }}/>
      </View>
    </SafeAreaView>
  )
}

export default Homescreen;