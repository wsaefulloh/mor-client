import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { AccountProfileDetails } from '../sections/account/account-profile-details';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { config } from '../helpers/constant';
import { useRouter } from 'next/router';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'

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
  const [detailUser, setDetailUser] = useState();
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const [listYear, setListYear] = useState([]);
  const [file, setFile] = useState();
  const [isAvailableUpload, setIsAvailableUpload] = useState(false);
  const [isAvailableProcess, setIsAvailableProcess] = useState(false);
  const [values, setValues] = useState({
    year: new Date().getFullYear(),
    month: month[new Date().getMonth()].value,
  });
  const [urlFile, setUrlFile] = useState();


  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const uploadForm = async (e) => {
    const file = e.target.files[0]
    let tokenValue = localStorage.getItem("token")

    let formData = new FormData();
    formData.append('files', file);
    setIsLoadingUpload(true)
    try {
      let response = await axios.post(`${config.baseURL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${tokenValue}`
        },
      })
      setIsLoadingUpload(false)
      if (response?.status === 200) {
        setUrlFile(`${response.data[0].url}`)
        setIsAvailableProcess(true)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setIsLoadingUpload(false)
  };

  const process = async () => {

    setIsLoadingProcess(true)

    let tokenValue = localStorage.getItem("token")
    let formData = new FormData();
    formData.append('month', values.month);
    formData.append('year', values.year);
    formData.append('name_file', urlFile);

    // setIsLoading(true)

    try {
      let response = await axios.post(`${config.baseURL}/api/serve-data/import`, formData, {
        headers: {
          'Authorization': `Bearer ${tokenValue}`
        },
      })
      if (response?.status === 200 || response?.status === 524) {
        Swal.fire({
          title: "Success",
          text: "Data Imported",
          icon: "success"
        }).then(() => {
          router.reload()
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setIsLoadingProcess(false)
  };

  const getUser = async () => {
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
      // console.log(err)
    })
  };

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
    getUser()
  }, [])

  useEffect(() => {
    // console.log(file)
    if (file) {
      setIsAvailableUpload(true)
    }
  }, [file])

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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h5"
                sx={{ mb: 1 }}>
                Upload Excel MOR
              </Typography>
              {/* <Typography variant="h7">
                Silakan upload file excel MOR disini
              </Typography> */}
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={12}
                  lg={12}
                >
                  <label for="avatar">Silakan upload file excel MOR disini: </label>
                  <input onChange={(e) => { setFile(e) }} type="file" id="avatar" name="avatar" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                </Grid>
              </Grid>

              {isAvailableUpload ? (
                <Button
                  sx={{
                    mt: 2, backgroundColor: '#122647',
                    color: '#ffffff !important', '&:hover': {
                      color: '#122647 !important',
                    },
                  }}
                  onClick={() => {
                    uploadForm(file)
                  }}>
                  {isLoadingUpload ? (
                    <CircularProgress style={{ width: "30px", height: "30px", color: "#FFFFFF" }} color="secondary" />
                  ) : (
                    <>
                      {"Upload"}
                    </>
                  )}
                </Button>
              ) : (
                <></>
              )}

              {isAvailableProcess ? (
                <>
                  <Grid
                    xs={12}
                    md={6}
                    sx={{
                      mt: 2
                    }}
                  >
                    <TextField
                      fullWidth
                      label="URL File"
                      disabled={true}
                      value={urlFile}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    md={6}
                    sx={{
                      mt: 2
                    }}
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
                    sx={{
                      mt: 2
                    }}
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
                  <Button
                    sx={{
                      mt: 2, backgroundColor: '#122647',
                      color: '#ffffff !important', '&:hover': {
                        color: '#122647 !important',
                      },
                    }}
                    onClick={() => {
                      process()
                    }}>
                    {isLoadingProcess ? (
                      <CircularProgress style={{ width: "30px", height: "30px", color: "#FFFFFF" }} color="secondary" />
                    ) : (
                      <>
                        {'Process Import'}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <></>
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
