import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { HOST_URL } from "../../../config";
import { connect } from "react-redux";
import './sidebar-scss.scss';

class Sidebar extends React.Component {
    state = {
        trans_company: null,
    }
    componentDidMount() {
        let token = localStorage.getItem("token")
        let decoded_token = jwt_decode(token)
        let trans_company = { company_name: decoded_token['trans_company_name'], image: decoded_token['trans_company_img'] }
        this.setState({ trans_company: trans_company })
    }
    goTo = (path) => {
        this.props.history.push(path);
    }
    logout = () => {
        this.props.trans_company_logout()
        this.props.history.push("/")
    }

    render() {
        let trans_company_slug = this.props.match.params.trans_company_slug;
        let token = localStorage.getItem("token")
        let decoded_token = jwt_decode(token)
        let trans_company = { company_name: decoded_token['trans_company_name'], image: decoded_token['trans_company_img'] }


        //<i class='fas fa-clipboard-list'></i>
        return (
            <div class="sidebar-container">
                <div class="sidebar-icon">
                    <p>itransport</p>
                    <i class='fas fa-arrow-left' onClick={() => { this.props.closeSidebar(false) }}></i>
                </div>
                {adminprofile ?
                    <div class="sidebar-img-username">
                        <img src={HOST_URL + trans_company.image} />
                        <p>mr. {trans_company.username}</p>
                    </div> : null}
                <ul>
                    <li onClick={() => this.goTo("/trans_company/" + trans_company_slug + "/Buses/")}>
                        <i class="material-icons">Buses</i>
                        <p>Buses</p>
                    </li>
                    <li onClick={() => this.goTo("/trans_company/" + trans_company_slug + "/test1/")}>
                        <i style={{ fontSize: '18px', paddingLeft: '13px', paddingRight: '15px' }} class='fas fa-users'></i>
                        <p>test1</p>
                    </li>
                    <li onClick={() => this.goTo("/trans_company/" + trans_company_slug + "/test2/")}>
                        <i style={{ fontSize: '18px', paddingLeft: '13px', paddingRight: '15px' }} class='fas fa-users'></i>
                        <p>test1</p>
                    </li>
                    <li onClick={() => this.goTo("/trans_company/" + trans_company_slug + "/test3/")}>
                        <i style={{ fontSize: '18px', paddingLeft: '13px', paddingRight: '15px' }} class='fas fa-users'></i>
                        <p>test3</p>
                    </li>
                    <li onClick={() => this.logout()}>
                        <i class='fas fa-unlock-alt'></i>
                        <p>logout</p>
                    </li>
                </ul>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        'trans_company_logout': () => dispatch({ type: "trans_company_logout" })
    }
}
export default withRouter(connect(null, mapDispatchToProps)(Sidebar));