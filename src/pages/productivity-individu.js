import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import { useSelection } from '../hooks/use-selection';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { CustomersTable } from '../sections/customer/customers-table';
import { CustomersSearch } from '../sections/customer/customers-search';
import { applyPagination } from '../utils/apply-pagination';
import { TingkatKehadiranTable } from '../sections/table/tingkat-kehadiran-table';
import axios from 'axios';
import { useEffect } from 'react';
import { getTingkatKehadiranCalculate } from '../helpers/calculate-tingkat-kehadiran'
import { config } from '../helpers/constant';
import { ProductivityIndividuTable } from '../sections/table/productivity-individu-table';
import { getProductivityIndividuCalculate } from '../helpers/calculate-productivity-individu';
import { useRouter } from 'next/router';

const now = new Date();


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

  const [hasil, setHasil] = useState(0);
  const [hasilMor, setHasilMor] = useState(0);
  const [hasilAkhir, setHasilAkhir] = useState(0);
  const [userId, setUserId] = useState(0);
  const [productivityIndividuId, setProductivityIndividuId] = useState(0);

  const handleHasil = (e) => {
    setHasil(e)
    let { result, result_mor } = getProductivityIndividuCalculate(e)
    setHasilAkhir(result)
    setHasilMor(result_mor)
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
    let dataUser
    await axios.get(`${config.baseURL}/api/serve-data/productivity-individu?page=${Number(page) + 1}&size=${size}&month=${month}&year=${year}&search_name=${search_name}`).then((res) => {
      dataUser = res
      setDataResult(res.data.data.data.data)
      setCount(res.data.data.data.itemCount)
    }).catch((err) => {
      console.log(err)
    })
    console.log(dataUser)
  };

  const createTingkatKehadiran = async (params) => {
    await axios.post(`${config.baseURL}/api/productivity-individus`, {
      "data": {
        hasil: params.hasil,
        nilai_mor: params.nilai_mor,
        nilai_akhir: params.nilai_akhir,
        bulan: params.bulan,
        tahun: params.tahun,
        user_name: {
          connect: [{ id: Number(params.user_id) }]
        },
      }
    }).then((res) => {
      console.log(res)
      getTingkatKehadiran(page, rowsPerPage, values.month, values.year, values.search)
    }).catch((err) => {
      console.log(err)
    })
    return "OK"
  };

  const updateTingkatKehadiran = async (params) => {
    await axios.put(`${config.baseURL}/api/productivity-individus/${params.id}`, {
      "data": {
        hasil: params.hasil,
        nilai_mor: params.nilai_mor,
        nilai_akhir: params.nilai_akhir,
        bulan: params.bulan,
        tahun: params.tahun,
      }
    }).then((res) => {
      console.log(res)
      getTingkatKehadiran(page, rowsPerPage, values.month, values.year, values.search)
    }).catch((err) => {
      console.log(err)
    })
    return "OK"
  };

  const confirmPerubahan = async () => {
    if (productivityIndividuId == 0) {
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
        id: productivityIndividuId,
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
  }, [page, rowsPerPage, values])

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      router.push('/auth/login');
    }
    getTingkatKehadiran(0, 5, values.month, values.year, values.search)
  }, [])


  return (
    <>
      <Head>
        <title>
          Productivity Individu | MOR Recap
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
                  Productivity Individu
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
            <ProductivityIndividuTable
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
              setProductivityIndividuId={setProductivityIndividuId}
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
