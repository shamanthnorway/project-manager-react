import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editTicket } from '../../actions';
import NavigationBar from '../navigation';

class EditTicket extends Component {
    renderBackPage(e) {
        e.preventDefault;
        this.props.history.goBack();
    }
    renderFieldText(field) {
        const { meta : { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type={field.input.name}
                    className="form-control"
                    {...field.input} />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    onCreateNewTicketSubmit(values) {
        var creator = {
            "userId" : this.props.user._id,
            "firstName" : this.props.user.firstName,
            "lastName" : this.props.user.lastName
        };
        var final = JSON.parse(JSON.stringify(this.props.ticket));
        final["updates"].push({
            "updatedBy":creator,
            "updateDescription": `An update was make by ${creator.firstName} ${creator.lastName} at ${new Date()}`
        });
        final.title = values.title;
        final.description = values.description;
        final.status = values.status;
        final.serverity = values.serverity;
        console.log(final);
        this.props.editTicket(final, (response) => {
            console.log(response);
            this.props.history.push(`/teams/${this.props.team._id}/tickets`);
        })
    }
    render() {
        // console.log(this.props);
        const { handleSubmit } = this.props;
        if(!this.props.user) return <div>Please login</div>;
        if(!this.props.ticket) return <div>Select a ticket</div>;
        // console.log(this.props.ticket);
        return (
            <div>
                <form onSubmit={ handleSubmit(this.onCreateNewTicketSubmit.bind(this)) } >
                    <Field 
                        label="Title"
                        name="title"
                        component={this.renderFieldText} />
                    <Field 
                        label="Description"
                        name="description"
                        component={this.renderFieldText} />
                    <Field 
                        label="Status"
                        name="status"
                        component={this.renderFieldText} />
                    <Field 
                        label="Severity"
                        name="serverity"
                        component={this.renderFieldText} />
                    <div className="btn-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                        <button className="btn btn-primary" type="back" onClick={(e) => {this.renderBackPage(e)}} >Back</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    if(!state) return null;
    // console.log(state);
    return {
        user: state.user.user,
        ticket: state.user.ticket,
        team: state.user.team,
        initialValues: {
            title: state.user.ticket.title,
            description: state.user.ticket.description,
            status: state.user.ticket.status,
            severity: state.user.ticket.serverity
        }
    }
}

export default connect(mapStateToProps, { editTicket })( reduxForm({
    form:'EditTicket',
    mapStateToProps
})(EditTicket));