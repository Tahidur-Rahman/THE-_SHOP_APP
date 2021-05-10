import React, { useState } from "react";
import { Button, Text, View,StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "./Card";
import CartItem from "./CartItem";

function OrderItem({ amount, date, items }) {
  const [show, setshow] = useState(false);
  console.log(items)
  return (
    <Card>
      <View style={styles.summary}>
        <Text style={styles.amount}>${amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        title={show ? "Hide Details" : "Show Details"}
        onPress={() => setshow(!show)}
      />
      {show && <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            sum={item.sum}
            title={item.title}
            onDelete={()=>{}}
          />
        )}
      />}
    </Card>
  );
}

const styles = StyleSheet.create({
  summary:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-around"
  },
  amount:{
    fontFamily:'open-sans-bold'
  },
  date:{
    fontFamily:'open-sans'
  }
})

export default OrderItem;
