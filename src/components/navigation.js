import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavigationBar extends Component {
    render() {
        if(!this.props.user.user) return <div>Please login</div>;
        if(!this.props.user.team) return <div>Loading Team</div>;
        else {
            const { team } = this.props.user;
            // console.log('Inside Navigation: ',team);
            return (
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to={`/teams/${team._id}/tasks`} >
                            Tasks
                        </Link></li>
                    <li className="list-group-item">
                        <Link to={`/teams/${team._id}/tickets`} >
                            Tickets
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/teams/${team._id}/wikis`} >
                            Wikis
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/teams/${team._id}/users`} >
                            Manager User
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/teams`} >
                            Teams List
                        </Link>
                    </li>
                </ul>
            );
        }
    }
}

function mapStateToProps(state) {
    if(!state) return null;
    // console.log(state);
    return {user: state.user}
}

export default connect(mapStateToProps, null)(NavigationBar);