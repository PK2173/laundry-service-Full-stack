import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Billingscreen = () => {
  const { width, height } = Dimensions.get('screen')
  const [billinfo, setbillinfo] = useState('')
  const [userinfo, setuserinfo] = useState('')
  const [total, settotal] = useState({price:0,typeItem:0,item:0})
  useEffect(() => {
    let perform = async()=>{
      let checkcooki = await AsyncStorage.getItem('authToken');
      if(!!checkcooki){
        axios.get('http://localhost:8000/cart/CartInfo',{
          headers:{
            seingtoken: checkcooki
          }
        }).then((result) => {
          setbillinfo(result.data.orderinfo[0]);
          setuserinfo({username:result.data.name,address:result.data.addresses});
          if (result.data.cart.length > 0) {
    let price = 0;
    let typeItem = 0;
    let item = 0;
    result.data.cart.map((ite)=>{
      if (ite.quantity > 0) {
          price = price + (ite.price*ite.quantity)
          item = item + ite.quantity
          typeItem++
      }
  })
  settotal({...total,price,typeItem,item})
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
  return (
    <SafeAreaView style={{padding:10,margin:1}}>
      <Text style={{fontWeight: 'bold',fontSize:16,marginBottom:20}}>Billing Details</Text>
      <View style={{backgroundColor: 'white',pedding:10,margin:1,borderRadius:7,paddingVertical:10}}>
      <View style={{pedding:2,margin:2}}>
      <Text style={{fontSize: 16,}}>User Information</Text>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Clint Name</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>{userinfo.username}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Address</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>{userinfo.address}</Text>
          </View>
        </View>

        <View
  style={{
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    width: width - 40,
    marginTop:10,
    marginBottom:10
  }}
></View>

        <View style={{pedding:2,margin:2}}>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Item Total</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>$ {total.price}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Delivery Fee</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>Free</Text>
          </View>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Total no of item</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>{total.item}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Total type of item</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>{total.typeItem}</Text>
          </View>
        </View>

        <View
  style={{
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    width: width - 40,
    marginTop:10,
    marginBottom:10
  }}
></View>
<View style={{pedding:2,margin:2}}>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Selected Date</Text>
          </View>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>No Of Days</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>{billinfo.DeliveryDay}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Selected Pick Up Date</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>{billinfo.PickDate}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,}}>Selected Pick Up Time</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>{billinfo.SelectTime}</Text>
          </View>
        </View>

        <View
  style={{
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    width: width - 40,
    marginTop:10,
    marginBottom:10
  }}
></View>
        <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginRight:10}}>
            <Text style={{fontSize: 16,fontWeight: 'bold'}}>To Pay</Text>
            <Text style={{fontSize: 16,color:'#0020ff'}}>$ {total.price}</Text>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default Billingscreen

const styles = StyleSheet.create({})