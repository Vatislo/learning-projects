import { useEffect, useState } from 'react'

export function PostModal({ post, onClose }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { id, title, body, userId } = post

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Пользователь не найден')
        }
        return response.json()
      })
      .then(data => {
        setUser(data)
      })
      .catch(() => {
        setError('Не удалось загрузить автора')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // когда окно закрылось — убираем слушатель и возвращаем скролл
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          ×
        </button>

        <p className="post-card__id">Новость №{id}</p>
        <h2 className="modal__title">{title}</h2>
        <p className="modal__body">{body}</p>

        <h3 className="modal__subtitle">Автор</h3>

        {isLoading && <p className="status-message">Идёт загрузка</p>}

        {error && (
          <p className="status-message status-message--error">{error}</p>
        )}

        {user && (
          <>
            <p className="modal__user-line">
              <b>Имя:</b> {user.name}
            </p>
            <p className="modal__user-line">
              <b>Никнейм:</b> {user.username}
            </p>
            <p className="modal__user-line">
              <b>Email:</b> {user.email}
            </p>
            <p className="modal__user-line">
              <b>Телефон:</b> {user.phone}
            </p>
            <p className="modal__user-line">
              <b>Сайт:</b> {user.website}
            </p>
            <p className="modal__user-line">
              <b>Компания:</b> {user.company.name}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
