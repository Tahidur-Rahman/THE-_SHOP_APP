import { ORDER_NOW } from "../actions/orders"
import Order from './../../models/Orders'

const initialState = {
    orders : []
}

const orderReducer = (state = initialState,action)=>{
    switch(action.type){
        case ORDER_NOW:
        const newOrder = new Order(new Date().toString(),action.orderData.items,action.orderData.amount,new Date());
        return {...state,orders:state.orders.concat(newOrder)}

        default:
        return state;
    }
} 

export default orderReducer