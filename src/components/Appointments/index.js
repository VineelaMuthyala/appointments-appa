import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    appDate: '',
    filterStarredBtn: false,
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({appDate: event.target.value})
  }

  addAppointments = event => {
    event.preventDefault()
    const {title, appDate} = this.state
    const formattedDate = appDate
      ? format(new Date(appDate), 'dd MMMM yyyy , EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      appDate: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      appDate: '',
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  starredList = () => {
    this.setState(prevState => ({
      filterStarredBtn: !prevState.filterStarredBtn,
    }))
  }

  getfilteredList = () => {
    const {appointmentsList, filterStarredBtn} = this.state
    if (filterStarredBtn) {
      return appointmentsList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {title, appDate, filterStarredBtn} = this.state
    const filteredList = this.getfilteredList()

    const starButtonClassName = filterStarredBtn
      ? 'starred-btn-purple'
      : 'starred-btn'

    return (
      <div className="bg-container">
        <div className="appointments-container">
          <div className="add-input-data-container">
            <form className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <label className="form-text" htmlFor="title">
                Title
              </label>
              <input
                className="input-text"
                type="text"
                onChange={this.addTitle}
                value={title}
                placeholder="Title"
                id="title"
              />
              <label className="form-text" htmlFor="date">
                Date
              </label>
              <input
                className="input-text"
                type="date"
                onChange={this.addDate}
                value={appDate}
                id="date"
              />
              <button
                type="submit"
                className="add-button"
                onClick={this.addAppointments}
              >
                Add
              </button>
            </form>
            <img
              className="image-app"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
            />
          </div>
          <hr className="line" />
          <div className="appointments-container">
            <div className="appointment-stared-container">
              <h1 className="heading-2">Appointments</h1>
              <button
                className={starButtonClassName}
                type="button"
                onClick={this.starredList}
              >
                Starred
              </button>
            </div>
            <div>
              <ul className="appointment-Details-container">
                {filteredList.map(eachAppoint => (
                  <AppointmentItem
                    appointmentDetails={eachAppoint}
                    key={eachAppoint.id}
                    toggleStar={this.toggleStar}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
