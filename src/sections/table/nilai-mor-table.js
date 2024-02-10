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

export const NilaiMorTable = (props) => {
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Parameter
                </TableCell>
                <TableCell>
                  Bobot
                </TableCell>
                <TableCell>
                  Hasil
                </TableCell>
                <TableCell>
                  Nilai MOR
                </TableCell>
                <TableCell>
                  Nilai Akhir
                </TableCell>
                <TableCell>
                  Kategori
                </TableCell>
                <TableCell>
                  Keterangan
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
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {customer.parameter}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.bobot} %
                    </TableCell>
                    <TableCell>
                      {customer.hasil}
                    </TableCell>
                    <TableCell>
                      {customer.nilai_mor}
                    </TableCell>
                    <TableCell>
                      {customer.nilai_akhir}
                    </TableCell>
                    <TableCell>
                      {customer.kategori}
                    </TableCell>
                    <TableCell>
                      {customer.kategori == "K" ? "Kurang" : customer.kategori == "C" ? "Cukup" : customer.kategori == "B" ? "Baik" : customer.kategori == "BS" ? "Baik Sekali" : customer.kategori == "IST" ? "Istimewa" : "error"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

NilaiMorTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
