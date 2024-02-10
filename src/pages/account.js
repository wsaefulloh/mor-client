import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { AccountProfile } from '../sections/account/account-profile';
import { AccountProfileDetails } from '../sections/account/account-profile-details';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import { config } from '../helpers/constant';
import { NilaiMorTable } from '../sections/table/nilai-mor-table';
import { useRouter } from 'next/router';

const month = [
  {
    value: 'Januari',
    label: 'Januari'
  },
  {
    value: 'Februari',
    label: 'Februari'
  },
  {
    value: 'Maret',
    label: 'Maret'
  },
  {
    value: 'April',
    label: 'April'
  },
  {
    value: 'Mei',
    label: 'Mei'
  },
  {
    value: 'Juni',
    label: 'Juni'
  },
  {
    value: 'Juli',
    label: 'Juli'
  },
  {
    value: 'Agustus',
    label: 'Agustus'
  },
  {
    value: 'September',
    label: 'September'
  },
  {
    value: 'Oktober',
    label: 'Oktober'
  },
  {
    value: 'November',
    label: 'November'
  },
  {
    value: 'Desember',
    label: 'Desember'
  },
];

const year = [
  {
    value: '2023',
    label: '2023'
  },
  {
    value: '2024',
    label: '2024'
  }
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataResult, setDataResult] = useState([]);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    year: year[0].value,
    month: month[0].value,
    search: ""
  });

  const [detailUser, setDetailUser] = useState();

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

  const getTingkatKehadiran = async (page, size, month, year, search_name) => {
    let dataUser
    await axios.get(`${config.baseURL}/api/serve-data/nilai-mor?id_user=${localStorage.getItem("user_id")}&month=${month}&year=${year}&search_name=${search_name}`).then((res) => {
      dataUser = res
      setDataResult(res.data.data.data)
      setCount(1)
    }).catch((err) => {
      console.log(err)
    })
    console.log(dataUser)
  };

  const getUser = async () => {
    let dataUser
    await axios.get(`${config.baseURL}/api/users/${localStorage.getItem("user_id")}`).then((res) => {
      dataUser = res
      setDetailUser(res.data)
    }).catch((err) => {
      console.log(err)
    })
    console.log(dataUser)
  };

  useEffect(() => {
    getTingkatKehadiran(page, rowsPerPage, values.month, values.year, values.search)
  }, [page, rowsPerPage, values])

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      router.push('/auth/login');
    }
    getUser()
    getTingkatKehadiran(0, 5, values.month, values.year, values.search)
  }, [])

  return (
    <>
      <Head>
        <title>
          Account | MOR Recap
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
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
                {localStorage.getItem("role") == "Admin" ? (
                  <></>
                ) : <>
                  <Grid
                    xs={12}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      label="Pilih Tahun"
                      name="year"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.year}
                    >
                      {year.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    xs={12}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      label="Pilih Bulan"
                      name="month"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.month}
                    >
                      {month.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </>}
              </Grid>
              {localStorage.getItem("role") == "Admin" ? (
                <></>
              ) : (
                <NilaiMorTable
                  count={count}
                  items={dataResult}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
              )}
            </div>
          </Stack>
        </Container>
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
