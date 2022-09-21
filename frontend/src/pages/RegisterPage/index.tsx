import { loginUser, registerUser } from 'api/auth';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError } from 'axios';
import NormalButton from 'components/atoms/buttons/NormalButton'
import NormalInput from 'components/atoms/inputs/NormalInput'
import ErrorText from 'components/atoms/typography/ErrorText';
import { login, selectAuth } from 'features/auth/authSlice';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password1: '',
      password2: '',
    },
    validate: values => {
      const errors: any = {};

      if (values.password1 !== values.password2) {
        errors.password2 = 'Passwords does not match';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await registerUser(values);
        if (res.status === 201) {
          dispatch(login(res.data))
        }
      } catch (error: any) {
        console.log(error.response.data)
        if (error.response.status === 403) {
          const errors = error.response.data;
          for (const key in error.response.data) {
            const element = errors[key];
            formik.setFieldError(key, element)
          }
        }
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
      <h1 className="text-3xl font-bold text-white mb-4">Register Form</h1>

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
          label="Email"
          type="email"
          required
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorText>{formik.errors.email}</ErrorText>
        ) : null}
      </div>
      <div className="my-2">
        <NormalInput
          label="Password"
          type="password"
          required
          {...formik.getFieldProps("password1")}
        />
        {formik.touched.password1 && formik.errors.password1 ? (
          <ErrorText>{formik.errors.password1}</ErrorText>
        ) : null}
      </div>
      <div className="my-2">
        <NormalInput
          label="Retype Password"
          type="password"
          required
          {...formik.getFieldProps("password2")}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <ErrorText>{formik.errors.password2}</ErrorText>
        ) : null}
      </div>

      <div className="my-2">
        <NormalButton type="submit">
          Register
        </NormalButton>
      </div>
    </form>
  )
}

export default RegisterPage