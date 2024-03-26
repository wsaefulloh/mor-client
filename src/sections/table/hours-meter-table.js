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
import CustomizedDialogsHoursMeter from '../modals/modals-hours-meter';
import { useState } from 'react';
import Button from "@mui/material/Button";
import Skeleton from '@mui/material/Skeleton';

export const HoursMeterTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    hasil,
    hasilMor,
    hasilAkhir,
    setHasil,
    setHasilMor,
    setHasilAkhir,
    confirm,
    setUserId,
    setHoursMeterId,
    isLoading
  } = props;

  const [open, setOpen] = useState(false);
  const [namaSelected, setNamaSelected] = useState("");
  const [nrpSelected, setNrpSelected] = useState("");

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>
                  Nama
                </TableCell>
                <TableCell>
                  NRP
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
                <TableCell>
                  Total HM
                </TableCell>
                <TableCell>
                  Nilai Mor
                </TableCell>
                <TableCell>
                  Nilai Akhir
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
                              setOpen(true)
                              setNamaSelected(customer.name)
                              setNrpSelected(customer.nrp)
                              setHasil(customer.hasil)
                              setHasilAkhir(customer.hasil_akhir)
                              setHasilMor(customer.hasil_mor)
                              setUserId(customer.user_id)
                              setHoursMeterId(customer.hours_meter_id)
                            }}>
                            Update
                          </Button>
                        </Stack>
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
                        {customer.jabatan}
                      </TableCell>
                      <TableCell>
                        {customer.versatility}
                      </TableCell>
                      <TableCell>
                        {customer.grade}
                      </TableCell>
                      <TableCell>
                        {customer.total_hm}
                      </TableCell>
                      <TableCell>
                        {customer.nilai_mor}
                      </TableCell>
                      <TableCell>
                        {customer.nilai_akhir}
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
      <CustomizedDialogsHoursMeter open={open} setOpen={setOpen} nama={namaSelected} nrp={nrpSelected} hasil={hasil} hasilMor={hasilMor} hasilAkhir={hasilAkhir} setHasil={setHasil} confirm={confirm} />
    </Card>
  );
};

HoursMeterTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  hasil: PropTypes.any,
  hasilMor: PropTypes.any,
  hasilAkhir: PropTypes.any,
  setHasil: PropTypes.any,
  setHasilMor: PropTypes.any,
  setHasilAkhir: PropTypes.any,
  confirm: PropTypes.any,
  setUserId: PropTypes.any,
  setHoursMeterId: PropTypes.any,
};
