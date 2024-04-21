import PropTypes from 'prop-types';
import {
  Box,
  Card,
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
import CustomizedDialogs from '../modals/modals-tingkat-kehadiran';
import { useState } from 'react';
import Button from "@mui/material/Button";
import Skeleton from '@mui/material/Skeleton';

export const ImportTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    isLoading
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Path File
                </TableCell>
                <TableCell>
                  Bulan
                </TableCell>
                <TableCell>
                  Tahun
                </TableCell>
                <TableCell>
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
                  return (
                    <TableRow
                      hover
                      key={customer.id}
                    >
                      <TableCell>
                        {customer.nama_file}
                      </TableCell>
                      <TableCell>
                        {customer.bulan}
                      </TableCell>
                      <TableCell>
                        {customer.tahun}
                      </TableCell>
                      <TableCell>
                        {customer.status}
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

ImportTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
