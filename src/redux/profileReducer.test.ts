import {addPost, deletePost, profileReducer} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'My name is...', likesCount: 25},
        {id: 2, message: 'Boo', likesCount: 209},
        {id: 2, message: 'Bla-bla', likesCount: 5},
    ],

    profile: {
        aboutMe: "sdfsdfsdf",
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: "AlexanderKhodaryonok",
        userId: 3,
        photos: {
            small: null,
            large: null
        }
    },
    status: ''
}

it('length of posts should be incremented', () => {

    let action = addPost('ho-ho-ho')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
})

it('message of new post should be correct', () => {

    let action = addPost('ho-ho-ho')

    let newState = profileReducer(state, action)

    expect(newState.posts[4].message).toBe('ho-ho-ho')
})

it('after deleting length of posts should be decremented', () => {

    let action = deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it('after deleting length of posts should not be decremented, if id is incorrect', () => {

    let action = deletePost(1000)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})