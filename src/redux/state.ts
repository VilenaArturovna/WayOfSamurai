

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
export type PostsPageType = {
    posts: Array<PostsType>
}

export type RootStateType = {
    postsPage: PostsPageType
    dialogsPage: DialogsPageType
}

let state: RootStateType = {
    postsPage: {
        posts: [
            {id: 1, message: 'Hello', likesCount: 12},
            {id: 2, message: 'My name is...', likesCount: 25},
            {id: 2, message: 'Boo', likesCount: 209},
            {id: 2, message: 'Bla-bla', likesCount: 5},
        ],
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Anna'},
            {id: 2, name: 'Helena'},
            {id: 3, name: 'Kate'},
            {id: 4, name: 'Svetlana'},
            {id: 5, name: 'Natalie'}
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'I\'m fine'},
        ],
    }
};

export let addPost = (postMessage: string) => {
    let newPost: PostsType = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };
    state.postsPage.posts.push(newPost);

}

export default state;