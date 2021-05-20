import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { activitiesSet, userLogout } from './../redux/actions';
import Activity from './../data/Activity';
import Client from './../data/Client';
import ActivityType from './../components/ActivityTypes';
import Modal from './../components/Modal';
import ActivityForm from "./../components/ActivityForm";
import ActivityDeleteForm from "./../components/ActivityDeleteForm";


class Activities extends React.Component {
  constructor(props) {
    super(props)
    this.activity = new Activity(this.props.user.token)
    this.client = new Client(this.props.user.token)

    this.state = {
      client_id: props.match.params.id,
      activity: null,
      type: null,
      start: null,
      end: null,
      new_activity_modal: false,
      update_activity_modal: false,
      delete_activity_modal: false,
    }

    this.getActivities()
  }

  getActivities = async () => {
    const type = this.state.type;
    const start = this.state.start;
    const end = this.state.end;
    
    this.props.activitiesSet({ activities: [] })
    try {
      const response = await this.client.getActivities(
        this.state.client_id, {type, start, end}
      )
      this.props.activitiesSet({ activities: response.data })
    } catch (error) {
      const status = error.response.status;

      if (status === 401) {
        this.props.userLogout()
      }
    }
  }

  updateType = newValue => {
    this.setState({ type: newValue || null })
  }

  updateStart = newValue => {
    this.setState({ start: newValue || null })
  }

  updateEnd = newValue => {
    this.setState({ end: newValue || null })
  }

  newActvityModalHandler = () => {
    this.setState({
      new_activity_modal: !this.state.new_activity_modal, 
      update_activity_modal: false
    })
  }

  updateActvityModalHandler = (activity=null) => {
    this.setState({
      activity,
      update_activity_modal: !this.state.update_activity_modal, 
      new_activity_modal: false
    })
  }

  deleteActivityModalHandler = (activity=null) => {
    this.setState({
      activity,
      delete_activity_modal: !this.state.delete_activity_modal,
      update_activity_modal: false,
      new_activity_modal: false
    })
  }

  render() {
    return (
      <div className="bg-gray-100 p-0 sm:p-12">
        <div className="mb-4">
          <Link 
            className="inline-flex items-center w-full text-sm font-semibold text-blue transition-colors duration-150 cursor-pointer hover:text-blue-500" 
            to="/">
            &lt; Volver
          </Link>
        </div>

        <div className="bg-white pb-4 px-4 rounded-md w-full">
          <div className="flex justify-between w-full pt-6 mb-8">
            <h1 className="text-2xl text-center font-bold">Activities</h1>
            <button type="button" 
              className="px-6 py-3 text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green hover:bg-green-dark hover:shadow-md focus:outline-none"
              onClick={this.newActvityModalHandler}
            >
              New Activity
            </button>
          </div>

          <div className="w-full flex justify-end px-2 mt-2">
            <div className="w-lg">
              <ActivityType onChange={this.updateType} />
            </div>
            <input 
              className="appearance-none border rounded py-2 px-3 text-grey-darker mb-1"  
              type="text"
              placeholder="Start"
              onChange={e => this.updateStart(e.target.value)}
            />
            <input 
              className="appearance-none border rounded py-2 px-3 text-grey-darker mb-1"  
              type="text"
              placeholder="End"
              onChange={e => this.updateEnd(e.target.value)}
            />
            <button
              className="px-3 py-0 text-sm text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue hover:bg-blue-dark hover:shadow-md focus:outline-none"
              onClick={this.getActivities}
            >
              Filtrar
            </button>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                <th className="px-4 py-2 bg-gray-200">Type</th>
                <th className="px-4 py-2 bg-gray-200">Client</th>
                <th className="px-4 py-2 bg-gray-200">Status</th>
                <th className="px-4 py-2 bg-gray-200">Schedule at</th>
                <th className="px-4 py-2 bg-gray-200"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {
                this.props.activities.map((activity, index) => {
                  return (
                    <tr key={activity.id} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                      <td className="px-4 py-4">{activity.type_human}</td>
                      <td className="px-4 py-4">{activity.client.name} {activity.client.lastname}</td>
                      <td className="px-4 py-4">{activity.status}</td>
                      <td className="px-4 py-4">{activity.schedule_at}</td>
                      {/* TODO: fix disabled class */}
                      <td className="px-4 text-center">
                        <button 
                          type="button" 
                          className="mr-1 px-3 py-2 rounded shadow bg-yellow text-white hover:bg-yellow-dark hover:shadow-md focus:outline-none disabled:bg-red"
                          disabled={activity.status === 'deactivated'}
                          onClick={() => this.updateActvityModalHandler(activity)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="px-3 py-2 rounded shadow bg-red text-white hover:bg-red-dark hover:shadow-md focus:outline-none disabled:bg-yellow"
                          disabled={activity.status === 'deactivated'}
                          onClick={() => this.deleteActivityModalHandler(activity)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            </table>
          </div>

          {
            this.state.new_activity_modal ? (
              <Modal title="New Activity" closeHandler={this.newActvityModalHandler}>
                <ActivityForm action="create" clientId={this.state.client_id} successHandler={this.newActvityModalHandler}/>
              </Modal>
            ) : null
          }
          {
            this.state.update_activity_modal ? (
              <Modal title="Update Activity" closeHandler={() => this.updateActvityModalHandler()}>
                <ActivityForm action="update" clientId={this.state.client_id} activity={this.state.activity} successHandler={() => this.updateActvityModalHandler()}/>
              </Modal>
            ) : null
          }
          {
            this.state.delete_activity_modal ? (
              <Modal title="Delete Activity" closeHandler={() => this.deleteActivityModalHandler()}>
                <ActivityDeleteForm activity={this.state.activity} successHandler={() => this.deleteActivityModalHandler()}/>
              </Modal>
            ) : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  activities: state.activities.all
})

export default connect(mapStateToProps, { activitiesSet, userLogout })(Activities)
