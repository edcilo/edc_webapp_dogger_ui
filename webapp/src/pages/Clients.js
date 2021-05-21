import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout, clientsSet } from './../redux/actions';
import Client from './../data/Client';


class Clients extends React.Component {
    constructor(props) {
        super(props)
        this.client = new Client(this.props.user.token)

        this.getClients()
    }

    async getClients() {
        try {
            const response = await this.client.getAll();
            this.props.clientsSet({ clients: response.data })
        } catch (error) {
            const status = error.response.status;

            if (status === 401) {
                this.props.userLogout()
            }
        }
    }
    
    render() {
        return (
            <div className="bg-gray-100 p-0 sm:p-12">
                <div className="bg-white pb-4 px-4 rounded-md w-full">
                    <div className="flex justify-between w-full pt-6 mb-8">
                        <h1 className="text-2xl text-center font-bold">Clients</h1>
                    </div>

                    <div className="overflow-x-auto mt-6">
                        <table className="table-auto border-collapse w-full">
                        <thead>
                        <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                            <th className="px-4 py-2 bg-gray-200">Name</th>
                            <th className="px-4 py-2 bg-gray-200">Phone</th>
                            <th className="px-4 py-2 bg-gray-200">Email</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {
                            this.props.clients.map((client, index) => {
                                return (
                                    <tr key={client.id} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                                        <td className="px-4 py-4">
                                            <Link 
                                                className="inline-flex items-center w-full text-sm font-semibold text-blue transition-colors duration-150 cursor-pointer hover:text-blue-500" 
                                                to={`/client/${client.id}`}>
                                                    {client.name} {client.lastname}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4">{client.phone}</td>
                                        <td className="px-4 py-4">{client.email}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    clients: state.clients.all
})

export default connect(mapStateToProps, { userLogout, clientsSet })(Clients)