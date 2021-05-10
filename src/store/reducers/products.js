
import PRODUCTS from '../../constants/DUMMY_DATA'

const initialState = {
    availableProducts : PRODUCTS,
    userProducts : PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState,action) =>{
    return state
}

export default productsReducer