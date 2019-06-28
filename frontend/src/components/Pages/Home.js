import React, {Component} from 'react';

class Home extends Component {

    render() {
        return (
            <div>

                <svg id={"pecfestTitle"} viewBox="0 0 600 150">
                    <symbol id="s-text">
                        <text textAnchor="middle" x={"50%"} y={"30%"} dy={".35em"}>PECFEST' 19</text>
                    </symbol>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                </svg>

            </div>
        );
    }
}

export default Home;