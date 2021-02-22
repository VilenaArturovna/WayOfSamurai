import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {RootStateType} from "../../redux/store";

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    error?: string
}

type PropsType = {
    login: (data: FormDataType ) => void
    isAuth: boolean
}

function Login(props: PropsType) {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}


function LoginForm (props: InjectedFormProps<FormDataType>) {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} placeholder={'E-mail'} validate={[requiredField]}/>
            </div>
            <div>
                <Field component={Input} name={'password'} placeholder={'Password'} type={'password'} validate={[requiredField]}/>
            </div>
            <div>

                {props.error && <div>{props.error}</div>}
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'Login'
})(LoginForm)

export default connect(mapStateToProps, {login})(Login)