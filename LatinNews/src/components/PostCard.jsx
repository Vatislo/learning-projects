function PostCard({ post }) {
  return (
    <article className="post-card">
      <p className="post-card__id">Новость №{post.id}</p>
      <h2 className="post-card__title">{post.title}</h2>
      <div className="post-card__footer">
        <span className="post-card__author">Автор: пользователь {post.userId}</span>
      </div>
    </article>
  )
}

export default PostCard
