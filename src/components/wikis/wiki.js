import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWiki } from '../../actions';
import NavigationBar from '../navigation';
import DeleteItem from '../delete_item';
import _ from 'lodash';

class Wiki extends Component {
    componentDidMount() {
        // console.log('Inside view Task',this.props);
        const wikiID = this.props.match.params.wikiID;
        this.props.fetchWiki(wikiID);
    }
    deleteWiki(e) {
        e.preventDefault();
        console.log('Delete Button was clicked');
    }
    editWiki(e) {
        e.preventDefault();
        console.log('Edit Button was clicked');
    }
    render() {
        if(!this.props.user.user) return <div>Please login</div>;
        if(!this.props.user.wiki) return <div>Loading Tickets</div>;
        else {
            const { wiki } = this.props.user;
            return (
                <div>
                    <div className="col-sm-2">
                        <NavigationBar />
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>{wiki.title}</h2>  
                            </div>
                            <div className="col-sm-2">
                                <DeleteItem 
                                    teamID={this.props.match.params.teamID}
                                    item="wikis" 
                                    itemID={wiki._id} 
                                    historyPath={`/teams/${this.props.match.params.teamID}/wikis`} />
                            </div>
                        </div>
                        
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={(e) => this.editWiki(e)}>
                            Edit
                        </button>
                        <p>{wiki.body}</p>
                        <p>Created By: {wiki.createdBy.firstName} {wiki.createdBy.lastName}</p>                   
                        
                        <Link to={`/teams/${this.props.user.team._id}/wikis`} >
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
    // console.log('In Wiki: ',state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchWiki })(Wiki);