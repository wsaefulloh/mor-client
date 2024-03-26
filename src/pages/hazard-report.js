import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import axios from 'axios';
import { useEffect } from 'react';
import { config } from '../helpers/constant';
import { HazardReportTable } from '../sections/table/hazard-report-table';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataResult, setDataResult] = useState([]);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    year: new Date().getFullYear(),
    month: month[new Date().getMonth()].value,
    search: ""
  });

  const [listYear, setListYear] = useState([])

  const [hasil, setHasil] = useState(0);
  const [hasilMor, setHasilMor] = useState(0);
  const [hasilAkhir, setHasilAkhir] = useState(0);
  const [userId, setUserId] = useState(0);
  const [hazardReportId, setHazardReportId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleHasil = (e) => {
    if (e == 0 || e == 1) {
      setHasilMor(1)
      setHasilAkhir((5 / 100 * 1).toFixed(2))
    } else if (e == 2) {
      setHasilMor(2)
      setHasilAkhir((5 / 100 * 2).toFixed(2))
    } else if (e == 3) {
      setHasilMor(3)
      setHasilAkhir((5 / 100 * 3).toFixed(2))
    } else if (e == 4) {
      setHasilMor(4)
      setHasilAkhir((5 / 100 * 4).toFixed(2))
    } else if (e >= 5) {
      setHasilMor(5)
      setHasilAkhir((5 / 100 * 5).toFixed(2))
    } else {
      setHasilMor("error")
      setHasilAkhir("error")
    }
    setHasil(e)
  }

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
    setIsLoading(true)
    await axios.get(`${config.baseURL}/api/serve-data/hazard-report?page=${Number(page) + 1}&size=${size}&month=${month}&year=${year}&search_name=${search_name}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then((res) => {
      setDataResult(res.data.data.data.data)
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

  const createTingkatKehadiran = async (params) => {
    await axios.post(`${config.baseURL}/api/hazard-reports`, {
      "data": {
        hasil: params.hasil,
        nilai_mor: params.nilai_mor,
        nilai_akhir: params.nilai_akhir,
        bulan: params.bulan,
        tahun: params.tahun.toString(),
        user_name: {
          connect: [{ id: Number(params.user_id) }]
        },
      }
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then((res) => {
      // console.log(res)
      getTingkatKehadiran(page, rowsPerPage, values.month, values.year, values.search)
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 401) {
        router.push('/auth/login');
        localStorage.clear();
      }
      // console.log(err)
    })
    return "OK"
  };

  const updateTingkatKehadiran = async (params) => {
    await axios.put(`${config.baseURL}/api/hazard-reports/${params.id}`, {
      "data": {
        hasil: params.hasil,
        nilai_mor: params.nilai_mor,
        nilai_akhir: params.nilai_akhir,
        bulan: params.bulan,
        tahun: params.tahun.toString(),
      }
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }).then((res) => {
      // console.log(res)
      getTingkatKehadiran(page, rowsPerPage, values.month, values.year, values.search)
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 401) {
        router.push('/auth/login');
        localStorage.clear();
      }
      // console.log(err)
    })
    return "OK"
  };

  const confirmPerubahan = async () => {
    if (hazardReportId == 0) {
      await createTingkatKehadiran({
        hasil: hasil,
        nilai_mor: hasilMor,
        nilai_akhir: hasilAkhir,
        bulan: values.month,
        tahun: values.year,
        user_id: userId
      })
    } else {
      await updateTingkatKehadiran({
        id: hazardReportId,
        hasil: hasil,
        nilai_mor: hasilMor,
        nilai_akhir: hasilAkhir,
        bulan: values.month,
        tahun: values.year
      })
    }
  };

  useEffect(() => {
    getTingkatKehadiran(page, rowsPerPage, values.month, values.year, values.search)
  }, [page, rowsPerPage])

  useEffect(() => {
    setPage(0)
    getTingkatKehadiran(0, rowsPerPage, values.month, values.year, values.search)
  }, [values])

  const router = useRouter();

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
          Hazard Report | MOR Recap
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
                  Hazard Report
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
            <HazardReportTable
              isLoading={isLoading}
              hasil={hasil}
              hasilMor={hasilMor}
              hasilAkhir={hasilAkhir}
              setHasil={handleHasil}
              setHasilMor={setHasilMor}
              setHasilAkhir={setHasilAkhir}
              count={count}
              items={dataResult}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              confirm={confirmPerubahan}
              setUserId={setUserId}
              setHazardReportId={setHazardReportId}
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
