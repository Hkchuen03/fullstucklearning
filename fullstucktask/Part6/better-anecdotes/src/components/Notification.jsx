import { useSelector, useDispatch } from 'react-redux'
import { muteNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(({ notification }) => {
    if (notification.content === null) return null
    setTimeout(() => {
      dispatch(muteNotification('Mute'))
    }, 5000)
    return notification.content
    //return anecdote.content
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  let commpont = notification === null? null : (
  <div style={style}>
    {notification}
  </div>
  )


  return commpont
}

export default Notification