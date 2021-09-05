import React from 'react' ;
import Navbar from "../Navbar/Navbar" ;
import { HOST_URL } from '../../config';
import "./landingpage-scss.scss";
import LoginModal from "../Authentication/LoginModal/LoginModal";
import RegisterModal from "../Authentication/RegisterModal/RegisterModal";
import $ from "jquery";


class LandingPage extends React.Component {
    state = {
        loginModalVisibility: false,
        registerModalVisibility: false,

    }
    closeLoginModal = () => {
        this.setState({ loginModalVisibility: false })
    }
    openLoginModal = () => {
        this.setState({ loginModalVisibility: true })
    }
    openRegisterModal = () => {
        this.setState({ registerModalVisibility: true })
    }
    closeRegisterModal = () => {
        this.setState({ registerModalVisibility: false })
    }
   


    render() {



        return (
            <div class="landingpage-container">

                <LoginModal  loginModalVisibility={this.state.loginModalVisibility} close={this.closeLoginModal} />
                <RegisterModal registerModalVisibility={this.state.registerModalVisibility} close={this.closeRegisterModal}  />
                <Navbar openLoginModal={this.openLoginModal} openRegisterModal={this.openRegisterModal} />
                <div class="landingpage-content">
                  <h1>Itransport landing page</h1>
                </div>

            </div>
        )
    }
}
export default LandingPage;