import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import CustomizedDialogs from '../modals/modals-tingkat-kehadiran';
import { useState } from 'react';
import Button from "@mui/material/Button";
import CustomizedDialogsKeseringanInsiden from '../modals/modals-tingkat-keseringan-insiden';

export const DatabaseKaryawanTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell sx={{ minWidth: 250 }}>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell colSpan={3} sx={{ borderLeft: "1px solid" }}>
                  Tingkat Kehadiran (ATR)
                </TableCell>
                <TableCell colSpan={3} sx={{ borderLeft: "1px solid" }}>
                  Disiplin Waktu dan Kerja
                </TableCell>
                <TableCell colSpan={3} sx={{ borderLeft: "1px solid" }}>
                  Pencapaian Hours Meter
                </TableCell>
                <TableCell colSpan={3} sx={{ borderLeft: "1px solid" }}>
                  Productivity Individu
                </TableCell>
                <TableCell colSpan={3} sx={{ borderLeft: "1px solid" }}>
                  Tingkat Keseringan Insiden
                </TableCell>
                <TableCell colSpan={3} sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>
                  Hazard Report
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell>

                </TableCell>
                <TableCell width={150}>
                  Nama
                </TableCell>
                <TableCell>
                  NRP
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Jabatan
                </TableCell>
                <TableCell>
                  Versatility
                </TableCell>
                <TableCell>
                  Grade
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');
                return (
                  <TableRow
                    hover
                    key={customer.nrp}
                  >
                    <TableCell>
                      <TableCell>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          <Button
                            sx={{
                              mt: 3, backgroundColor: '#122647',
                              color: '#ffffff', '&:hover': {
                                color: '#122647',
                              },
                            }}
                            onClick={() => {
                              // setOpen(true)
                              // setNamaSelected(customer.name)
                              // setNrpSelected(customer.nrp)
                              // setHasilAkhir(customer.hasil_akhir)
                              // setHasilMor(customer.hasil_mor)
                              // setUserId(customer.user_id)
                              // setDisiplinWaktuId(customer.disiplin_kerja_id)
                            }}>
                            Update
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {customer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.nrp}
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.password_mor}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card >
  );
};

DatabaseKaryawanTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
