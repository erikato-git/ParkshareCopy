import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../App/folder/form/MyTextInput";
import { store } from "../../App/stores/store"
import UserStore from "../../App/stores/UserStore";

// always make a class observable when it access resources from store
export default observer(function LoginForm(){
    const {user} = new UserStore();

    return (
        // setError is method we get from Formik to handle error-msg we get from user.login
        <Formik 
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => user.login(values).catch(error => setErrors({error: "invalid email or password"}))}    
        >
            {
                ({handleSubmit, isSubmitting, errors}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="email" name="email"/>
                        <MyTextInput placeholder="password" name="password" type="password"/>
                        <ErrorMessage
                            name='error' render={() => <Label basic color='red' content={errors.error}/>}
                        />
                        <Button loading={isSubmitting} positive content="Login" type="submit" fluid/>
                    </Form>
                )
            }

        </Formik>

        // When we use the form we should se a loading-spinner and it will return the dto of the login-user with its token
    )
})