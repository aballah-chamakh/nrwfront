import React from 'react';
import { withRouter } from 'react-router-dom';
import "./hiddensidebar-scss.scss";
import { connect } from "react-redux";
import $ from 'jquery';

class HiddenSidebar extends React.Component {
    goTo = (path) => {
        this.props.history.push(path);
    }
    logout = () => {
        this.props.trans_company_logout()
        this.props.history.push("/")
    }
    render() {
        let trans_company_slug = this.props.match.params.trans_company_slug;
        return (
            <div class="hidden-sidebar-container">
                <ul class="hidden-sidebar-items">
                    <li class="hidden-sidebar-item" onClick={() => { this.props.openSideBar(false) }}>
                        <i class="material-icons">arrow_forward</i>
                    </li>
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
export default withRouter(connect(null, mapDispatchToProps)(HiddenSidebar));