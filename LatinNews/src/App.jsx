import { useEffect, useState } from 'react'
import './App.css'
import PostList from './components/PostList.jsx'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки')
        }
        return response.json()
      })
      .then(data => {
        setPosts(data)
      })
  }, [])


  return (
    <>
      <PostList posts={posts} />
    </>
  )
}

export default App
