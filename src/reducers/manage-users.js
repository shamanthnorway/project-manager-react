import { USER, FETCH_TEAMS, FETCH_TASKS, FETCH_TICKETS, FETCH_WIKIS, FETCH_TEAM, FETCH_TASK, FETCH_TICKET, FETCH_WIKI, FETCH_USER } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case USER: {
            // console.log('Inside reducer: ', action.payload);
            return  {...state, user: action.payload};
        };
        case FETCH_TEAMS: {
            // console.log('Inside reducer',action);
            return  {...state, teams: action.payload.data};
        }
        case FETCH_TASKS: {
            return  {...state, tasks: action.payload.data};
        }
        case FETCH_TICKETS: {
            return  {...state, tickets: action.payload.data};
        }
        case FETCH_WIKIS: {
            return  {...state, wikis: action.payload.data};
        }
        case FETCH_TEAM: {
            // console.log('Inside reducer',action);
            return  {...state, team: action.payload.data};
        }
        case FETCH_TASK: {
            // console.log('Inside reducer',action);
            return  {...state, task: action.payload.data};
        }
        case FETCH_TICKET: {
            // console.log('Inside reducer',action);
            return  {...state, ticket: action.payload.data};
        }
        case FETCH_WIKI: {
            // console.log('Inside reducer',action);
            return  {...state, wiki: action.payload.data};
        }
        case FETCH_USER: {
            // console.log('Inside reducer',action);
            return  {...state, userProfile: action.payload.data};
        }
        default: return state
    }
}