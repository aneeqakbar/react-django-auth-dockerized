import { loginUser } from 'api/auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import NormalButton from 'components/atoms/buttons/NormalButton'
import NormalInput from 'components/atoms/inputs/NormalInput'
import ErrorText from 'components/atoms/typography/ErrorText';
import { login, selectAuth } from 'features/auth/authSlice';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: values => {
      const errors: any = {};
      if (!values.username) {
        errors.username = 'Required';
      }

      if (!values.password) {
        errors.password = 'Required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      const res = await loginUser(values);
      if (res.status === 200) {
        dispatch(login(res.data))
      }
    },
  });

  useEffect(() => {
    if (authState.authenticated) {
      // window.location.pathname = "/";
      navigate("/");
    }
  }, [authState, navigate])

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-3xl font-bold text-white mb-4">Login Form</h1>

      <div className="my-2">
        <NormalInput
          label="Username"
          required
          {...formik.getFieldProps("username")}
          />
        {formik.touched.username && formik.errors.username ? (
          <ErrorText>{formik.errors.username}</ErrorText>
        ) : null}
      </div>
      <div className="my-2">
        <NormalInput
          label="Password"
          type="password"
          required
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorText>{formik.errors.password}</ErrorText>
        ) : null}
      </div>
      <div className="my-2">
        <NormalButton type="submit">
          Login
        </NormalButton>
      </div>
      <div className="my-2">
        <Link to="/register" className="text-blue-300">
          Register a new account
        </Link>
      </div>
    </form>
  )
}

export default LoginPage