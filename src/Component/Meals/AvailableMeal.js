import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
function AvailableMeals() {
    const [meals,setMeals]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchMeal=async(url)=>{
            let response=await fetch(url)
            let data=await response.json()
            let loadData=[]
            for(let key in data)
            {
                loadData.push({
                    key:key,
                    id:key,
                    name:data[key]['name'],
                    description:data[key]['description'],
                    price:data[key]['price']
                })
            }
            setMeals(loadData)
            setLoading(false)

        }   
        fetchMeal('https://react-api-c5e80-default-rtdb.firebaseio.com/meals.json')

    },[])
    if(loading)
    {
        return <section className={classes.loading}>
            <h1>loading....</h1>
        </section>
    }
    const mealList = meals.map(meals => <MealItem 
        key={meals.id}
        id={meals.id}
        name={meals.name} 
        description={meals.description} 
        price={meals.price} />)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>

        </section>
    )
}
export default AvailableMeals