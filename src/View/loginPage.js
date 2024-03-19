import React,{ useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    axios.defaults.withCredentials = true;

    const handleLogin = () => {
        axios.get(`http://localhost:3000/api/login?email=${email}&password=${password}`).then((res)=>{
           
            if(res.data.success === false) {
            messageApi.open({
                type: 'error',
                content: 'User Not Found! Please try again.',
              });
            }
            else {
                localStorage.setItem('username',res.data.message.name)
                localStorage.setItem('email',email)
                localStorage.setItem('password',password)
                localStorage.setItem('welcomePop', 'false')
                navigate( '/home')
            }
        })
    }

    const onChangedEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    //css
    const styles = {
        container : {
            height: '100vh',
            width: '100vw',
            backgroundColor: 'lightGrey',
            display: 'grid',
            gridAutoRows: 'max-content',
        },
        signup_container : {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'baseline'
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
            <div style={styles.titleStyle}>Welcome Back, Please login!</div>
            <div style={styles.formContainer}>
                <Form layout='vertical' variant='filled'>
                    {contextHolder}
                    <Form.Item style={styles.fontStyles} label="Email" name="email" rules={[{required : true, message: 'Please input email!'}]}>
                        <Input onChange={onChangedEmail}/>
                    </Form.Item>
                    <Form.Item style={styles.fontStyles} label="Password" name="password" rules={[{required: true, message: 'Please input password!'}]}>
                        <Input onChange={onChangePassword}/>
                    </Form.Item>
                    <div style={styles.signup_container}>
                        <div>Don't have account?</div>
                        <Button type='link' onClick={() => navigate('/sign')}>SignUp</Button>
                    </div>
                    <Button style={styles.loginButtonStyle} onClick={handleLogin} type="primary">Login</Button>
                </Form>
            </div>
        </div>
    );
};


export default LoginPage;