import { useEffect, useState } from 'react';
import Lottie from 'lottie-react'
import LoadingData from '../../asset/animation_lkpa5ygw.json'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
function AvailableMeals() {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        console.log('component did moutn')
        const fetchMeal = async (url) => {
            let response = await fetch(url)
            if (!response.ok) {
                throw new Error('something went wrong!!!!')
            }
            let data = await response.json()
            let loadData = []

            for (let key in data) {
                loadData.push({
                    key: key,
                    id: key,
                    name: data[key]['name'],
                    description: data[key]['description'],
                    price: data[key]['price']
                })
            }
            setMeals(loadData)
            setLoading(false)

        }

        fetchMeal('https://react-api-c5e80-default-rtdb.firebaseio.com/meals.json').catch((e) => {
            setLoading(false)
            setError(e.message)
        })

    }, [])
    if (loading) {
        return <section className={classes.loading}>
            <Lottie animationData={LoadingData} style={{ width: '400px', height: '400px' }}></Lottie>
        </section>
    }
    if (error!==null) {
        return <section className={classes.error}>
            <h1>{error}</h1>
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