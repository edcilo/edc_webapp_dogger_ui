import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout, walkersSet } from './../redux/actions';
import Walker from './../data/Walker';


class Walkers extends React.Component {
    constructor(props) {
        super(props)
        this.walker = new Walker(this.props.user.token)

        this.getWalkers()
    }

    async getWalkers() {
        try {
            const response = await this.walker.getAll();
            this.props.walkersSet({ walkers: response.data })
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
                        <h1 className="text-2xl text-center font-bold">Walkers</h1>
                    </div>

                    <div className="overflow-x-auto mt-6">
                        <table className="table-auto border-collapse w-full">
                        <thead>
                        <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                            <th className="px-4 py-2 bg-gray-200">Name</th>
                            <th className="px-4 py-2 bg-gray-200">Email</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-gray-700">
                        {
                            this.props.walkers.map((walker, index) => {
                                return (
                                    <tr key={index} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                                        <td className="px-4 py-4">
                                            <Link 
                                                className="inline-flex items-center w-full text-sm font-semibold text-blue transition-colors duration-150 cursor-pointer hover:text-blue-500" 
                                                to={`/walker/${walker.uuid}`}>
                                                    {walker.username}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4">{walker.email}</td>
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
    walkers: state.walkers.all || []
})

export default connect(mapStateToProps, { userLogout, walkersSet })(Walkers)
