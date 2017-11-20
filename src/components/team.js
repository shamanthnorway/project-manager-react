import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTeam } from '../actions';
import NavigationBar from './navigation';

class Team extends Component {
    componentDidMount() {
        const { teamID } = this.props.match.params;
        this.props.fetchTeam(teamID);  
    }
    render() {
        if(!this.props.user.user) return <div>Please login</div>;
        if(!this.props.user.team) return <div>Loading Team</div>;
        else {
            const { user } = this.props.user;
            const { team } = this.props.user;
            return (
                <div  className="container">
                    <div className="jumbotron"><h1>{team.teamName}</h1></div>
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Views</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <Link to={`/teams/${team._id}/tasks`} >
                                            Tasks
                                        </Link>
                                    </th>
                                    <th>View all the tasks</th>
                                </tr>
                                <tr>
                                    <th>
                                        <Link to={`/teams/${team._id}/tickets`} >
                                            Tickets
                                        </Link>
                                    </th>
                                    <th>View all the tickets</th>
                                </tr>
                                <tr>
                                    <th>
                                        <Link to={`/teams/${team._id}/wikis`} >
                                            Wikis
                                        </Link>
                                    </th>
                                    <th>
                                    View all the Wikis
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <Link to={`/teams/${team._id}/users`} >
                                            Manager User
                                        </Link>
                                    </th>
                                    <th>
                                    Manager Users
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <Link to={`/teams`} >
                                            Teams List
                                        </Link>
                                    </th>
                                    <th>Go back to view all your teams</th>
                                </tr>
                            </tbody>
                        </table>  
                    </div>
                </div>
            );
        }        
    }
}

function mapStateToProps(state) {
    if(!state) return null;
    console.log(state);
    return {user: state.user}
}

export default connect(mapStateToProps, { fetchTeam })(Team);