import { Fragment } from "react"
import AvailableMeals from "./AvailableMeal"
import MealsSummary from "./MealsSummary"

function Meals(){
    return <Fragment>
        <MealsSummary/>
        <AvailableMeals/>
    </Fragment>
}
export default Meals