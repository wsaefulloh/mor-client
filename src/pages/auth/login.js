import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Layout as AuthLayout } from '../../layouts/auth/layout';
import axios from 'axios';
import { config } from '../../helpers/constant';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // await auth.signIn(values.email, values.password);
        setIsLoading(true)
        await axios.post(`${config.baseURL}/api/serve-data/login
        `, {
          email: values.email,
          password: values.password,
        }).then((res) => {
          if (res.data.data[0].name === "Admin") {
            localStorage.setItem("auth", true)
            localStorage.setItem("role", res.data.data[0].name)
            localStorage.setItem("user_id", res.data.data[0].user_id)
            localStorage.setItem("token", res.data.token)
            router.push('/account');
          } else {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: "Anda bukan Admin" });
            helpers.setSubmitting(false);
          }
        }).catch((err) => {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Login gagal" });
          helpers.setSubmitting(false);
          setIsLoading(false)
        })
        // router.push('/account');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h5">
                Login
              </Typography>
            </Stack>

            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  focused
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  focused
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{
                  mt: 3, '&:hover': {
                    backgroundColor: '#122647',
                    color: '#ffffff',
                  },
                }}
                type="submit"
                variant="contained"
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "30px", height: "30px", color: "#FFFFFF" }} color="secondary" />
                ) : (
                  <>
                    Continue
                  </>
                )}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
