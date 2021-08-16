import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { reservationsSet, userLogout } from './../redux/actions';
import Reservation from './../data/Reservation';
import Walker from './../data/Walker';
import Modal from './../components/Modal';
import ReservationForm from "./../components/ReservationForm";
import ReservationDeleteForm from "./../components/ReservationDeleteForm";


class Reservations extends React.Component {
  constructor(props) {
    super(props)
    this.reservation = new Reservation(this.props.user.token)
    this.client = new Walker(this.props.user.token)

    this.state = {
      walker: this.props.match.params.id,
      client_id: props.match.params.id,
      reservation: null,
      new_reservation_modal: false,
      update_reservation_modal: false,
      delete_reservation_modal: false,
    }

    this.getReservations()
  }

  getReservations = async () => {
    this.props.reservationsSet({ reservations: [] })
    try {
      const response = await this.reservation.getAll()
      this.props.reservationsSet({ reservations: response.data })
    } catch (error) {
      const status = error.response.status;

      if (status === 401) {
        this.props.userLogout()
      }
    }
  }

  newReservationModalHandler = () => {
    this.getReservations()
    this.setState({
      new_reservation_modal: !this.state.new_reservation_modal, 
      update_reservation_modal: false
    })
  }

  updateReservationModalHandler = (reservation=null) => {
    this.setState({
      reservation,
      update_reservation_modal: !this.state.update_reservation_modal, 
      new_reservation_modal: false
    })
  }

  deleteActivityModalHandler = (reservation=null) => {
    this.setState({
      reservation,
      delete_reservation_modal: !this.state.delete_reservation_modal,
      update_reservation_modal: false,
      new_reservation_modal: false
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
            <h1 className="text-2xl text-center font-bold">Reservations</h1>
            <button type="button" 
              className="px-6 py-3 text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green hover:bg-green-dark hover:shadow-md focus:outline-none"
              onClick={this.newReservationModalHandler}
            >
              New Reservation
            </button>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                <th className="px-4 py-2 bg-gray-200">Dog</th>
                <th className="px-4 py-2 bg-gray-200">Date</th>
                <th className="px-4 py-2 bg-gray-200"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {
                this.props.reservations.map((reservation, index) => {
                  return (
                    <tr key={reservation?.id} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                      <td className="px-4 py-4">{reservation?.dog?.name}</td>
                      <td className="px-4 py-4">{reservation?.date}</td>
                      {/* TODO: fix disabled class */}
                      <td className="px-4 text-center">
                        {/*
                        <button 
                          type="button" 
                          className="mr-1 px-3 py-2 rounded shadow bg-yellow text-white hover:bg-yellow-dark hover:shadow-md focus:outline-none disabled:bg-red"
                          disabled={reservation?.status === 'closed'}
                          onClick={() => this.updateReservationModalHandler(reservation)}
                        >
                          Edit
                        </button>
                        */}
                        <button
                          type="button"
                          className="px-3 py-2 rounded shadow bg-red text-white hover:bg-red-dark hover:shadow-md focus:outline-none disabled:bg-yellow"
                          disabled={reservation?.status === 'closed'}
                          onClick={() => this.deleteActivityModalHandler(reservation)}
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
            this.state.new_reservation_modal ? (
              <Modal title="New Reservation" closeHandler={this.newReservationModalHandler}>
                <ReservationForm action="create" walker={this.state.walker} clientId={this.state.client_id} successHandler={this.newReservationModalHandler}/>
              </Modal>
            ) : null
          }
          {
            this.state.update_reservation_modal ? (
              <Modal title="Update Activity" closeHandler={() => this.updateReservationModalHandler()}>
                <ReservationForm action="update" walker={this.state.walker} clientId={this.state.client_id} activity={this.state.activity} successHandler={() => this.updateReservationModalHandler()}/>
              </Modal>
            ) : null
          }
          {
            this.state.delete_reservation_modal ? (
              <Modal title="Delete Reservation" closeHandler={() => this.deleteActivityModalHandler()}>
                <ReservationDeleteForm walker={this.state.walker} reservation={this.state.reservation} successHandler={() => this.deleteActivityModalHandler()}/>
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
  reservations: state.reservations.all || []
})

export default connect(mapStateToProps, { reservationsSet, userLogout })(withRouter(Reservations))
