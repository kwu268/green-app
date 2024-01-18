const supabase = require('../supabaseClient')

const sendCreateUserRequest = async (email, password, display_name) => {
await supabase.auth.signUp(
        {
            email: email,
            password: password,
            options: {
            data: {
                display_name: display_name,
            }
            }
        }
    )
.then( (data) => {
    console.log(data)
})
.catch( error => {
    console.log(error)
})
} 


const sendSignInRequest = async (email, password) => {
await supabase.auth.signInWithPassword(
    {
        email: email,
        password: password,
        })
.then( (data) => {
console.log(data)
})
.catch( (error) => {
console.log(error)
})
}

module.exports = {sendCreateUserRequest, sendSignInRequest}