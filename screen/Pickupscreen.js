import { Button, Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { FlatList } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Pickupscreen = () => {
  const {width,height} = Dimensions.get('screen');
  const [total, settotal] = useState({days:false,time:false,price:0,PickDate:''});
  const [cartinfo, setcartinfo] = useState([])
  const [addresses, setaddresses] = useState('')
  const navigation = useNavigation();
  useEffect(() => {
    let perform = async()=>{
      let checkcooki = await AsyncStorage.getItem('authToken');
      if(!!checkcooki){
        axios.get('http://localhost:8000/cart/CartInfo',{
          headers:{
            seingtoken: checkcooki
          }
        }).then((result) => {
          setaddresses(result.data.addresses);
          setcartinfo(result.data.cart);
          if (result.data.cart.length > 0) {
    let price = 0;
    result.data.cart.map((ite)=>{
      if (ite.quantity > 0) {
          price = price + (ite.price*ite.quantity)
      }
  })
  settotal({...total,price})
          }
        }).catch((err) => {
          console.log(err);
        });
      }else{
        navigation.navigate("Login")
      }
      
    }
    perform();
  }, [])

  const Bill = async ()=>{
    let checkcooki = await AsyncStorage.getItem('authToken');
    let orderinfo = {PickDate:total.PickDate,SelectTime:total.time,DeliveryDay:total.days}
    console.log(orderinfo);
    if(!!checkcooki){
      axios.post('http://localhost:8000/user/orderinfo',orderinfo,{
        headers:{
          seingtoken: checkcooki
        }
      }).then((result) => {
        console.log(result);
        navigation.navigate("Billing");
      }).catch((err) => {
        console.log(err);
      });
    }else{
      navigation.navigate("Login")
    }
  }
  
  const timer = [{
    id:1,
    Time:'11:00 AM'
  },{
    id:2,
    Time:'12:00 PM'
  },{
    id:3,
    Time:'01:00 PM'
  },{
    id:4,
    Time:'02:00 PM'
  },{
    id:5,
    Time:'03:00 PM'
  },{
    id:6,
    Time:'04:00 PM'
  }]
  const dateshadul = [{
    id:1,
    Time:'2-3 Days'
  },{
    id:2,
    Time:'3-4 Days'
  },{
    id:3,
    Time:'4-5 Days'
  },{
    id:4,
    Time:'5-6 Days'
  },{
    id:5,
    Time:'6-7 Days'
  },{
    id:6,
    Time:'7-8 Days'
  }]
  return (
    <SafeAreaView style={{padding: 10,width:width,backgroundColor:'#F4F6F9'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="location-pin" size={36} color="red" />
        <View>
          <Text style={{fontSize:24, fontWeight: '500',fontFamily: 'bold',}}>Home</Text>
          <Text style={{fontSize:19}}>{addresses}</Text>
        </View>
        <Pressable style={{marginLeft: 'auto',}}>
            <Image style={{width: 50,height:50, borderRadius: 50,backgroundPosition: 'center'}} source={{uri:'https://yt3.ggpht.com/ZgnOZtktg-tvZGXWwkX69kYP0PHldLdvX7w9vQe0Ym7MhIH1aDvmmSKLeZutQYp9tLnGaXUolOk=s88-c-k-c0x00ffffff-no-rj'}}/>
        </Pressable>
      </View>
        <Text>Pick Up Date</Text>
        <View>
        <HorizontalDatepicker
          mode="gregorian"
          // startDate={new Date(`${initalDate.getFullYear()}-${initalDate.getMonth()+1}-${initalDate.getDay()}`)}
          endDate={new Date("2024-12-31")}
          initialSelectedDate={new Date("2023-11-11")}
          onSelectedDateChange={(date) => settotal({...total,PickDate:(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)})}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        </View>
        <View style={{margin:10}}>
          <Text>Select Time</Text>
        </View>
        <View>
        <FlatList  data={timer} horizontal showsHorizontalScrollIndicator={false} renderItem={(item)=>{
          return(
          <View style={{margin:5,marginTop:10,marginHorizontal:12,backgroundColor: '#ececec',borderWidth:1,borderColor: 'black',borderRadius:7,transition: "all 200ms ease"}}>
            <Button onPress={()=>{settotal({...total,time:item.item.Time})}} title={item.item.Time}/>
          </View>
          )}} />
          
          <View style={{margin:10}}>
          <Text>Delivery Days</Text>
          </View>
          <FlatList data={dateshadul} horizontal showsHorizontalScrollIndicator={false} renderItem={(item)=>{
          return(
          <View style={{margin:5,marginTop:10,marginHorizontal:12,backgroundColor: '#ececec',borderWidth:1,borderColor: 'black',borderRadius:7}}>
            <Button onPress={()=>{settotal({...total,days:item.item.Time})}} title={item.item.Time}/>
          </View>
          )}} />
          </View>

          <View>
          <View style={{margin:10}}>
          {(total.time || total.time) && 
        (<Pressable style={{ backgroundColor: "#088F8F", padding: 8, marginBottom: 30, margin: 1, borderRadius: 7, marginTop: 1 }}>
        <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>{total.time} Time | {(total.days) && (<Text>Delivery {total.days}</Text>)} | ${total.price} </Text>
        </View>
        <Pressable style={{ fontSize: 17, fontWeight: "600", color: "#fcf3bd" ,marginLeft:'auto',width: 'auto',borderRadius:7}}>
            {(total.time && total.days && total.PickDate) && (<Button onPress={()=>{Bill()}} color='#B71C1C' title='Proceed to Bill'/>)}
        </Pressable>
        <View>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "white", marginVertical: 10 }}>PickUp {total.PickDate}</Text>
        </View>
    </Pressable>)}
          <Text>Your Oreders</Text>
          </View>
          <FlatList data={cartinfo} vertical showsVerticalScrollIndicator renderItem={(item)=>{
            return(
              <View style={{backgroundColor:'white',marginTop:20,marginBottom:20}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',pedding:2,marginLeft:20,marginRight:20}}>
                <View style={{marginRight:'auto'}}>
                <Image style={{width: 70,height:70,marginRight:'auto'}} source={{uri:item.item.image}}/>
                </View>
                <View>
                <Text style={{fontSize:15}}>{item.item.name}</Text>
                <Text style={{fontSize:15}}>$ {item.item.price}</Text>
                </View>
                <View style={{marginLeft:'auto'}}>
                  <Text>Item Price </Text>
                <Text style={{fontSize:15}}>{`${item.item.quantity} X ${item.item.price} = ${(item.item.quantity)*(item.item.price)}`}</Text>
                </View>
              </View>
              </View>
            )
          }}/>
          </View>
    </SafeAreaView>
  )
}

export default Pickupscreen

const styles = StyleSheet.create({})