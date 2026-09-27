import { useEffect, useState } from 'react'
import { PostCard } from './PostCard.jsx'
import { PostModal } from './PostModal.jsx'

const pageSize = 18

export function PostList() {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [page, setPage] = useState(1)
  const [attempt, setAttempt] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки')
        }
        return response.json()
      })
      .then(data => {
        if (page === 1) {
          setPosts(data)
        } else {
          setPosts(prev => [...prev, ...data])
        }

        setHasMore(data.length === pageSize)
      })
      .catch(() => {
        setError('Не удалось загрузить посты')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [page, attempt])

  const loadMore = () => {
    if (isLoading || error || !hasMore) return

    setIsLoading(true)
    setError(null)
    setPage(page + 1)
  }

  const retry = () => {
    setIsLoading(true)
    setError(null)
    setAttempt(attempt + 1)
  }

  const retryButton = (
    <button type="button" className="retry-button" onClick={retry}>
      Повторить
    </button>
  )

  if (posts.length === 0) {
    if (isLoading) {
      return <p className="status-message">Идёт загрузка</p>
    }

    if (error) {
      return (
        <p className="status-message status-message--error">
          {error} {retryButton}
        </p>
      )
    }

    return <p className="status-message">Ничего не найдено</p>
  }

  return (
    <>
      <div className="post-list">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onOpen={setSelectedPost} />
        ))}
      </div>

      {isLoading && <p className="status-message">Идёт загрузка</p>}

      {!isLoading && error && (
        <p className="status-message status-message--error">
          {error} {retryButton}
        </p>
      )}

      {!isLoading && !error && hasMore && (
        <button type="button" className="load-more" onClick={loadMore}>
          Ещё посты
        </button>
      )}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  )
}
