import {Component} from 'react'

import {v4 as idv4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

const initiallist = []

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    AppointmentList: initiallist,
    starredlist: false,
  }

  onAddappointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newappointment = {
      id: idv4(),
      title,
      DATE: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isstarred: false,
    }

    this.setState(prevState => ({
      AppointmentList: [...prevState.AppointmentList, newappointment],
      title: '',
      date: '',
    }))
  }

  onChangetitle = event => {
    this.setState({title: event.target.value})
  }

  onChangedate = event => {
    this.setState({date: event.target.value})
  }

  appointmentstarred = id => {
    this.setState(prevState => ({
      AppointmentList: prevState.AppointmentList.map(eachappointment => {
        if (id === eachappointment.id) {
          return {...eachappointment, isstarred: !eachappointment.isstarred}
        }
        return eachappointment
      }),
    }))
  }

  getstarredlist = () => {
    this.setState(prevState => ({
      starredlist: !prevState.starredlist,
    }))
  }

  render() {
    const {title, date, AppointmentList, starredlist} = this.state

    const filteredList = AppointmentList.filter(
      eachappointment => eachappointment.isstarred === true,
    )

    const newAppointmentList = starredlist ? filteredList : AppointmentList

    const activeclass = starredlist ? 'active' : ''

    console.log(title, date, AppointmentList)
    return (
      <div className="container">
        <div className="card">
          <div className="uppercard">
            <div className="leftcard">
              <h1>Add Appointment</h1>
              <form className="form" onSubmit={this.onAddappointment}>
                <label htmlFor="input1">TITLE</label>
                <input
                  id="input1"
                  type="text"
                  value={title}
                  onChange={this.onChangetitle}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="input2">DATE</label>
                <input
                  id="input2"
                  className="input"
                  value={date}
                  type="date"
                  onChange={this.onChangedate}
                />
                <button type="submit" className="button">
                  Add Appointment
                </button>
              </form>
            </div>
            <div className="rightcard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="break" />
          <div className="lowercard">
            <div className="block1">
              <h1>Appointments</h1>
              <button
                type="button"
                onClick={this.getstarredlist}
                className={`get-button ${activeclass}`}
              >
                Starred
              </button>
            </div>
            <div className="block2">
              <ul className="block2">
                {newAppointmentList.map(eachappointment => (
                  <AppointmentItem
                    key={eachappointment.id}
                    Appointmentdetails={eachappointment}
                    appointmentstarred={this.appointmentstarred}
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
