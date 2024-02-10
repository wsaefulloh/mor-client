import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

import Typography from "@mui/material/Typography";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    phone: '',
    state: 'los-angeles',
    country: 'USA'
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <Typography sx={{ pb: 1, fontSize: 13, pt: 3 }}>
                  Nama
                </Typography>
                <form noValidate>
                  <FormControl sx={{ width: '100%' }}>
                    <OutlinedInput disabled={true} value={props.name} />
                  </FormControl>
                </form>
                <Typography sx={{ pb: 1, fontSize: 13, pt: 3 }}>
                  Nomor NRP
                </Typography>
                <form noValidate>
                  <FormControl sx={{ width: '100%' }}>
                    <OutlinedInput disabled={true} value={props.nrp} />
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
