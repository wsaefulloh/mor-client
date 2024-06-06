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
import CustomizedDialogsProductivityIndividu from '../modals/modals-productivity-individu';
import Skeleton from '@mui/material/Skeleton';

export const SuratPeringatanTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    isLoading
  } = props;

  let getStatus = (date) => {
    if (date.length !== 0 && date !== "Invalid Date") {
      let dateNow = new Date().toISOString().slice(0, 10).split("-")
      let endDate = date.split("/")
      if (Number(endDate[2]) > Number(dateNow[0])) {
        return "AKTIF"
      } else if (Number(endDate[2]) == Number(dateNow[0]) && Number(endDate[1]) > Number(dateNow[1])) {
        return "AKTIF"
      } else if (Number(endDate[2]) == Number(dateNow[0]) && Number(endDate[1]) == Number(dateNow[1]) && Number(endDate[0]) > Number(dateNow[2])) {
        return "AKTIF"
      } else {
        return "NON-AKTIF"
      }
    } else {
      return "-"
    }
  }

  let auth = localStorage.getItem("role")

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {auth === "Admin" &&
                  <TableCell>
                  </TableCell>}
                <TableCell sx={{ minWidth: 150 }}>
                  Nama
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  NRP
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  Jabatan
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  Versatility
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  Grade
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  Jenis SP
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  Tanggal Mulai
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  Tanggal Berakhir
                </TableCell>
                <TableCell sx={{ minWidth: 250 }}>
                  Pasal Pelanggaran
                </TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                {[1, 2, 3, 4, 5].map((x) => {
                  return (
                    <TableRow
                      hover
                      key={`skeleton_${x}`}
                    >
                      {auth === "Admin" &&
                        <TableCell>
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>}
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody>
                {items.map((customer) => {
                  // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={customer.id}
                    >
                      {auth === "Admin" &&
                        <TableCell>

                        </TableCell>}
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
                        {customer.jabatan}
                      </TableCell>
                      <TableCell>
                        {customer.versatility}
                      </TableCell>
                      <TableCell>
                        {customer.grade}
                      </TableCell>
                      <TableCell>
                        {customer.jenis_disiplin_report}
                      </TableCell>
                      <TableCell>
                        {customer.start_date}
                      </TableCell>
                      <TableCell>
                        {customer.end_date}
                      </TableCell>
                      <TableCell>
                        {customer.pasal_pelanggaran}
                      </TableCell>
                      <TableCell>
                        {getStatus(customer.end_date)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}

          </Table>
        </Box>
      </Scrollbar>
      {isLoading ? (
        <></>
      ) : (
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Card>
  );
};

SuratPeringatanTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isLoading: PropTypes.bool
};
