export function getUsername(): string | null {
    let username: string | null = localStorage.getItem('username');
    if (!username)
        return null
    return username;
}

export function getUserId(): string | null {
    let userId: string | null = localStorage.getItem('userId');
    if (!userId)
        return null
    return userId;
}