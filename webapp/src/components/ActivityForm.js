import React from "react";
import { connect } from "react-redux";
import { activityAdd, activityUpdate } from "./../redux/actions"
import Activity from "./../data/Activity";
import ActivityType from './../components/ActivityTypes';


class ActivityForm extends React.Component {
    constructor(props) {
        super(props)
        this.activity = new Activity(this.props.user.token)

        this.errors = {
            type: null,
            client: null,
            schedule_at: null,
            note: null,
        }

        const activity = this.props?.activity || null

        this.state = {
            type: activity ? activity.type : '',
            client: activity ? activity.client.id : '',
            schedule_at: activity ? activity.schedule_at : '',
            note: activity ? activity.note : '',
            error: null,
            errors: this.errors
        }
    }

    updateType = newValue => {
        this.setState({ type: newValue })
    }

    updateClient = newValue => {
        this.setState({ client: newValue })
    }

    updateScheduleAt = newValue => {
        this.setState({ schedule_at: newValue })
    }

    updateNote = newValue => {
        this.setState({ note: newValue })
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
        const type = this.state.type;
        const schedule_at = this.state.schedule_at;
        const client = this.state.client;
        const note = this.state.note;

        this.clearErrors()
        try {
            if (this.props.action === 'create') {
                const response = await this.activity.create({
                    type, schedule_at, client, note
                })
                this.props.activityAdd({ activity: response.data })
            } else {
                const response = await this.activity.update(
                    this.props.activity, 
                    { type, schedule_at, client, note}
                )
                this.props.activityUpdate({ activity: response.data })
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
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Type
                    </label>
                    <ActivityType 
                        className="block w-full"
                        value={this.state.type}
                        onChange={this.updateType} 
                    />
                    <p className="text-red text-xs italic">
                        {this.state.errors.type}
                    </p>
                </div>
    
                <div className="mb-8">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="client">
                        Client
                    </label>
                    <input 
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1" 
                        id="client" 
                        type="text"
                        value={this.state.client}
                        onChange={e => this.updateClient(e.target.value)}
                    />
                    <p className="text-red text-xs italic">
                        {this.state.errors.client}
                    </p>
                </div>
    
                <div className="mb-8">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="schedule-at">
                        Schedule at
                    </label>
                    <input 
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1" 
                        id="schedule-at" 
                        type="text"
                        placeholder="YYYY-MM-DD hh:mm:ss"
                        value={this.state.schedule_at}
                        onChange={e => this.updateScheduleAt(e.target.value)}
                    />
                    <p className="text-red text-xs italic">
                        {this.state.errors.schedule_at}
                    </p>
                </div>
    
                <div className="mb-8">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Note
                    </label>
                    <input 
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1" 
                        id="password" 
                        type="text"
                        value={this.state.note}
                        onChange={e => this.updateNote(e.target.value)}
                    />
                    <p className="text-red text-xs italic">
                        {this.state.errors.note}
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

export default connect(mapStateToProps, { activityAdd, activityUpdate })(ActivityForm)
