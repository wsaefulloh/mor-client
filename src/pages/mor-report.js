import { useCallback, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import axios from 'axios';
import { useEffect } from 'react';
import { config } from '../helpers/constant';
import { DatabaseKaryawanTable } from '../sections/table/database-karyawan-table';
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

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataResult, setDataResult] = useState([]);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    year: new Date().getFullYear(),
    month: month[new Date().getMonth()].value,
    search: ""
  });

  const [listYear, setListYear] = useState([]);

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
    await axios.get(`${config.baseURL}/api/serve-data/database-user?page=${Number(page) + 1}&size=${size}&search_name=${search_name}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then((res) => {
      dataUser = res
      setDataResult(res.data.data.data.data)
      setCount(res.data.data.data.itemCount)
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 401) {
        router.push('/auth/login');
        localStorage.clear();
      }
    })
    console.log(dataUser)
  };

  useEffect(() => {
    getTingkatKehadiran(page, rowsPerPage, values.month, values.year, values.search)
  }, [page, rowsPerPage, values])

  useEffect(() => {
    let listYearArray = []
    for (let i = 3; i >= 0; i--) {
      listYearArray.push({ value: `${Number(new Date().getFullYear()) - i}`, label: `${Number(new Date().getFullYear()) - i}` })
    }
    setListYear(listYearArray)
    if (localStorage.getItem("auth") !== "true") {
      router.push('/auth/login');
      localStorage.clear();
    }
    getTingkatKehadiran(0, 5, values.month, values.year, values.search)
  }, [])

  return (
    <>
      <Head>
        <title>
          Report | MOR Recap
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
                <Typography variant="h4">
                  MOR Report
                </Typography>
              </Stack>
            </Stack>
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
                {listYear.map((option) => (
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
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Cari Nama Karyawan"
                name="search"
                onChange={handleChange}
                value={values.search}
              />
            </Grid>
            <DatabaseKaryawanTable
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
