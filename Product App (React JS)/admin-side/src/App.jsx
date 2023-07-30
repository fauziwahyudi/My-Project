import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      

    </>
  )
}

export default App
