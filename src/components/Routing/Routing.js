import React from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';


import jwt_decode from "jwt-decode";
import { connect } from "react-redux";

import TransCompanyContainer from "../TransportationCompany/TransCompanyContainer/TransCompanyContainer";
import LandingPage from "../LandingPage/LandingPage";


class Routing extends React.Component {
    state = {
        reload: false,
        loaded: false,
    }
    componentDidMount() {
        //window.addEventListener('storage', this.handleStorageChange)
        let token = localStorage.getItem('token')

        if (token) {
            this.props.trans_company_login()
        }
        this.setState({ loaded: true })


    }
    /*
    handleStorageChange = () => {
        this.props.user_logout()
        this.props.history.push("/")
    }
    componentWillUnmount = () => {
        window.removeEventListener('storage', this.handleStorageChange)
    }*/
    render() {

        let token = localStorage.getItem('token')
        let trans_company_authenticated = this.props.trans_company_authenticated;
        if (token && trans_company_authenticated == false) {
            this.props.trans_company_login()
        } 
        return (

            <div class="routing-container">
                {loaded ?
                    <div>
                        {token ?
                            <Route path="/trans_company/" component={TransCompanyContainer} /> :
                            <Route path="/" component={LandingPage} />
                        }
                    </div>
            :null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        trans_company_authenticated: state.trans_company_authenticated,
    }
}
/*
const mapDispatchToProps = (dispatch) => {
    return {
        'student_login': () => dispatch({ type: 'student_login' }),
        'admin_login': () => dispatch({ type: 'admin_login' }),
        'user_logout': () => dispatch({ type: 'user_logout' }),

    }
}*/
export default withRouter(connect(mapStateToProps,null)(Routing));