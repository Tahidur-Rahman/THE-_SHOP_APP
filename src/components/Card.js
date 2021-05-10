import React from 'react'
import { View ,StyleSheet} from 'react-native'

function Card({children}) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        shadowColor:'#ddd',
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.6,
        shadowRadius:10,
        elevation:5,
        marginVertical:15,
        marginHorizontal:10,
        borderRadius:7,
        padding:5
    }
})


export default Card
