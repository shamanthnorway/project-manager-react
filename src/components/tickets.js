import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTickets } from '../actions';
import NavigationBar from './navigation';
import { renderUser } from '../navigation';

class Tickets extends Component {
    componentDidMount() {
        const { teamID } = this.props.match.params;
        this.props.fetchTickets(teamID);  
    }
    renderTicketsList() {
        return this.props.user.tickets.map((ticket)=> {
            return (
                <tr key={ticket._id}>
                    <td>
                        <Link to={`/teams/${this.props.user.team._id}/tickets/${ticket._id}`} >
                            {ticket.title}
                        </Link>
                    </td>
                    <td>{this.props.renderUser(this.props.user.team._id, ticket.createBy)}</td>
                    <td>{ticket.createdAt}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.serverity}</td>
                </tr>
            );
        });
    }
    render() {
        if(!this.props.user.user) return <div>Please login</div>;
        if(!this.props.user.tickets) return <div>Loading Tickets</div>;
        else {
            const { tickets } = this.props.user;
            return (
                <div  className="container">
                    <div className="jumbotron">
                        <h1>Tickets: {this.props.user.team.teamName}</h1>
                    </div>
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <div className="btn-group">
                            <Link to={`/teams/${this.props.user.team._id}/tickets/newTicket`} >
                                <button type="button" className="btn btn-default">Add Ticket</button>
                            </Link>
                        </div> 
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ticket Description</th>
                                    <th>Created By</th>
                                    <th>Created On</th>
                                    <th>Status</th>
                                    <th>Severity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTicketsList()}
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
    return {
        user: state.user,
        tickets: state.user.ticket
    }
}

export default connect(mapStateToProps, { fetchTickets, renderUser })(Tickets);