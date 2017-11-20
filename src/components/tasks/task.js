import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTask } from '../../actions';
import NavigationBar from '../navigation';
import DeleteItem from '../delete_item';

class Task extends Component {
    componentDidMount() {
        // console.log('Inside view Task',this.props);
        const taskID = this.props.match.params.taskID;
        this.props.fetchTask(taskID);
    }

    renderUserList() { 
        // console.log('Inside renderUserList',this.props);       
        const { task } = this.props.user;
        return task.users.map((user) => {
            <div>{this.renderUser(user)}</div>
        });        
    };

    renderUser(user) {
        if(user) {
            return (
                <Link to={`/teams/${this.props.user.team._id}/users/${user.userId}`} >
                    {user.firstName} {user.lastName} 
                </Link>
            );
        } else {
            return <div />;
        }
        
    }

    renderUpdates() {
        // console.log('Inside renderUpdates',this.props);
        if(this.props.user.task.updates) {
            return this.props.user.task.updates.map((update) => {
                return (
                    <tr key={update._id}>
                        <td>{this.renderUser(update.updatedBy)}</td>
                        <td>{update.updateDescription}</td>
                        <td>{update.timestamps}</td>
                    </tr>
                );
            });
        } else {
            return <div />;
        }
        
    }
    render() {
        // console.log('Inside view Task',this.props);
        if(!this.props.user) return <div>Please login</div>;
        if(!this.props.user.task) return <div>Loading Task</div>;
        else {
            const { task } = this.props.user;
            return (
                <div  className="container">
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <h2>{task.title}<span className="badge badge-secondary">{task.status}</span></h2>
                        <h4>Created By: {task.createdBy.firstName} {task.createdBy.firstName}</h4>
                        <h4>Assigned To: {this.renderUserList()}</h4>
                        <h4>Status: {task.status}</h4>
                        <h4>Description: </h4>
                        <p>{task.description}</p>
                        <DeleteItem 
                            item="tasks" 
                            teamID={this.props.match.params.teamID}
                            itemID={task._id} 
                            historyPath={`/teams/${this.props.match.params.teamID}/tasks`} />
                        <table className="table">
                            <tbody>
                                {this.renderUpdates()}
                            </tbody>
                        </table>                        
                        <Link to={`/teams/${this.props.match.params.teamID}/tasks/${task._id}/editTask`} >
                            <button type="button" className="btn btn-primary">Edit</button>
                        </Link>                        
                        <Link to={`/teams/${this.props.match.params.teamID}/tasks`} >
                            <button type="button" className="btn btn-primary">Back</button>
                        </Link>                        
                    </div>
                </div>
            );
        }        
    }
}

function mapStateToProps(state) {
    if(!state) return null;
    // console.log('In Task',state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchTask })(Task);