import PostCard from './PostCard.jsx'

function PostList({ posts }) {
  if (posts.length === 0) {
    return <p className="status-message">Ничего не найдено</p>
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
