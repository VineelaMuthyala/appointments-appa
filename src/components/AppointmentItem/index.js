import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {title, appDate, id, isStarred} = appointmentDetails
  const starStatus = () => {
    toggleStar(id)
  }
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each-list-container">
      <div className="title-star-container">
        <p className="heading-item">{title}</p>
        <button
          className="button-star"
          type="button"
          onClick={starStatus}
          data-testid="star"
        >
          <img className="star-icon" alt="star" src={starImage} />
        </button>
      </div>
      <p className="para-date">Date: {appDate}</p>
    </li>
  )
}
export default AppointmentItem
