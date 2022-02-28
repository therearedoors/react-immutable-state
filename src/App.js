import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [checked, toggleCheck] = useState(false)


  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    
  }

  const deleteWorkout = (targetWorkout) => {
    setWorkouts(workouts.filter(workout => workout !== targetWorkout))
  }

  const completeWorkout = (targetWorkout) => {
    const update = workouts.map(workout => workout === targetWorkout ? {...workout, done: !workout.done} : workout)
    setWorkouts(update)
  }

  const randomiseWorkout = (targetWorkout) => {
    const newWorkout = generateWorkout()
    setWorkouts(workouts.map(workout => workout === targetWorkout ? newWorkout : workout))
  }

  const listMapper = (workout,index) => (<li key={index}>
  <p>
    {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
  </p>
  {!workout.done && 
    <button onClick={e=>completeWorkout(workout)}>Done</button>}
  {workout.done && 
   <p>✅</p>}
  <button onClick={e=>deleteWorkout(workout)}>Delete</button>
  <button onClick={e=>randomiseWorkout(workout)}>Randomise!</button>
</li>)

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        {!checked ? workouts.map(listMapper) : workouts.filter(w => w.done === true).map(listMapper)}
      </ul>
      <div>
        <input onChange = {() => toggleCheck(!checked)} type="checkbox" id="showDone" name="showDone"
              checked = {checked}></input>
        <label for="showDone">Show Done</label>
      </div>  
    </div>
  )
}

export default App
