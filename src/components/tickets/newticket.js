import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postTicket } from '../../actions';
import NavigationBar from '../navigation';

class NewTask extends Component {
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
    onCreateNewTaskSubmit(values) {
        var creator = {
            "userId" : this.props.user._id,
            "firstName" : this.props.user.firstName,
            "lastName" : this.props.user.lastName
        };
        values["updates"] = {
            "updatedBy":creator,
            "updateDescription": `Task created at ${new Date()}`
        };
        values["teamId"] = this.props.team._id;
        values["createBy"] = creator;
        // console.log(values);
        this.props.postTicket(values, (response) => {
            // console.log(response);
            this.props.history.push(`/teams/${this.props.team._id}/tickets`);
        })
    }
    render() {
        // console.log(this.props);
        const { handleSubmit } = this.props;
        if(!this.props.user) return <div>Please login</div>;
        if(!this.props.team) return <div>Select a team</div>;
        return (
            <div>
                <form onSubmit={ handleSubmit(this.onCreateNewTaskSubmit.bind(this)) } >
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
                        name="severity"
                        component={this.renderFieldText} />
                    <div class="btn-group">
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
        team: state.user.team
    }
}

export default reduxForm({
    form:'PostsNewForm'
})(
    connect(mapStateToProps, { postTicket })(NewTask)
);