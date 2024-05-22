export const signIn = async (req, username) => {
    const response = await req.get('/api/auth/csrf')

    return await req.post('/api/auth/callback/credentials')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(`csrfToken=${response.body.csrfToken}&username=${username}`)
}

export const signOut = async (req) => {
    const response = await req.get('/api/auth/csrf')

    return await req.post('/api/auth/signout')
        .set('Content-Type', 'application/json')
        .send({csrfToken: response.body.csrfToken, json: "true"})
}