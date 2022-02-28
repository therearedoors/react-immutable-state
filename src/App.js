import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [memo, setMemo] = useState(initialWorkouts)
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [done, setDone] = useState(workouts.filter(w => w.done === true))
  const [checked, toggleCheck] = useState(false)


  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    if (checked) setMemo([...memo, newWorkout])
    else setWorkouts([...workouts, newWorkout])
    
  }

  const deleteWorkout = (targetWorkout) => {
    setWorkouts(workouts.filter(workout => workout !== targetWorkout))
    if (checked) {
      const updateDone = done.filter(workout => workout !== targetWorkout)
      const updateMemo = memo.filter(workout => workout !== targetWorkout)
      setMemo(updateMemo)
      setDone(updateDone)
      setWorkouts(updateDone)
    }
  }

  const completeWorkout = (targetWorkout) => {
    const update = workouts.map(workout => workout === targetWorkout ? {...workout, done: !workout.done} : workout)
    setWorkouts(update)
    setDone(update.filter(workout => workout.done === true))
  }

  const randomiseWorkout = (targetWorkout) => {
    const newWorkout = generateWorkout()
    setWorkouts(workouts.map(workout => workout === targetWorkout ? newWorkout : workout))
  }

  const toggleDone = () => {
    toggleCheck(!checked)
    if (!checked) {
      setMemo(workouts)
      setWorkouts(done)
    }
    else setWorkouts(memo)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>randomiseWorkout(workout)}>Randomise!</button>
          </li>
        ))}
      </ul>
      <div>
        <input onChange = {e => toggleDone(e)} type="checkbox" id="showDone" name="showDone"
              checked = {checked}></input>
        <label for="showDone">Show Done</label>
      </div>  
    </div>
  )
}

export default App
