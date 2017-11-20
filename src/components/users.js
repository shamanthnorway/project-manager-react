import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationBar from './navigation';

class Users extends Component {
    renderUsersList() {
        return this.props.user.team.users.map((user)=> {
            return (
                <li key={user._id}>
                    <Link to={`/teams/${this.props.user.team._id}/users/${user._id}`} >
                    {user.firstName} {user.lastName}
                    </Link>
                </li>
            );
        });
    }
    render() {
        if(!this.props.user.user) return <div>Please login</div>;
        if(!this.props.user.team) return <div>Loading User</div>;
        else {
            const { team } = this.props.user;
            return (
                <div  className="container">
                    <div className="jumbotron">
                        <h1>Users: {team.teamName}</h1>
                    </div>
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <button type="button" className="btn btn-default">Add User</button>
                        <ul className="list-group">
                            {this.renderUsersList()}
                        </ul>                   
                    </div>
                </div>
            );
        }        
    }
}

function mapStateToProps(state) {
    if(!state) return null;
    // console.log(state);
    return {user: state.user}
}

export default connect(mapStateToProps, null)(Users);