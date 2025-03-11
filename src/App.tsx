import Styles from './App.module.css'
import sicadData from './models/sicad.json'
import { scale } from './models/scale'
import Question from './Components/Question'

function App() {
  const sicadScale = sicadData as scale

  

  return (
    <Question params={{ sicad: sicadScale }} />
  )
}

export default App