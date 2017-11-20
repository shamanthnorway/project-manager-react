import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../actions';
import NavigationBar from '../navigation';
import _ from 'lodash';

class User extends Component {
    renderBackPage(e) {
        e.preventDefault;
        this.props.history.goBack();
    }
    componentDidMount() {
        // console.log('Inside view Task',this.props);
        const userID = this.props.match.params.userID;
        this.props.fetchUser(userID);
    }
    render() {
        if(!this.props.user.user) return <div>Please login</div>;
        if(!this.props.user.userProfile) return <div>Loading User Profile</div>;
        else {
            const { userProfile } = this.props.user;
            return (
                <div>
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <p>First Name: {userProfile.firstName}</p>
                        <p>Last Name: {userProfile.lastName}</p>
                        <p>Email Address: {userProfile.emailAddress}</p>
                        <button 
                        onClick={(e) => {this.renderBackPage(e)}}
                        type="button" 
                        className="btn btn-primary">Back</button>                        
                    </div>
                </div>
            );
        }
    }
}


function mapStateToProps(state) {
    if(!state) return null;
    // console.log('In User: ',state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUser })(User);