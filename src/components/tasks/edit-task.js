import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editTask } from '../../actions';
import NavigationBar from '../navigation';

class EditTask extends Component {
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
        var final = JSON.parse(JSON.stringify(this.props.task));
        final["updates"].push({
            "updatedBy":creator,
            "updateDescription": `An update was make by ${creator.firstName} ${creator.lastName} at ${new Date()}`
        });
        final.title = values.title;
        final.description = values.description;
        final.status = values.status;
        console.log(final);
        this.props.editTask(final, (response) => {
            console.log(response);
            this.props.history.push(`/teams/${this.props.team._id}/tasks`);
        })
    }
    render() {
        // console.log(this.props);
        const { handleSubmit } = this.props;
        if(!this.props.user) return <div>Please login</div>;
        if(!this.props.task) return <div>Select a task</div>;
        // console.log(this.props.task);
        return (
            <div>
                <form onSubmit={ handleSubmit(this.onCreateNewTaskSubmit.bind(this)) } >
                    <Field 
                        label="Title"
                        name="title"
                        value={this.props.task.title}
                        component={this.renderFieldText} />
                    <Field 
                        label="Description"
                        name="description"
                        value={this.props.task.description}
                        component={this.renderFieldText} />
                    <Field 
                        label="Status"
                        name="status"
                        value={this.props.task.status}
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
        task: state.user.task,
        team: state.user.team,
        initialValues: {
            title: state.user.task.title,
            description: state.user.task.description,
            status: state.user.task.status
        }
    }
}

export default connect(mapStateToProps, { editTask })( reduxForm({
    form:'EditTask',
    mapStateToProps
})(EditTask));