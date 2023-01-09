import { observer } from "mobx-react-lite/";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Segment, Button, FormField, Label, Header } from "semantic-ui-react";
import LoadingComponent from "../../../../App/Layout/LoadingComponent";
import { Account } from "../../../../App/Models/Account";
import { useStore } from "../../../../App/stores/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../../App/folder/form/MyTextInput";
import MySelectInput from "../../../../App/folder/form/MySelectInput";
import { categoryOptions } from "../../../../App/folder/form/CategoryOptions";
import { randomUUID } from "crypto";
import {v4 as uuid} from 'uuid';
import createAccount from "../../../../App/stores/accountStore";
import updateAccount from "../../../../App/stores/accountStore";


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
        name: Yup.string().required('The account name is required'),
        email: Yup.string().required(),
        address: Yup.string().required()
    }) 

    useEffect(() => {
        // account! er et hack for at undgå at erklære account med typen 'Account | undefined'
        if(id) loadAccount(id).then(account => setAccount(account!));
    }, [id, loadAccount])

    // function handleFormSubmit(account: Account)
    // {
    //     if(account.id.length == 0)
    //     {
    //         let newAccount = {
    //             ...account,
    //             id: uuid()
    //         };
    //         createAccount(newAccount).then(() => navigate(`/accounts/${newAccount.id}`))
    //     }else {
    //         updateAccount(account).then(() => navigate(`/accounts/${account.id}`))
    //     }
    // }
      

    if (loadingInitial) return <LoadingComponent content="Loading accounts ..." />

    return (
        <Segment clearing>
            <Header content='Account details' sub color="teal"/>
            <Formik
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={account} 
                // onSubmit={values => handleFormSubmit(values)} >
                onSubmit={values => console.log(values)} >
                {
                    ({handleSubmit, isValid, isSubmitting, dirty}) => (
                        <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                            {/* MyTextInput gør det muligt at genbruge validering af input-felter */}
                            <MyTextInput name="name" placeholder="name" />
                            <MyTextInput name="email" placeholder="email" />
                            <MyTextInput name="address" placeholder="address" />

                            <Header content='Location details' sub color="teal"/>
                            <MySelectInput options={categoryOptions} placeholder="options" name="options"/>
                            <Button 
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={loading} 
                                floated="right" 
                                positive type="submit" 
                                content="Submit" />
                            <Button as={Link} to='/accounts' floated="right" type="button" content="Cancel" />
                        </Form>
                    )
                }                
            </Formik>
        </Segment>
    )
})


