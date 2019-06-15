import React, {Component} from 'react';
import Cult from '../../../public/images/cult.jpg';
import Tech from '../../../public/images/tech.jpg';
import {
    MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn
} from "mdbreact";
import {Redirect, Link} from 'react-router-dom';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            category: this.props.category,
            img: null,
            showComponent: ''
        };
    }

    componentDidMount() {
        this.getImage();
    }

    _onButtonClick = (e) => {
        // e.preventDefault();
        this.setState(() => ({
            showComponent: this.props.category,
        }));

        console.log("clicked", this.props.category);
    };

    getImage = () => {
        if (this.state.id === 0 || this.state.id === 2) {
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
                        <MDBCardBody>
                            <MDBCardTitle>{this.props.category}</MDBCardTitle>
                            <MDBCardText>
                                Some quick example text to build on the card title and
                                make up the bulk of the card's content.
                            </MDBCardText>
                            <Link to={{
                                pathname: `/events/types/${this.state.category}`,
                                aboutprops: {name: this.state.category}
                            }}><MDBBtn color="primary" onClick={this._onButtonClick}>View Events</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        )
            ;
    }
}

export default Category;






    
