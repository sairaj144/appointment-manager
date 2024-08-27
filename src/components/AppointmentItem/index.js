import './index.css'

const AppointmentItem = props => {
  const {Appointmentdetails, appointmentstarred} = props
  const {id, title, DATE, isstarred} = Appointmentdetails

  const starbutton = () => {
    appointmentstarred(id)
  }

  const star = isstarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment">
      <div className="line1">
        <p className="title">{title}</p>
        <button
          type="button"
          className="button-star"
          data-testid="star"
          onClick={starbutton}
        >
          <img src={star} alt="star" />
        </button>
      </div>
      <p className="date">{DATE}</p>
    </li>
  )
}

export default AppointmentItem
