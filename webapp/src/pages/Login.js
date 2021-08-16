import React from "react";
import { connect } from "react-redux";
import { userLogin } from './../redux/actions';
import User from './../data/User';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.user = new User()

        this.errors = {
            username: null,
            password: null,
        }

        this.state = {
            username: 'user+06@edcilo.com',
            password: 'secret123.',
            error: null,
            errors: this.errors
        }
    }

    updateUsername = newValue => {
        this.setState({ username: newValue })
    }

    updatePassword = newValue => {
        this.setState({ password: newValue })
    }

    clearErrors = () => {
        this.setState({ error: null, errors: this.errors })
    }

    clearData = () => {
        this.setState({ username: '', password: '' })
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

    handlerLogin = async () => {
        const username = this.state.username;
        const password = this.state.password;

        this.clearErrors()
        try {
            const response = await this.user.login(username, password);
            const access = response.data.access;
            const userData = this.user.decode(access)
            this.props.userLogin({ 
                access,
                refresh: response.data.refresh,
                data: userData
            })
            this.clearData()
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
            <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
                <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded">
                    <h1 className="text-2xl text-center font-bold mb-8">Log In</h1>

                    { this.state.error ? (
                        <div className="mb-6 block text-sm text-left text-red-600 bg-red-200 border border-red-400 h-12 flex items-center p-4 rounded-sm" role="alert">
                            {this.state.error}
                        </div>
                    ) : null }

                    <div className="mb-6">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input 
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1" 
                            id="username" 
                            type="text"
                            value={this.state.username}
                            onChange={e => this.updateUsername(e.target.value)}
                        />
                        <p className="text-red text-xs italic">
                            {this.state.errors.username}
                        </p>
                    </div>

                    <div className="mb-8">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-1" 
                            id="password" 
                            type="password"
                            value={this.state.password}
                            onChange={e => this.updatePassword(e.target.value)}
                        />
                        <p className="text-red text-xs italic">
                        {this.state.errors.password}
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue hover:bg-blue-dark hover:shadow-md focus:outline-none"
                            onClick={this.handlerLogin}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { userLogin })(Login)
