import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation' 
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'
import Colors from '../constants/Colors'


const MealsNavigator = createStackNavigator({
    Categories : CategoriesScreen,
    CategoryMeals :{
        screen:CategoryMealsScreen,
    },
    MealDetails:MealDetailsScreen,
    
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "#fff",
    }
})

export default createAppContainer(MealsNavigator);

