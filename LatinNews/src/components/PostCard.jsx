export function PostCard({ post, onOpen }) {
  const { id, title, body, userId } = post

  return (
    <article className="post-card" onClick={() => onOpen(post)}>
      <p className="post-card__id">Новость №{id}</p>
      <h2 className="post-card__title">{title}</h2>
      <p className="post-card__body">{body}</p>
      <div className="post-card__footer">
        <span className="post-card__author">Автор: пользователь {userId}</span>
      </div>
    </article>
  )
}
