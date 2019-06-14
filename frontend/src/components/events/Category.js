import React, {Component} from 'react';
import Cult from '../../../public/images/cult.jpg';
import Tech from '../../../public/images/tech.jpg';
import { MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import IndividualEvent from './IndividualEvent';
import { NavLink } from 'react-router-dom'




// import EventInfo from './EventInfo';
class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            img: null,
            showComponent: ''
        }
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    componentDidMount(){
        this.getImage();
    }
    _onButtonClick(e) {
        // e.preventDefault();
        this.setState({
          showComponent: this.props.category,
        });
        
        console.log("clicked",this.props.category);
    }

    getImage = () => {
        if(this.state.id === 0 || this.state.id===2){
            this.setState(() => ({img: Tech}));
        }
        else {
            this.setState(() => ({img: Cult}));
        }
    };

    render() {
        return (
            <div className={"col-md-3"}>
                {/* This div is for {this.props.category} Category. */}
                <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage className="img-fluid" src={this.state.img}/>
                  <MDBCardBody >
                    <MDBCardTitle>{this.props.category}</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary" onClick={this._onButtonClick}>View Events</MDBBtn>
                            {this.state.showComponent == 'Technical' && <NavLink to={{pathname:'/events/types',aboutprops:{name: 'Technical'}}} >Details</NavLink>}
                            {/* {this.state.showComponent == 'Technical' && <Technicalevents />} */}
                            {this.state.showComponent == 'Lectures' && <NavLink to={{pathname:'/events/types',aboutprops:{name: 'Lecture'}}} >Details</NavLink>}
                            {this.state.showComponent == 'Workshops' && <NavLink to={{pathname:'/events/types',aboutprops:{name: 'Workshop'}}} >Details</NavLink>}
                            
                            {this.state.showComponent == 'Cultural' && <NavLink to={{pathname:'/events/types',aboutprops:{name: 'Cultural'}}} >Details</NavLink>}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </div>
        );
    }
}

export default Category;






    
