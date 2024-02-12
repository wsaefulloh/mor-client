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
import Button from "@mui/material/Button";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Modal from '@mui/material/Modal';

function PrintPdf({ value }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Visitor Pass',
    onAfterPrint: () => console.log('Printed PDF successfully!'),
  });
  const jumlahAkhir = (value.hazard_report_nilai_akhir + value.keseringan_insiden_nilai_akhir + value.productivity_individu_nilai_akhir + value.tingkat_kehadiran_nilai_akhir + value.hours_meter_nilai_akhir + value.disiplin_kerja_nilai_akhir).toFixed(2)
  const kategori = jumlahAkhir >= 0 && jumlahAkhir <= 1.99 ? "K" : jumlahAkhir >= 2.00 && jumlahAkhir <= 2.99 ? "C" : jumlahAkhir >= 3.00 && jumlahAkhir <= 3.99 ? "B" : jumlahAkhir >= 4.00 && jumlahAkhir <= 4.75 ? "BS" : jumlahAkhir >= 4.76 && jumlahAkhir <= 10 ? "IST" : "error"
  const keterangan = kategori == "K" ? "Kurang" : kategori == "C" ? "Cukup" : kategori == "B" ? "Baik" : kategori == "BS" ? "Baik Sekali" : kategori == "IST" ? "Istimewa" : "error"

  return (
    <>
      <div
        ref={componentRef}
        style={{ width: '100%', height: "1000px", padding: "40px" }}
      >
        <div style={{ marginBottom: "120px" }}>
          <img style={{ position: "absolute", top: "40px", left: "40px" }} width='150px'
            alt="Logo"
            src={"../assets/logos/Logo.png"}></img>
          <h2
            style={{ position: "absolute", top: "40px", right: "40px" }} >MONTHLY OPERATOR REPORT (MOR)</h2>
        </div>

        <div style={{ marginBottom: "30px", display: "flex" }}>
          <table
            style={{
              width: '50%',
              height: '50%',
              fontSize: '19px',
              fontWeight: '700'
            }}
          >
            <tr>
              <td style={{
                width: '45%'
              }}>NAMA</td>
              <td>{`: ${value.name}`}</td>
            </tr>
            <tr>
              <td>NRP</td>
              <td>{`: ${value.nrp}`}</td>
            </tr>
            <tr>
              <td>PERIODE BULAN</td>
              <td>{`: ${value.bulan} ${value.tahun}`}</td>
            </tr>
          </table>
          <table
            style={{
              width: '50%',
              height: '50%',
              fontSize: '19px',
              fontWeight: '700'
            }}
          >
            <tr>
              <td style={{
                width: '45%'
              }}>VERSATILITY</td>
              <td>{`: ${value.versatility}`}</td>
            </tr>
            <tr>
              <td>GRADE OPERATOR</td>
              <td>{`: ${value.grade}`}</td>
            </tr>
          </table>
        </div>

        <table
          style={{
            width: '100%',
            height: "18%",
            fontSize: '19px',
            border: '3px solid black',
            borderCollapse: 'collapse',
            fontWeight: '500',
          }}
        >
          <tr>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "300px",
              textAlign: "center",
              backgroundColor: "yellow"
            }}>Parameter Penilaian</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center",
              backgroundColor: "yellow"
            }}>Bobot</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center",
              backgroundColor: "yellow"
            }}>Hasil</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center",
              backgroundColor: "yellow"
            }}>Nilai Mor</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center",
              backgroundColor: "yellow"
            }}>Nilai Akhir</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center",
              backgroundColor: "yellow"
            }}>Kategori</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center",
              backgroundColor: "yellow"
            }}>Keterangan</td>
          </tr>
          <tr>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "300px",
              padding: "20px"
            }}>Tingkat Kehadiran (ATR)</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>20%</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.tingkat_kehadiran_hasil}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.tingkat_kehadiran_nilai_mor}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.tingkat_kehadiran_nilai_akhir}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{`${value.tingkat_kehadiran_kategori}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{value.tingkat_kehadiran_kategori == "K" ? "Kurang" : value.tingkat_kehadiran_kategori == "C" ? "Cukup" : value.tingkat_kehadiran_kategori == "B" ? "Baik" : value.tingkat_kehadiran_kategori == "BS" ? "Baik Sekali" : value.tingkat_kehadiran_kategori == "IST" ? "Istimewa" : "error"}</td>
          </tr>
          <tr>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "300px",
              padding: "20px"
            }}>Tepat Waktu & Disiplin Kerja</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>10%</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.disiplin_kerja_nilai_mor}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.disiplin_kerja_nilai_mor}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.disiplin_kerja_nilai_akhir}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{`${value.disiplin_kerja_kategori}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{value.disiplin_kerja_kategori == "K" ? "Kurang" : value.disiplin_kerja_kategori == "C" ? "Cukup" : value.disiplin_kerja_kategori == "B" ? "Baik" : value.disiplin_kerja_kategori == "BS" ? "Baik Sekali" : value.disiplin_kerja_kategori == "IST" ? "Istimewa" : "error"}</td>
          </tr>
          <tr>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "300px",
              padding: "20px"
            }}>Pencapaian Hours Meter (HM)</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>20%</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.hours_meter_hasil}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.hours_meter_nilai_mor}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.hours_meter_nilai_akhir}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{`${value.hours_meter_kategori}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{value.hours_meter_kategori == "K" ? "Kurang" : value.hours_meter_kategori == "C" ? "Cukup" : value.hours_meter_kategori == "B" ? "Baik" : value.hours_meter_kategori == "BS" ? "Baik Sekali" : value.hours_meter_kategori == "IST" ? "Istimewa" : "error"}</td>
          </tr>
          <tr>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "300px",
              padding: "20px"
            }}>Pencapaian Produktifitas Individu</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>25%</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.productivity_individu_hasil}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.productivity_individu_nilai_mor}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.productivity_individu_nilai_akhir}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{`${value.productivity_individu_kategori}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{value.productivity_individu_kategori == "K" ? "Kurang" : value.productivity_individu_kategori == "C" ? "Cukup" : value.productivity_individu_kategori == "B" ? "Baik" : value.productivity_individu_kategori == "BS" ? "Baik Sekali" : value.productivity_individu_kategori == "IST" ? "Istimewa" : "error"}</td>
          </tr>
          <tr>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "300px",
              padding: "20px"
            }}>Tingkat Keseringan Insiden</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>20%</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.keseringan_insiden_hasil}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.keseringan_insiden_nilai_mor}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.keseringan_insiden_nilai_akhir}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{`${value.keseringan_insiden_kategori}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{value.keseringan_insiden_kategori == "K" ? "Kurang" : value.keseringan_insiden_kategori == "C" ? "Cukup" : value.keseringan_insiden_kategori == "B" ? "Baik" : value.keseringan_insiden_kategori == "BS" ? "Baik Sekali" : value.keseringan_insiden_kategori == "IST" ? "Istimewa" : "error"}</td>
          </tr>
          <tr>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "300px",
              padding: "20px"
            }}>Hazard Report</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>5%</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.hazard_report_hasil}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.hazard_report_nilai_mor}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              width: "70px",
              textAlign: "center"
            }}>{`${value.hazard_report_nilai_akhir}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{`${value.hazard_report_kategori}`}</td>
            <td style={{
              border: '3px solid black',
              borderCollapse: 'collapse',
              textAlign: "center"
            }}>{value.hazard_report_kategori == "K" ? "Kurang" : value.hazard_report_kategori == "C" ? "Cukup" : value.hazard_report_kategori == "B" ? "Baik" : value.hazard_report_kategori == "BS" ? "Baik Sekali" : value.hazard_report_kategori == "IST" ? "Istimewa" : "error"}</td>
          </tr>
        </table>

        <div style={{ marginTop: "30px", display: "flex" }}>
          <table
            style={{
              width: '50%',
              height: '50%',
              fontSize: '19px',
              fontWeight: '700'
            }}
          >
            <tr>
              <td style={{
                width: '45%'
              }}>JUMLAH MOR</td>
              <td>{`: ${jumlahAkhir}`}</td>
            </tr>
            <tr>
              <td>KATEGORI</td>
              <td>{`: ${kategori}`}</td>
            </tr>
            <tr>
              <td>KETERANGAN</td>
              <td>{`: ${keterangan}`}</td>
            </tr>
          </table>
        </div>
      </div>
      <div style={{ padding: "40px", paddingTop: "0px" }}>
        <Button
          sx={{
            mt: 3, backgroundColor: '#122647',
            color: '#ffffff', '&:hover': {
              color: '#122647',
            },
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "40px",
            paddingRight: "40px",
            fontSize: "18px"
          }}
          onClick={handlePrint}>
          Print
        </Button>
      </div>

    </>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1020,
  height: 800,
  overflowY: "scroll",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export const DatabaseKaryawanTable = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const [value, setValue] = React.useState();

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
                <TableCell sx={{ minWidth: 180 }}>
                </TableCell>
                <TableCell sx={{ minWidth: 180 }}>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell colSpan={3}
                  align='center'
                  sx={{ borderLeft: "1px solid" }}>
                  Tingkat Kehadiran (ATR)
                </TableCell>
                <TableCell colSpan={3}
                  align='center'
                  sx={{ borderLeft: "1px solid" }}>
                  Disiplin Waktu dan Kerja
                </TableCell>
                <TableCell colSpan={3}
                  align='center'
                  sx={{ borderLeft: "1px solid" }}>
                  Pencapaian Hours Meter
                </TableCell>
                <TableCell colSpan={3}
                  align='center'
                  sx={{ borderLeft: "1px solid" }}>
                  Productivity Individu
                </TableCell>
                <TableCell colSpan={3}
                  align='center'
                  sx={{ borderLeft: "1px solid" }}>
                  Tingkat Keseringan Insiden
                </TableCell>
                <TableCell colSpan={3}
                  align='center'
                  sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>
                  Hazard Report
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>
                  Nama
                </TableCell>
                <TableCell align='center' >
                  NRP
                </TableCell>
                <TableCell align='center' >
                  Jabatan
                </TableCell>
                <TableCell align='center' >
                  Versatility
                </TableCell>
                <TableCell align='center' >
                  Grade
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai Akhir
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Hasil
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
                  Nilai MOR
                </TableCell>
                <TableCell align='center'
                  sx={{ border: "1px solid" }}>
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
                            onClick={() => { handleOpen(); setValue(customer) }}>
                            Print
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
                    <TableCell align='center' >
                      {customer.nrp}
                    </TableCell>
                    <TableCell align='center' >
                      {customer.jabatan}
                    </TableCell>
                    <TableCell align='center' >
                      {customer.versatility}
                    </TableCell>
                    <TableCell align='center' >
                      {customer.grade}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.tingkat_kehadiran_hasil}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.tingkat_kehadiran_nilai_mor}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.tingkat_kehadiran_nilai_akhir}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.disiplin_kerja_nilai_mor}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.disiplin_kerja_nilai_mor}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.disiplin_kerja_nilai_akhir}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.hours_meter_hasil}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.hours_meter_nilai_mor}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.hours_meter_nilai_akhir}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.productivity_individu_hasil}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.productivity_individu_nilai_mor}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.productivity_individu_nilai_akhir}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.keseringan_insiden_hasil}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.keseringan_insiden_nilai_mor}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.keseringan_insiden_nilai_akhir}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.hazard_report_hasil}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.hazard_report_nilai_mor}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                      align='center' >
                      {customer.hazard_report_nilai_akhir}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PrintPdf value={value} />
        </Box>
      </Modal>
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
