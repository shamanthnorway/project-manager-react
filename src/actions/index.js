import axios from 'axios';

export const LOGIN = 'login';
export const USER = 'user';
export const SIGN_UP = 'sign_up';
export const FETCH_TEAMS = 'fetch_teams';
export const FETCH_TASKS = 'fetch_tasks';
export const FETCH_TICKETS = 'fetch_tickets';
export const FETCH_WIKIS = 'fetch_wikis';
export const FETCH_WIKI = 'fetch_wiki';
export const FETCH_TEAM = 'fetch_team';
export const FETCH_TASK = 'fetch_task';
export const FETCH_USER = 'fetch_user';
export const FETCH_TICKET = 'fetch_ticket';
export const CREATE_NEW_TASK = 'post_new_task';
export const CREATE_NEW_TICKET = 'post_new_ticket';
export const CREATE_NEW_WIKI = 'post_new_wiki';
export const UPDATE_TICKET = 'update_ticket';
export const DELETE_ITEM = 'delete_item';
export const EDIT_TASK = 'edit_task';
export const EDIT_TICKET = 'edit_ticket';

const ROOT_URL = 'http://localhost:3001';

export function login(user, callback) {
    const request = axios.post(`${ROOT_URL}/login`, user)
    .then((response) => callback(response))
    .catch((error) => callback(error));

    return {
        type: LOGIN,
        payload: request
    }
}

export function signup(user, callback) {
    const request = axios.post(`${ROOT_URL}/signup`, user)
    .then((response) => callback(response))
    .catch((error) => callback(error));

    return {
        type: SIGN_UP,
        payload: request
    }
}

export function postTask(task, callback) {
    const request = axios.post(`${ROOT_URL}/tasks`, task)
    .then((response) => callback(response))
    .catch((error) => callback(error));

    return {
        type: CREATE_NEW_TASK,
        payload: request
    }
}

export function postTicket(ticket, callback) {
    const request = axios.post(`${ROOT_URL}/tickets`, ticket)
    .then((response) => callback(response))
    .catch((error) => callback(error));

    return {
        type: CREATE_NEW_TICKET,
        payload: request
    }
}

export function postWiki(wiki, callback) {
    const request = axios.post(`${ROOT_URL}/wikis`, wiki)
    .then((response) => callback(response))
    .catch((error) => callback(error));

    return {
        type: CREATE_NEW_WIKI,
        payload: request
    }
}

export function setUser(user) {
    // console.log('Inside actions: ', user);
    return {
        type: USER,
        payload: user
    }
}

export function fetchTeams(userID, callback) {
    // console.log('In actions',userID);
    // console.log(`GET/ ${ROOT_URL}/${userID}`)
    const request = axios.get(`${ROOT_URL}/${userID}`);
    return {
        type: FETCH_TEAMS,
        payload: request
    }
}

export function fetchTasks(teamID) {
    // console.log('In actions',userID);
    // console.log(`GET/ ${ROOT_URL}/${userID}`)
    const request = axios.get(`${ROOT_URL}/teams/${teamID}/getTasks`);
    return {
        type: FETCH_TASKS,
        payload: request
    }
}

export function fetchTickets(teamID) {
    // console.log('In actions',userID);
    // console.log(`GET/ ${ROOT_URL}/${userID}`)
    const request = axios.get(`${ROOT_URL}/teams/${teamID}/getTickets`);
    return {
        type: FETCH_TICKETS,
        payload: request
    }
}

export function fetchWikis(teamID) {
    // console.log('In actions',userID);
    // console.log(`GET/ ${ROOT_URL}/${userID}`)
    const request = axios.get(`${ROOT_URL}/teams/${teamID}/getWikis`);
    return {
        type: FETCH_WIKIS,
        payload: request
    }
}

export function fetchTeam(teamID) {
    // console.log('In actions',userID);
    // console.log(`GET/ ${ROOT_URL}/${userID}`)
    const request = axios.get(`${ROOT_URL}/teams/${teamID}`);
    return {
        type: FETCH_TEAM,
        payload: request
    }
}

export function fetchTask(taskID) {
    const request = axios.get(`${ROOT_URL}/tasks/${taskID}`);
    return {
        type: FETCH_TASK,
        payload: request
    }
}

export function fetchTicket(ticketID) {
    const request = axios.get(`${ROOT_URL}/tickets/${ticketID}`);
    return {
        type: FETCH_TICKET,
        payload: request
    }
}

export function closeTicket(ticket) {
    // console.log(ticket);
    const request = axios.post(`${ROOT_URL}/tickets/${ticket._id}`, ticket)
    .then((response) => callback(response))
    .catch((error) => callback(error));

    return {
        type: UPDATE_TICKET,
        payload: request
    }
}

export function fetchWiki(wikiID) {
    const request = axios.get(`${ROOT_URL}/wikis/${wikiID}`);
    return {
        type: FETCH_WIKI,
        payload: request
    }
}

export function fetchUser(userID) {
    const request = axios.get(`${ROOT_URL}/users/${userID}/getUserProfile`);
    return {
        type: FETCH_USER,
        payload: request
    }
}

export function deleteItem(item, teamID, itemID, callback) {
    const data = {
        data: {
            "_id" : itemID,
            "teamId": teamID
        }
    }
    const request = axios.delete(`${ROOT_URL}/${item}/${itemID}`,data)
    .then((response) => callback(response))
    .catch((error) => callback(error));
    return {
        type: DELETE_ITEM,
        payload: request
    }
}

export function editTask(task, callback) {
    // console.log(task)
    const request = axios.put(`${ROOT_URL}/tasks/${task._id}`, task)
    .then((response) => callback(response))
    .catch((error) => callback(error));
    return {
        type: EDIT_TASK,
        payload: request
    }
}

export function editTicket(ticket, callback) {
    console.log(ticket)
    const request = axios.put(`${ROOT_URL}/tickets/${ticket._id}`, ticket)
    .then((response) => callback(response))
    .catch((error) => callback(error));
    return {
        type: EDIT_TICKET,
        payload: request
    }
}