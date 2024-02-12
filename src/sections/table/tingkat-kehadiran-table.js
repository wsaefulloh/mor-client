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

export const TingkatKehadiranTable = (props) => {
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
    setTingkatKehadiranId
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
                  Hasil
                </TableCell>
                <TableCell>
                  Nilai Mor
                </TableCell>
                <TableCell>
                  Nilai Akhir
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
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
                            setTingkatKehadiranId(customer.tingkat_kehadiran_id)
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
                      {customer.hasil}
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
      <CustomizedDialogs open={open} setOpen={setOpen} nama={namaSelected} nrp={nrpSelected} hasil={hasil} hasilMor={hasilMor} hasilAkhir={hasilAkhir} setHasil={setHasil} confirm={confirm} />
    </Card>
  );
};

TingkatKehadiranTable.propTypes = {
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
  setTingkatKehadiranId: PropTypes.any,
};
