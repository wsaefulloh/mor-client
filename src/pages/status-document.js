import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import axios from 'axios';
import { useEffect } from 'react';
import { getTingkatKehadiranCalculate } from '../helpers/calculate-tingkat-kehadiran'
import { config } from '../helpers/constant';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { ImportTable } from '../sections/table/import-table';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataResult, setDataResult] = useState([]);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    search: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
      setPage(0)
    },
    []
  );

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const getStatusDocuments = async (page, size, search_name) => {
    setIsLoading(true)
    await axios.get(`${config.baseURL}/api/serve-data/status-import?page=${Number(page) + 1}&size=${size}&search_name=${search_name}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then((res) => {
      setDataResult(res.data.data.data)
      setCount(res.data.data.data.itemCount)
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 401) {
        router.push('/auth/login');
        localStorage.clear();
      }
      // console.log(err)
    })
    setIsLoading(false)
  };

  useEffect(() => {
    getStatusDocuments(page, rowsPerPage, values.search)
  }, [page, rowsPerPage])

  useEffect(() => {
    setPage(0)
    getStatusDocuments(page, rowsPerPage, values.search)
  }, [values])

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      router.push('/auth/login');
      localStorage.clear();
    }
    getStatusDocuments(0, 5, values.search)
  }, [])

  return (
    <>
      <Head>
        <title>
          Status Dokumen | MOR Recap
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h5">
                  Status Dokumen Import
                </Typography>
              </Stack>
            </Stack>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Cari"
                name="search"
                onChange={handleChange}
                value={values.search}
              />
            </Grid>
            <ImportTable
              isLoading={isLoading}
              count={count}
              items={dataResult}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
