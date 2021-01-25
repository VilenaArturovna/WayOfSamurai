import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostsType} from "../../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

type PropsType = {
    posts: Array<PostsType>
    addPost: (newPostText: string) => void
}

function MyPosts(props: PropsType) {

    let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    let addNewPost = (values: FormDataType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={styles.postsBlock}>
            <h3>MyPosts</h3>
            <div>

                <AddPostFormRedux onSubmit={addNewPost}/>

                <div className={styles.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;

type FormDataType = {
    newPostText: string
}

const maxLength30 = maxLengthCreator(30)

function AddPostForm(props: InjectedFormProps<FormDataType>) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newPostText'} placeholder={'Enter your text'} validate={[requiredField, maxLength30]}/>
            </div>
            <button>Add post</button>
            <button>Remove</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm<FormDataType>({form: 'AddPostForm'})(AddPostForm)