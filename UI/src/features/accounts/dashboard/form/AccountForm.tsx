import { observer } from "mobx-react-lite/";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Segment, Button, FormField, Label } from "semantic-ui-react";
import LoadingComponent from "../../../../App/Layout/LoadingComponent";
import { Account } from "../../../../App/Models/Account";
import { useStore } from "../../../../App/stores/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';


// makes oberserver because we wanna track 'loading' from accountStore
export default observer(function AccountForm(){
    const {accountStore} = useStore();
    const {loading, loadAccount, loadingInitial} = accountStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState<Account>({
        id: '',
        name: '',
        email: '',
        address: '',
        password: '',
    })

    const validationSchema = Yup.object({
        name: Yup.string().required('The account name is required')
    }) 

    useEffect(() => {
        // account! er et hack for at undgå at erklære account med typen 'Account | undefined'
        if(id) loadAccount(id).then(account => setAccount(account!));
    }, [id, loadAccount])

    // function handleSubmit(){
    //     console.log("handleSubmit: " + account.id)
    //     if(!account.id){
    //         account.id = uuid();
    //         createAccount(account).then(() => navigate(`/accounts/${account.id}`))
    //     }else {
    //         updateAccount(account).then(() => navigate(`/accounts/${account.id}`));
    //     }
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     // Make sure name is refering to variable 'name' above not 'name' below
    //     setAccount({...account, [name]: value});
    // }

    if (loadingInitial) return <LoadingComponent content="Loading accounts ..." />

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={account} 
                onSubmit={values => console.log(values)} >
                {
                    ({handleSubmit}) => (
                        <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                            <FormField>
                                <Field placeholder="name" name='name' />
                                <ErrorMessage name="name" 
                                    render={error => <Label basic color='red' content={error}/>}/>
                            </FormField>
                            <Field placeholder="email" name='email' />
                            <Field placeholder="address" name='address' />
                            <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                            <Button as={Link} to='/accounts' floated="right" type="button" content="Cancel" />
                        </Form>
                    )
                }                
            </Formik>
        </Segment>
    )
})


