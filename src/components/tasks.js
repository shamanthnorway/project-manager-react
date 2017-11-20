import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks } from '../actions';
import NavigationBar from './navigation';

class Tasks extends Component {
    componentDidMount() {
        const { teamID } = this.props.match.params;
        this.props.fetchTasks(teamID);  
    }
    getUsersList(users) {
        return users.map((user) => {
            // console.log(user.firstName, this.props.user.team._id);
            return(
                <div key={user.userId}>
                    <Link to={`/teams/${this.props.user.team._id}/users/${user.userId}`} >
                        {user.firstName} {user.lastName}<br/>
                    </Link>            
                </div>
            );
        });
    }
    renderTasksList() {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct','Nov', 'Dec'];
        return this.props.user.tasks.map((task)=> {
            var d = new Date(task.createdAt);
            var createdOn = `${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`;
            d = new Date(task.updatedAt);
            var updatedOn = `${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`;
            return (
                <tr key={task._id}>
                    <td>
                        <Link to={`/teams/${this.props.user.team._id}/tasks/${task._id}`} >
                            {task.title}
                        </Link>
                    </td>
                    <td>{this.getUsersList(task.users)}</td>
                    <td>{createdOn}</td>
                    <td>{updatedOn}</td>
                    <td>
                        <div className="progress">
                            <div 
                                className="progress-bar" 
                                role="progressbar" 
                                aria-valuenow="70"
                                aria-valuemin="0" 
                                aria-valuemax="100"  >
                                70%
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });
    }
    render() {
        if(!this.props.user.user) return <div>Please login</div>;
        if(!this.props.user.tasks) return <div>Loading Tasks</div>;
        else {
            // console.log(this.props);
            const { tasks } = this.props.user;
            return (
                <div  className="container">
                    <div className="jumbotron">
                        <h1>Tasks: {tasks.teamName}</h1>
                    </div>
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <div className="btn-group">
                            <Link to={`/teams/${this.props.user.team._id}/tasks/newTask`} >
                                <button type="button" className="btn btn-default">Add Task</button>
                            </Link>
                        </div> 
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task Description</th>
                                    <th>Users</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    <th className="col-sm-1">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTasksList()}
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
    // console.log(state);
    return {user: state.user}
}

export default connect(mapStateToProps, { fetchTasks })(Tasks);