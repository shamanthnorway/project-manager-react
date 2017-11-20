import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTicket, closeTicket } from '../../actions';
import { renderUser } from '../../navigation';
import NavigationBar from '../navigation';
import DeleteItem from '../delete_item';
import _ from 'lodash';

class Ticket extends Component {
    componentDidMount() {
        // console.log('Inside view Task',this.props);
        const ticketID = this.props.match.params.ticketID;
        this.props.fetchTicket(ticketID);
    }

    closeTicket(event) {
        event.preventDefault();
        var closeTicket = JSON.parse(JSON.stringify(this.props.ticket));
        closeTicket.resolvedBy = this.props.user._id;
        closeTicket.updates = [];
        _.map(this.props.ticket.updates, update => {
            closeTicket.updates.push(update);
        });
        var newUpdate = {
            updatedBy: this.props.user._id,
            updateDescription: `Ticket was resolved by ${this.props.user.firstName} ${this.props.user.firstName} at ${new Date()}`
        }
        closeTicket.updates.push(newUpdate);
        this.props.closeTicket(closeTicket, (e) => {
            console.log('Ticket is closed');
        });
    }

    renderUserList() { 
        // console.log('Inside renderUserList',this.props);       
        const { tickets } = this.props.user;
        return tickets.users.map((user) => {
            <div>{this.props.renderUser(this.props.user.team._id, user)}</div>
        });
    };

    renderUpdates() {
        // console.log('Inside renderUpdates',this.props);
        // <td>{update.updatedBy.firstName} {update.updatedBy.lastName}</td>
        return _.map(this.props.user.ticket.updates, update => {
            return (
                <tr key={update._id}>
                    <td>{this.props.renderUser(this.props.user.team._id, update.updatedBy)}</td>
                    <td>{update.updateDescription}</td>
                    <td>{update.timestamps}</td>
            </tr>
            );
        });
    }
    getResolvedBy() {
        
            // {/* <h3>Resolved By: {ticket.resolvedBy.firstName} {ticket.resolvedBy.lastName}<br/></h3>*/}
        const { ticket } = this.props.user;
        if(ticket.resolvedBy) {
            return (
                <h3>Resolved By: {this.props.renderUser(this.props.user.team._id, ticket.resolvedBy)}</h3>
            );
        } else {
            return <div></div>;
        }
    }
    render() {
        if(!this.props.user) return <div>Please login</div>;
        if(!this.props.user.ticket) return <div>Loading Ticket</div>;
        else {
            /* <h3>Created By: {ticket.createBy.firstName} {ticket.createBy.firstName}</h3> */
            const { ticket } = this.props.user;
            return (
                <div  className="container">
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <h2>{ticket.title}<span className="badge badge-secondary">{ticket.serverity}</span></h2>
                        
                        <h3>Description: </h3>
                        <p>{ticket.description}</p>
                        {this.getResolvedBy()}
                        <h3>Created By: {this.props.renderUser(this.props.user.team._id, ticket.createBy)}</h3>
                        <h3>Serverity: {ticket.serverity}</h3>
                        <DeleteItem 
                            teamID={this.props.match.params.teamID}
                            item="tickets" 
                            itemID={ticket._id} 
                            historyPath={`/teams/${this.props.match.params.teamID}/tickets`} />
                        <table className="table">
                            <tbody>
                                {this.renderUpdates()}
                            </tbody>
                        </table>                        
                        <Link to={`/teams/${this.props.user.team._id}/tickets`} >
                            <button type="button" className="btn btn-primary">Back</button>
                        </Link>                          
                        <Link to={`/teams/${this.props.user.team._id}/tickets/${ticket._id}/editTicket`} >
                            <button type="button" className="btn btn-primary">Edit</button>
                        </Link>                       
                        <Link to={`/teams/${this.props.user.team._id}/tickets`} >
                            <button type="button" className="btn btn-primary" onClick={(e) => this.closeTicket(e)}>Close Ticket</button>
                        </Link>                        
                    </div>
                </div>
            );
        }  
    }
}

function mapStateToProps(state) {
    if(!state) return null;
    // console.log('In ticket: ',state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchTicket, closeTicket, renderUser })(Ticket);