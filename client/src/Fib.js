import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const fetchValues = async () => {
    const { data } = await axios.get('/api/values/current')

    setValues(data)
  }

  const fetchIndexes = async () => {
    const { data } = await axios.get('/api/values/all')

    setSeenIndexes(data)
  }

  const renderSeenIndexes = () => seenIndexes.map(({ number }) => number).join(', ')

  const renderValues = () => Object.keys(values).map((index) => <div key={ index }>For index { index } I calculated { values[index] }</div>)

  const handleIndexChange = event => setIndex(event.target.value)

  const handleSubmit = async event => {
    event.preventDefault()

    await axios.post('/api/values', { index })

    setIndex('')
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label>Enter your index</label>
        <input
          value={ index }
          onChange={ handleIndexChange }
        />
        <button>Submit</button>

        <h3>Indexes I have seen</h3>
        { renderSeenIndexes() }

        <h3>Calculated values</h3>
        { renderValues() }
      </form>
    </div>
  )
}

export default Fib
