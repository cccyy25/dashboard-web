import {Form, Button, Input, message} from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleSignUp = async (values) => {
        console.log("value sign", values)
        await axios.post(`http://localhost:3000/api/add_user`, values).then((res) => {
            if(res.data.success === false){
                messageApi.open({
                    type: 'error',
                    content: res.data.message,
                })
            }else {
                messageApi.open({
                    type: 'success',
                    content: res.data.message,
                })

                navigate('/login')
            }
        })
    }

    const styles = {
        container : {
            height: '100vh',
            width: '100vw',
            backgroundColor: 'lightGrey',
            display: 'grid',
            gridAutoRows: 'max-content',
        },
        formContainer : {
            width: '50vw',
            height: 'max-content',
            padding: '40px 60px',
            backgroundColor: 'white',
            borderRadius:' 5px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        fontStyles: {
            fontSize: 'medium',
            fontWeight: '400',
        },
        loginButtonStyle: {
            padding: '8px 36px 8px 36px',
            marginTop: '10px',
            height: 'auto',
            fontSize: 'medium',
            fontWeight: '400',
            textAlign: 'center',
        },
        titleStyle: {
            margin: 'auto',
            fontSize:'x-large',
            fontWeight: '400',
            padding: '50px',
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.titleStyle}>Happy to have you join US!</div>
            <div style={styles.formContainer}>
                <Form form={form} layout='vertical' variant='filled' onFinish={handleSignUp}>
                    {contextHolder}
                    <Form.Item style={styles.fontStyles} label='Email' name='email' rules={[{required:true, type:'email', message:'Please enter valid email'}]}>
                    <Input /> 
                    </Form.Item>
                    <Form.Item style={styles.fontStyles} label ='Username' name='username' rules={[{required:true, message: 'Please enter valid username'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item style={styles.fontStyles} label='Password' name='password' rules={[{required: true, message: 'Please enter password'}]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item style={styles.fontStyles} label='Confirmed Password' name='cpassword' dependencies={['password']} 
                    // validate password with confirmed password
                        rules={[{required: true, message: 'Please confirm your password'}, ({getFieldValue}) => ({validator(_, value){
                            if(value && getFieldValue('password') === value){
                                return Promise.resolve();
                            }else{
                                return Promise.reject(new Error('The confirmed password is not match the password you entered!'))
                            }
                        }})]}>
                        <Input.Password  />
                    </Form.Item>
                    <Button style={styles.loginButtonStyle} type='primary' htmlType='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default SignUpPage