import { Link } from 'react-router-dom';

export function renderUser(teamId, user) {
    // console.log('Inside navigation', `/teams/${teamId}/users/${user.userId}`);
    return (
        <Link to={`/teams/${teamId}/users/${user.userId}`} >
            {user.firstName} {user.lastName}
        </Link>
    );
}