import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { HomePage } from './pages/Home'

const App = document.getElementById('root')
const Root: FC = () => {
  return <HomePage />
}
ReactDOM.render(<Root />, App)
