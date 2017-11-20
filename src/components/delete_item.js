import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { deleteItem } from '../actions';

class DeleteItem extends Component {
    deleteItem(event) {
        event.preventDefault;
        // console.log('Submit button was clicked!', this.props);
        const itemID = this.props.itemID;
        const teamID = this.props.teamID;
        const item = this.props.item;
        this.props.deleteItem(item , teamID, itemID, (response) => {
            console.log(response);
            this.props.history.push(this.props.historyPath);
        });        
    }
    render() {
        // console.log(this.props);
        return (
            <div className="container">
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    data-toggle="modal" 
                    data-target="#myModal" >
                    <span className="glyphicon glyphicon-trash"></span> Delete Task 
                </button>

                <div id="myModal" className="modal" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Delete Task</h4>
                            </div>
                            <div className="modal-body">
                                <p>Please press the "Confirm" button to confirm {this.props.item} delete.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-danger" data-dismiss="modal" onClick={(event) => this.deleteItem(event)}>Confirm</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, { deleteItem })(DeleteItem));
// export default withRouter(MyComponent);
// export default connect(null, { deleteItem })(DeleteItem);