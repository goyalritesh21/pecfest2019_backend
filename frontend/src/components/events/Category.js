import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Cult from '../../../public/images/cult.jpg';
import Tech from '../../../public/images/tech.jpg';
import {
    MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn
} from "mdbreact";
import {setCategory} from '../../actions/events';
import {Link} from 'react-router-dom';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            category: this.props.category,
            img: null,
        };
    }


    static propTypes = {
        setCategory: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.getImage();
    }

    getImage = () => {
        if (this.state.id === 0 || this.state.id === 2) {
            this.setState(() => ({img: Tech}));
        }
        else {
            this.setState(() => ({img: Cult}));
        }
    };

    _onClick = () => {
        this.props.setCategory(this.state.category);
    };
    render() {
        let {category, img} = this.state;
        return (
            <div className={"col-md-3"} style={{cursor: 'pointer'}} >
                {/* This div is for {this.props.category} Category. */}
                <Link to={`/events/${category}`} onClick={this._onClick}>
                    <MDBCol md="4">
                        <MDBCard className="mb-2">
                            <MDBCardImage className="img-fluid" src={img}/>
                            <MDBCardBody>
                                <MDBCardTitle>{this.props.category}</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and
                                    make up the bulk of the card's content.
                                </MDBCardText>
                                <MDBBtn color="primary">View Events</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </Link>
            </div>
        )
            ;
    }
}

export default connect(null, { setCategory })(Category);






    
