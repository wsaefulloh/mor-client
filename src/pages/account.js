import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { AccountProfileDetails } from '../sections/account/account-profile-details';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { config } from '../helpers/constant';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

const Page = () => {
  const [detailUser, setDetailUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    setIsLoading(true)
    await axios.get(`${config.baseURL}/api/users/${localStorage.getItem("user_id")}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then((res) => {
      setDetailUser(res.data)
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 401) {
        router.push('/auth/login');
        localStorage.clear();
      }
      // // console.log(err)
    })
    setIsLoading(false)
  };

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      router.push('/auth/login');
      localStorage.clear();
    }
    getUser()
  }, [])

  return (
    <>
      <Head>
        <title>
          Account | MOR Application
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        {isLoading ? (
          <>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "120px" }}>
              <CircularProgress style={{ color: "#122647", width: "40px" }} />
            </div>
          </>
        ) : (
          <>
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <div>
                  <Typography variant="h5"
                    sx={{ mb: 1 }}>
                    Account
                  </Typography>
                  <Typography variant="h7">
                    Welcome, {`${detailUser?.name}`}
                  </Typography>
                </div>
                <div>
                  <Grid
                    container
                    spacing={3}
                    sx={{ mb: 3 }}
                  >
                    <Grid
                      xs={12}
                      md={12}
                      lg={12}
                    >
                      <AccountProfileDetails name={detailUser?.name}
                        nrp={detailUser?.nrp ?? "-"} />
                    </Grid>
                  </Grid>
                </div>
              </Stack>
            </Container>
          </>
        )}

      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
