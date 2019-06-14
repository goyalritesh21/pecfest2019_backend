import React, {Component} from 'react';
import Profile from '../../../public/images/profile.jpg';
import Profile1 from '../../../public/images/profile1.jpg';
import Techback from '../../../public/images/techback.jpg';
import Cultback from '../../../public/images/cultback.jpg';
import Profile2 from '../../../public/images/profile2.jpg';
import Lectback from '../../../public/images/lectback.jpg';
import Profile3 from '../../../public/images/profile3.jpg';
import Workback from '../../../public/images/workback.jpg';

import { NavLink } from 'react-router-dom'
import { MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import "./typesevent.scss";
class Types extends Component {
        constructor(props){
            super(props);
            this.state = {
                name: this.props.location.aboutprops.name,
                img: null,
                imgback: null
            }
        }
        componentDidMount(){
            this.getImage();
        }
        getImage = () => {
            if(this.state.name == 'Technical'){
                this.setState(() => ({img: Profile,imgback: Techback}));
            }
            else if(this.state.name == 'Cultural'){
                this.setState(() => ({img: Profile1,imgback: Cultback}));
            }
            else if(this.state.name == 'Lecture'){
                this.setState(() => ({img: Profile2,imgback: Lectback}));
            }
            else if(this.state.name == 'Workshop'){
                this.setState(() => ({img: Profile3,imgback: Workback}));
            }
            
        };

        render() {
            return (
                <div>
        
                
        <div className="sidebar-menu hidden-xs hidden-sm">
            <div className="top-section">
                <div className="profile-image">
                    <img src={this.state.img} alt="Technical" />
                </div>
                <h3 className="profile-title">Categories</h3>
                {/* <p className="profile-description">Pecfest</p> */}
            </div>
            <div className="main-navigation">
                <ul className="navigation">
                    
                    <li><NavLink to="/event/:id"><i className="fa fa-paperclip"></i>Category1</NavLink></li>
                    <li><NavLink to="/event/:id"><i className="fa fa-paperclip"></i>Category2</NavLink></li>
                    <li><NavLink to="/event/:id"><i className="fa fa-paperclip"></i>Category3</NavLink></li>
                    <li><NavLink to="/event/:id"><i className="fa fa-paperclip"></i>Category4</NavLink></li>
                    
                </ul>
            </div>
            
        </div> 
        

        <div className="banner-bg" id="top" style={{backgroundImage: `url(${this.state.imgback})`}}>
            <div className="banner-overlay"></div>
            <div className="welcome-text">
                <h2>{this.props.location.aboutprops.name} Events | Pecfest</h2>
                <h5>The list of Events being held</h5>
            </div>
        </div>

        
        </div>
            );
        }
}
export default Types;    