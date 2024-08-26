import {
  Form
} from 'react-router-dom'

export default function AuthForm({userAction}){
  return (
  <Form method='post' action=''>
    <input name='username' />
    <input name='password' type='password' />
    { userAction === 'signup' && <input name='password-confirmation' type='password' /> }
    <button type='submit'>
      { userAction }
    </button>
  </Form>
  )
}