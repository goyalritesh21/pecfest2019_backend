import React, {Component} from 'react';
import Category from '../events/Category';
import EventInfo from '../events/EventInfo';

const events = ['Technical', 'Cultural', 'Lectures', 'Workshops'];

class Events extends Component {

    render() {
        return (
            <div className={"row overlay-2"}>
                {/*{*/}
                {/*events.map((event, index) => (*/}
                {/*<Category key={index} category={event} id={index}/>*/}
                {/*))*/}
                {/*}*/}
                <EventInfo startDate={new Date(2019, 5, 11)} name="hello"/>
            </div>
        );
    }
}

export default Events;