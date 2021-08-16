import React from "react";
import { connect } from "react-redux";
import { reservationAdd, reservationUpdate } from "./../redux/actions"
import Reservation from "./../data/Reservation";
import Dog from "./../data/Dog";
import Schedule from "./../data/Schedule";
import SelectComponent from './../components/SelectComponent';


class ReservationForm extends React.Component {
    constructor(props) {
        super(props)
        this.reservations = new Reservation(this.props.user.token)
        this.dogs = new Dog(this.props.user.token)
        this.schedule = new Schedule(this.props.user.token)

        this.errors = {
            walker: null,
            dog: null,
            schedule: null,
            date: null,
        }

        const reservation = this.props?.reservation || null

        this.state = {
            dogs: [],
            schedules: [],
            walker: this.props.walker,
            dog: reservation ? reservation.dog : '',
            schedule: reservation ? reservation.schedule : '',
            date: reservation ? reservation.date : '',
            error: null,
            errors: this.errors
        }

        this.getDogs()
        this.getSchedules()
    }

    getDogs = async () => {
        try {
          const response = await this.dogs.getAll()
          this.setState({ dogs: response.data })
        } catch (error) {
          const status = error.response.status;
    
          if (status === 401) {
            this.props.userLogout()
          }
        }
    }

    getSchedules = async () => {
        try {
            const response = await this.schedule.getAll(this.state.walker)
            const schedule = response.data;
            schedule.map(item => {
                switch (parseInt(item.day)) {
                    case 0: item.day = "domingo"; break;
                    case 1: item.day = "lunes"; break;
                    case 2: item.day = "martes"; break;
                    case 3: item.day = "miercoles"; break;
                    case 4: item.day = "jueves"; break;
                    case 5: item.day = "viernes"; break;
                    case 6: item.day = "sabado"; break;
                }
                item.description = `${item.day}, ${item.start} - ${item.end}`;
            })
            this.setState({ schedules: response.data })
        } catch (error) {
            const status = error.response.status;
    
            if (status === 401) {
                this.props.userLogout()
            }
        }
    }

    updateDog = newValue => {
        this.setState({ dog: newValue })
    }

    updateSchedule = newValue => {
        this.setState({ schedule: newValue })
    }

    updateDate = newValue => {
        this.setState({ date: newValue })
    }

    clearErrors = () => {
        this.setState({ error: null, errors: this.errors })
    }

    setGeneralError = data => {
        this.setState({ error: data.detail })
    }

    setErrors = fields => {
        const errors = {}
        for (const field in fields) {
            errors[field] = fields[field][0]
        }
        this.setState({ errors })
    }

    handlerSubmit = async () => {
        const walker = this.state.walker;
        const dog = this.state.dog;
        const schedule = this.state.schedule;
        const date = this.state.date;
        this.clearErrors()
        try {
            if (this.props.action === 'create') {
                const response = await this.reservations.create({
                    walker, dog, schedule, date
                })
                this.props.reservationAdd({ reservation: response.data })
            } else {
                const response = await this.reservations.update(
                    this.props.reservation, 
                    { walker, dog, schedule, date }
                )
                this.props.reservationUpdate({ reservation: response.data })
            }
            this.props.successHandler()
        } catch (error) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 400) {
                this.setErrors(data)
            } else if (status === 401) {
                this.setGeneralError(data)
            }
        }
    }

    render() {
        return (
            <div>
                { 
                    this.state.error ? (
                        <div className="mb-6 block text-sm text-left text-red-600 bg-red-200 border border-red-400 h-12 flex items-center p-4 rounded-sm" role="alert">
                            {this.state.error}
                        </div>
                    ) : null 
                }

                <div className="mb-8">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="dog">
                        Dog
                    </label>
                    <SelectComponent 
                        className="block w-full"
                        items={this.state.dogs}
                        value={this.state.dog}
                        label="name"
                        onChange={this.updateDog} 
                    />
                    <p className="text-red text-xs italic">
                        {this.state.errors.dog}
                    </p>
                </div>

                <div className="mb-8">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="schedule">
                        Schedule
                    </label>
                    <SelectComponent 
                        className="block w-full"
                        items={this.state.schedules}
                        value={this.state.schedule}
                        label="description"
                        onChange={this.updateSchedule} 
                    />
                    <p className="text-red text-xs italic">
                        {this.state.errors.schedule}
                    </p>
                </div>
    
                <div className="mb-8">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="date">
                        Date
                    </label>
                    <input 
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1" 
                        id="date" 
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={this.state.date}
                        onChange={e => this.updateDate(e.target.value)}
                    />
                    <p className="text-red text-xs italic">
                        {this.state.errors.date}
                    </p>
                </div>
    
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue hover:bg-blue-dark hover:shadow-md focus:outline-none"
                        onClick={this.handlerSubmit}
                    >
                        {this.props.action === 'create' ? 'Create' : 'Update'}
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { reservationAdd, reservationUpdate })(ReservationForm)
