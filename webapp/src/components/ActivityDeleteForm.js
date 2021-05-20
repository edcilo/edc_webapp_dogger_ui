import React from "react";
import { connect } from "react-redux";
import { activityUpdate } from "./../redux/actions";
import Activity from "./../data/Activity";


class ActivityDeleteForm extends React.Component {
    constructor(props) {
        super(props)
        this.activity = new Activity(this.props.user.token)

        this.state = {
            error: null,
        }
    }

    setError = data => {
        this.setState({ error: data.detail })
    }

    clearErrors = () => {
        this.setState({ error: null })
    }

    handlerSubmit = async () => {
        this.clearErrors()
        try {
            const response = await this.activity.delete(this.props.activity)
            this.props.activityUpdate({ activity: response.data })
            this.props.successHandler()
        } catch (error) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 401) {
                this.setError(data)
            }
        }
    }

    render() {
        const activity = this.props.activity;

        return (
            <div>
                { 
                    this.state.error ? (
                        <div className="mb-6 block text-sm text-left text-red-600 bg-red-200 border border-red-400 h-12 flex items-center p-4 rounded-sm" role="alert">
                            {this.state.error}
                        </div>
                    ) : null 
                }

                <p className="mb-6">Are you absolutely sure?</p>

                { 
                    activity ? (
                        <ul className="mb-6">
                            <li>{activity.type_human}</li>
                            <li>{activity.client.name} {activity.client.lastname}</li>
                            <li>{activity.schedule_at}</li>
                        </ul>
                    ) : null
                }

                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red hover:bg-red-dark hover:shadow-md focus:outline-none"
                        onClick={this.handlerSubmit}
                    >
                        DELETE
                    </button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { activityUpdate })(ActivityDeleteForm)
