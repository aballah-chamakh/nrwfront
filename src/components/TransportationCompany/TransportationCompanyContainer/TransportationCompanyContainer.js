import React from "react";
import { Route, Switch } from "react-router-dom";
import StudentList from "../Student/StudentList/StudentList";
import StudentDetail from "../Student/StudentDetail/StudentDetail";
import Sidebar from "../Sidebar/Sidebar";
import HiddenSidebar from "../HiddenSidebar/HiddenSidebar";
import $ from 'jquery';
import "./transportationcomapnycontainer-scss.scss";
import axios from 'axios';
import { HOST_URL } from '../../../config';
import jwt_decode from "jwt-decode";


class TransportationCompanyContainer extends React.Component {
    state = {
        loaded: false,

    }

    componentDidMount = () => {
        this.calcContentWidth()
        window.addEventListener('resize', this.calcContentWidth)
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.calcContentWidth)
        clearInterval(this.interval)
    }
    openSideBar = (inner) => {
        $('.hidden-sidebar-container').hide();
        $('.sidebar-container').show();
        $('.trans-company-container-content').css('margin-left', '250px')
        if (!inner) {
            this.calcContentWidth()
        }
    }
    closeSidebar = (inner) => {
        $('.sidebar-container').hide();
        $('.hidden-sidebar-container').show()
        $('.trans-company-container-content').css('margin-left', '50px')
        if (!inner) {
            this.calcContentWidth()
        }

    }
    calcContentWidth = () => {
        if ($(window).width() < 600 && $('.sidebar-container').css('display') != 'none') {
            this.closeSidebar(true)
        }
        let is_sidebar = $('.sidebar-container').css('display')
        let margin_left = 0
        if (is_sidebar != 'none') {
            margin_left = $('.sidebar-container').width()
        } else {
            margin_left = $('.hidden-sidebar-container').width()
        }
        let container_width = $(window).width() - margin_left;
        $(".trans-company-container-content").css("max-width", container_width)
        $(".trans-company-container-content").width(container_width)

    }

    render() {

        let trans_company_slug = this.props.match.params.trans_company_slug;
        let pathname = window.location.pathname

        if (pathname == "/trans_company/" + trans_company_slug + "/" || pathname == "/trans_company/" + trans_company_slug) {
            this.props.history.push("/trans_company/" + trans_company_slug + "/buses/")
        }
        return (
            <div class="trans-company-container" >
                <div class="trans-company-container-sidebar">
                    <HiddenSidebar openSideBar={this.openSideBar} />
                    <Sidebar closeSidebar={this.closeSidebar} />
                </div>
                <div class="trans-company-container-content">
                  
                </div>
            </div>
        )
    }
}
export default AdminContainer;