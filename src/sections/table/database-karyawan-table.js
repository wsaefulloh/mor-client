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
  Typography, Unstable_Grid2 as Grid,
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Modal from '@mui/material/Modal';
import { usePDF } from 'react-to-pdf';
import DialogContent from "@mui/material/DialogContent";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { color } from '@mui/system';
import { getKeterangan } from '../../helpers/calculate-keterangan';

function PrintPdf({ value, tglEfektif, tglEfektifString }) {
  const { toPDF, targetRef } = usePDF({ filename: `${value.name}/${value.nrp} - ${value.bulan}/${value.tahun}.pdf` });
  const jumlahAkhir = 1
  const kategori = "K"

  const keterangan = (kategori) => {
    let result = kategori == "K" ? "Kurang" : kategori == "C" ? "Cukup" : kategori == "B" ? "Baik" : kategori == "BS" ? "Baik Sekali" : kategori == "IST" ? "Istimewa" : "error"
    return result
  }

  const [page, setPage] = useState(1)

  const [revisi, setRevisi] = useState("-")
  const [jobSite, setJobSite] = useState("-")
  const [pencapaianHourMeter, setPencapaianHourMeter] = useState([{
    alatEquipment: "",
    periode: "",
    shift: "",
    hourMeter: ""
  }])
  const [pencapaianHourMeterTotal, setPencapaianHourMeterTotal] = useState({
    alatEquipment: "",
    periode: "",
    shift: "",
    hourMeter: ""
  })
  const [rencanaTraining, setRencanaTraining] = useState([{
    tglBulan: "",
    JenisTraining: "",
  }])
  const [tglEfektifState, setTglEfektif] = React.useState(tglEfektif);
  const [tglEfektifStringState, setTglEfektifString] = React.useState(tglEfektifString);

  return (
    <>
      {page === 1 ? (
        <>
          <button style={{ marginTop: '40px', marginLeft: '50px', width: "200px", padding: "10px" }}
            onClick={() => setPage(2)}>Next</button>
          <div style={{ marginTop: '40px', marginLeft: '50px' }} dividers>
            <Typography sx={{ pb: 2 }}
              gutterBottom>
              {value.name} ({value.nrp})
            </Typography>
            <Grid
              xs={12}
              md={6}
              sx={{ pb: 2, pt: 2 }}
            >
              <Typography sx={{ pb: 1, fontSize: 13 }}>
                Tanggal Efektif <span style={{ color: "red" }}>*Untuk Print MOR</span>
              </Typography>
              <form noValidate>
                <FormControl sx={{ width: '100%' }}>
                  <OutlinedInput
                    onChange={(e) => {
                      setTglEfektif(e.target.value)
                    }}
                    value={tglEfektifState}
                  />
                </FormControl>
              </form>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{ pb: 2, pt: 2 }}
            >
              <Typography sx={{ pb: 1, fontSize: 13 }}>
                Tanggal Efektif Tertulis <span style={{ color: "red" }}>*Untuk Print MOR</span>
              </Typography>
              <form noValidate>
                <FormControl sx={{ width: '100%' }}>
                  <OutlinedInput
                    onChange={(e) => {
                      setTglEfektifString(e.target.value)
                    }}
                    value={tglEfektifStringState}
                  />
                </FormControl>
              </form>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{ pb: 2, pt: 2 }}
            >
              <Typography sx={{ pb: 1, fontSize: 13 }}>
                Job Site <span style={{ color: "red" }}>*Untuk Print MOR</span>
              </Typography>
              <form noValidate>
                <FormControl sx={{ width: '100%' }}>
                  <OutlinedInput
                    onChange={(e) => {
                      setJobSite(e.target.value)
                    }}
                    value={jobSite}
                  />
                </FormControl>
              </form>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{ pb: 2, pt: 2 }}
            >
              <Typography sx={{ pb: 1, fontSize: 13 }}>
                Revisi <span style={{ color: "red" }}>*Untuk Print MOR</span>
              </Typography>
              <form noValidate>
                <FormControl sx={{ width: '100%' }}>
                  <OutlinedInput
                    onChange={(e) => {
                      setRevisi(e.target.value)
                    }}
                    value={revisi}
                  />
                </FormControl>
              </form>
            </Grid>
          </div>
        </>
      ) : (
        <>
          <button style={{ marginTop: '40px', marginLeft: '50px', width: "200px", padding: "10px" }}
            onClick={() => setPage(1)}>Previous</button>
          <button style={{ marginTop: '40px', marginLeft: '50px', width: "200px", padding: "10px" }}
            onClick={() => toPDF()}>Download PDF</button>
          <div className='custom'
            style={{ padding: 50 }}
            ref={targetRef}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "20%", border: "1px solid black" }}>
                    <img src={"../assets/logos/Logo.png"} />
                  </td>
                  <td style={{ fontWeight: 900, fontSize: 30, width: "50%", border: "1px solid black", borderLeft: "unset" }}>
                    MONTHLY OPERATOR REPORT (MOR)
                  </td>
                  <td style={{ border: "1px solid black", borderLeft: "unset" }}>
                    <table
                      style={{
                        width: "100%",
                        border: "unset",
                        textAlign: "left"
                      }}
                    >
                      <tbody>
                        <tr
                          style={{
                            border: "unset",
                            textAlign: "left"
                          }}
                        >
                          <td
                            style={{
                              border: "unset",
                              width: "30%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            No Dokumen
                          </td>
                          <td
                            style={{
                              border: "unset",
                              width: "5%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            :
                          </td>
                          <td
                            style={{
                              border: "unset",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            {`DOC/${value.nrp}/${value.bulan.toUpperCase().slice(0, 3)}/${value.tahun}`}
                          </td>
                        </tr>
                        <tr
                          style={{
                            border: "unset",
                            textAlign: "left"
                          }}
                        >
                          <td
                            style={{
                              border: "unset",
                              width: "30%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            Tgl Efektif
                          </td>
                          <td
                            style={{
                              border: "unset",
                              width: "5%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            :
                          </td>
                          <td
                            style={{
                              border: "unset",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            {tglEfektifState}
                          </td>
                        </tr>
                        <tr
                          style={{
                            border: "unset",
                            textAlign: "left"
                          }}
                        >
                          <td
                            style={{
                              border: "unset",
                              width: "30%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            Halaman
                          </td>
                          <td
                            style={{
                              border: "unset",
                              width: "5%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            :
                          </td>
                          <td
                            style={{
                              border: "unset",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            1
                          </td>
                        </tr>
                        <tr
                          style={{
                            border: "unset",
                            textAlign: "left"
                          }}
                        >
                          <td
                            style={{
                              border: "unset",
                              width: "30%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            Revisi
                          </td>
                          <td
                            style={{
                              border: "unset",
                              width: "5%",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            :
                          </td>
                          <td
                            style={{
                              border: "unset",
                              textAlign: "left",
                              fontSize: 20
                            }}
                          >
                            {revisi}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ display: "flex", width: "100%", paddingTop: 40 }}>
              <div style={{ width: "50%" }}>
                <table
                  style={{
                    width: "100%",
                    border: "unset",
                    textAlign: "left"
                  }}
                >
                  <tbody>
                    <tr
                      style={{
                        border: "unset",
                        textAlign: "left"
                      }}
                    >
                      <td
                        style={{
                          border: "unset",
                          width: "30%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        NAMA
                      </td>
                      <td
                        style={{
                          border: "unset",
                          width: "5%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          border: "unset",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        {value.name}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: "unset",
                        textAlign: "left"
                      }}
                    >
                      <td
                        style={{
                          border: "unset",
                          width: "30%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        NRP
                      </td>
                      <td
                        style={{
                          border: "unset",
                          width: "5%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          border: "unset",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        {value.nrp}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: "unset",
                        textAlign: "left"
                      }}
                    >
                      <td
                        style={{
                          border: "unset",
                          width: "30%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        JABATAN
                      </td>
                      <td
                        style={{
                          border: "unset",
                          width: "5%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          border: "unset",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        {value.jabatan}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ width: "50%" }}>
                <table
                  style={{
                    width: "100%",
                    border: "unset",
                    textAlign: "left"
                  }}
                >
                  <tbody>
                    <tr
                      style={{
                        border: "unset",
                        textAlign: "left"
                      }}
                    >
                      <td
                        style={{
                          border: "unset",
                          width: "30%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        VERSATILITY
                      </td>
                      <td
                        style={{
                          border: "unset",
                          width: "5%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          border: "unset",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        {value.versatility}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: "unset",
                        textAlign: "left"
                      }}
                    >
                      <td
                        style={{
                          border: "unset",
                          width: "30%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        GRADE OPERATOR
                      </td>
                      <td
                        style={{
                          border: "unset",
                          width: "5%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          border: "unset",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        {value.grade}
                      </td>
                    </tr>
                    <tr
                      style={{
                        border: "unset",
                        textAlign: "left"
                      }}
                    >
                      <td
                        style={{
                          border: "unset",
                          width: "30%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        JOB SITE
                      </td>
                      <td
                        style={{
                          border: "unset",
                          width: "5%",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        :
                      </td>
                      <td
                        style={{
                          border: "unset",
                          textAlign: "left",
                          fontSize: 20,
                          fontWeight: 900
                        }}
                      >
                        {jobSite}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ paddingTop: 40 }}>
              <table
                style={{
                  width: "100%",
                  textAlign: "left",
                  // borderLeft: "1px solid black",
                  borderTop: "1px solid black"

                }}
              >
                <tbody>
                  <tr
                    style={{
                      textAlign: "left",
                      backgroundColor: "yellow"
                    }}
                  >
                    <th style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", }}>
                      Tanggal Penilaian
                    </th>
                    <th style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderBottom: "unset", borderTop: "unset", borderRight: "unset", }}>
                      Kategori Penilaian
                    </th>
                    <th
                      colSpan={2}
                      style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderRight: "unset", borderBottom: "unset", borderTop: "unset" }}
                    >
                      Parameter Penilaian
                    </th>
                    <th style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderRight: "unset", borderBottom: "unset", borderTop: "unset" }}>
                      Bobot
                    </th>
                    <th colSpan={3}
                      style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderRight: "unset", borderBottom: "unset", borderTop: "unset" }}>
                      Skor
                    </th>
                    <th style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderBottom: "unset", borderTop: "unset" }}>
                      Keterangan
                    </th>
                  </tr>
                  <tr
                    style={{
                      border: "unset",
                      textAlign: "left",
                      backgroundColor: "yellow"
                    }}
                  >
                    <td style={{ fontSize: 20, fontWeight: 900, borderBottom: "1px solid black", borderLeft: "1px solid black" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderBottom: "1px solid black", borderLeft: "1px solid black" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderBottom: "1px solid black", borderLeft: "1px solid black" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderBottom: "1px solid black", }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderRight: "unset", borderTop: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderRight: "unset" }}><div style={{ paddingLeft: "30px", paddingRight: "30px" }}>Hasil</div></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderRight: "unset" }}>Nilai MOR</td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderRight: "unset" }}>Nilai Akhir</td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderTop: "unset" }}></td>
                  </tr>
                  <tr>
                    <td
                      rowSpan={5}
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        border: "unset",
                        borderBottom: "1px solid black", borderLeft: "1px solid black"
                      }}
                    >
                      <div style={{ transform: "rotate(270deg)" }}>{tglEfektifStringState}</div>
                    </td>
                    <td rowSpan={3} style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>1. Penilaian Skala Individu</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>A</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      Tingkat Kehadiran (ATR)
                    </td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>20%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{`${value.tingkat_kehadiran_hasil} %`}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.tingkat_kehadiran_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.tingkat_kehadiran_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{value.tingkat_kehadiran_kategori}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>B</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      Pencapaian Hours Meter Pada Hari Efektif Bekerja (HM)
                    </td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>20%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{`${value.hours_meter_hasil} %`}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.hours_meter_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.hours_meter_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{getKeterangan(value.hours_meter_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>C</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      Hazard Report (KTA/TTA)
                    </td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>15%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{`${value.hazard_report_hasil}`}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.hazard_report_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.hazard_report_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{getKeterangan(value.hazard_report_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td rowSpan={2} style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>2. Penilaian Skala Project</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>A</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      Pencapaian Produksi Skala Project
                    </td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>25%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{`${value.pencapaian_produksi_hasil} %`}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.pencapaian_produksi_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.pencapaian_produksi_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{getKeterangan(value.pencapaian_produksi_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>B</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      Tingkat Keseringan Insiden Skala Departemen
                    </td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>20%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{`${value.keseringan_insiden_hasil}`}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.keseringan_insiden_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.keseringan_insiden_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{getKeterangan(value.keseringan_insiden_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "unset" }}></td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td colSpan={4} style={{ fontSize: 20, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>Disiplin Bekerja (A1)</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>20%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>{`${value.tingkat_kehadiran_hasil} %`}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>{value.tingkat_kehadiran_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black" }}>{value.tingkat_kehadiran_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, border: "unset" }}></td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td colSpan={4} style={{ fontSize: 20, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>Usaha Mencapai Target Produksi (1B x 2A)</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>45%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>{value.hmxproduksi_hasil}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>{value.hmxproduksi_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black" }}>{value.hmxproduksi_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, border: "unset" }}></td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td colSpan={4} style={{ fontSize: 20, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>Usaha Menciptakan Keselamatan Bekerja (1C X 2B)</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>35%</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>{value.ifrxhazard_hasil}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black" }}>{value.ifrxhazard_nilai_mor}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black" }}>{value.ifrxhazard_nilai_akhir}</td>
                    <td style={{ fontSize: 18, fontWeight: 900, border: "unset" }}></td>
                  </tr>
                  <tr style={{ border: "unset", backgroundColor: "yellow" }}>
                    <td colSpan={7} style={{ fontSize: 20, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black", borderBottom: "1px solid black" }}>Total Nilai Prestasi Kerja</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderTop: "1px solid black", borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black", }}>{value.total_nilai_akhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderTop: "1px solid black", borderRight: "1px solid black", borderBottom: "1px solid black" }}>{getKeterangan(value.total_keterangan.kategori)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ paddingTop: 40 }}>
              <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 10 }}>
                Catatan :
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
                  1.
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10, marginLeft: "15px", textAlign: "justify" }}>
                  {value.total_keterangan.catatan_1}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
                  2.
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10, marginLeft: "15px", textAlign: "justify" }}>
                  {value.total_keterangan.catatan_2}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
                  3.
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10, marginLeft: "15px", textAlign: "justify" }}>
                  {value.total_keterangan.catatan_3}
                </div>
              </div>
            </div>

            <div style={{ paddingTop: 40 }}>
              <table style={{ width: "100%", border: "unset" }}>
                <tbody>
                  <tr
                    style={{ textAlign: "left", border: "unset" }}
                  >
                    <td
                      style={{
                        textAlign: "left",
                        width: "15%",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Indisipliner Report
                    </td>
                    <td
                      style={{
                        width: "5%",
                        textAlign: "right",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      {value?.indisipliner_jenis ?? "-"}
                    </td>
                  </tr>

                  <tr
                    style={{ textAlign: "left", border: "unset" }}
                  >
                    <td
                      style={{
                        textAlign: "left",
                        width: "15%",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Pasal Pelanggaran
                    </td>
                    <td
                      style={{
                        width: "5%",
                        textAlign: "right",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      {value?.indisipliner_pasal ?? "-"}
                    </td>
                  </tr>

                  <tr
                    style={{ textAlign: "left", border: "unset" }}
                  >
                    <td
                      style={{
                        textAlign: "left",
                        width: "15%",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Tanggal Berlaku
                    </td>
                    <td
                      style={{
                        width: "5%",
                        textAlign: "right",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      {value?.indisipliner_tanggal_berlaku ?? "-"}
                    </td>
                  </tr>

                  <tr
                    style={{ textAlign: "left", border: "unset" }}
                  >
                    <td
                      style={{
                        textAlign: "left",
                        width: "15%",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Tanggal Berakhir
                    </td>
                    <td
                      style={{
                        width: "5%",
                        textAlign: "right",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      {value?.indisipliner_tanggal_berakhir ?? "-"}
                    </td>
                  </tr>

                  <tr
                    style={{ textAlign: "left", border: "unset" }}
                  >
                    <td
                      style={{
                        textAlign: "left",
                        width: "15%",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Status
                    </td>
                    <td
                      style={{
                        width: "5%",
                        textAlign: "right",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      :
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        fontSize: 18,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      {value?.indisipliner_status ?? "-"}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 80 }}>
              <table style={{ width: "100%", border: "unset" }}>
                <tbody>
                  <tr
                    style={{ textAlign: "left", border: "unset" }}
                  >
                    <td
                      style={{
                        width: "33%",
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Diketahui Oleh,
                    </td>
                    <td
                      style={{
                        width: "33%",
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Diperiksa Oleh,
                    </td>
                    <td
                      style={{
                        width: "33%",
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Dibuat Oleh,
                    </td>
                  </tr>
                  <tr
                    style={{ border: "unset", textAlign: "left" }}
                  >
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <img width="150px" src={"../assets/Surata.png"} />
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <img width="150px" src={"../assets/Yogi.png"} />
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <img width="150px" src={"../assets/Shoiful.png"} />
                    </td>
                  </tr>
                  <tr
                    style={{ border: "unset", textAlign: "left" }}
                  >
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <u>SURATA</u>
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <u>YOGI ADITYA WIDODO</u>
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <u>SHOIFUL ALIM</u>
                    </td>
                  </tr>
                  <tr
                    style={{ border: "unset", textAlign: "left" }}
                  >
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Project Manager RMIP
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Production Dept. Head
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Progdev Learning Academy
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div >
        </>
      )}
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
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

  const [tglEfektif, setTglEfektif] = React.useState(`01 ${items[0]?.bulan} ${items[0]?.tahun}`);
  const [tglEfektifString, setTglEfektifString] = React.useState();
  const [value, setValue] = React.useState();

  const date = (tanggal, tahun) => {
    if (tanggal === "Januari") {
      return { bulan: "01", tanggal: "31" }
    } else if (tanggal === "Februari") {
      return { bulan: "02", tanggal: Number(tahun) % 400 === 0 ? "29" : "28" }
    } else if (tanggal === "Maret") {
      return { bulan: "03", tanggal: "31" }
    } else if (tanggal === "April") {
      return { bulan: "04", tanggal: "30" }
    } else if (tanggal === "Mei") {
      return { bulan: "05", tanggal: "31" }
    } else if (tanggal === "Juni") {
      return { bulan: "06", tanggal: "30" }
    } else if (tanggal === "Juli") {
      return { bulan: "07", tanggal: "31" }
    } else if (tanggal === "Agustus") {
      return { bulan: "08", tanggal: "31" }
    } else if (tanggal === "September") {
      return { bulan: "09", tanggal: "30" }
    } else if (tanggal === "Oktober") {
      return { bulan: "10", tanggal: "31" }
    } else if (tanggal === "November") {
      return { bulan: "11", tanggal: "30" }
    } else if (tanggal === "Desember") {
      return { bulan: "12", tanggal: "31" }
    } else {
      return { bulan: "err", tanggal: "err" }
    }
  }

  useEffect(() => {
    let data = date(`${items[0]?.bulan}`, `${items[0]?.tahun}`)
    setTglEfektif(`${data.tanggal}-${data.bulan}-${items[0]?.tahun}`)
    setTglEfektifString(`${data.tanggal} ${items[0]?.bulan} ${items[0]?.tahun}`)
  }, [props])

  return (
    <>
      <div dividers>
        <Grid
          xs={12}
          md={6}
          sx={{ pb: 2, pt: 2 }}
        >
          <Typography sx={{ pb: 1, fontSize: 13 }}>
            Tanggal Efektif <span style={{ color: "red" }}>*Untuk Print MOR</span>
          </Typography>
          <form noValidate>
            <FormControl sx={{ width: '100%' }}>
              <OutlinedInput
                onChange={(e) => {
                  setTglEfektif(e.target.value)
                }}
                value={tglEfektif}
              />
            </FormControl>
          </form>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{ pb: 2, pt: 2 }}
        >
          <Typography sx={{ pb: 1, fontSize: 13 }}>
            Tanggal Efektif Tertulis <span style={{ color: "red" }}>*Untuk Print MOR</span>
          </Typography>
          <form noValidate>
            <FormControl sx={{ width: '100%' }}>
              <OutlinedInput
                onChange={(e) => {
                  setTglEfektifString(e.target.value)
                }}
                value={tglEfektifString}
              />
            </FormControl>
          </form>
        </Grid>
      </div>
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
                  <TableCell colSpan={2}
                    align='center'
                    sx={{ borderLeft: "1px solid" }}>
                    Tingkat Kehadiran (ATR)
                  </TableCell>
                  <TableCell colSpan={2}
                    align='center'
                    sx={{ borderLeft: "1px solid" }}>
                    Pencapaian Hours Meter
                  </TableCell>
                  <TableCell colSpan={2}
                    align='center'
                    sx={{ borderLeft: "1px solid" }}>
                    Pencapaian Produksi
                  </TableCell>
                  <TableCell colSpan={2}
                    align='center'
                    sx={{ borderLeft: "1px solid" }}>
                    HM x Pencapaian Produksi
                  </TableCell>
                  <TableCell colSpan={2}
                    align='center'
                    sx={{ borderLeft: "1px solid" }}>
                    Tingkat Keseringan Insiden
                  </TableCell>
                  <TableCell colSpan={2}
                    align='center'
                    sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>
                    Hazard Report
                  </TableCell>
                  <TableCell colSpan={2}
                    align='center'
                    sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>
                    Keseringan Insiden x Hazard Report
                  </TableCell>
                  <TableCell colSpan={1}
                    align='center'
                    sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>
                    Nilai Akhir
                  </TableCell>
                  <TableCell colSpan={1}
                    align='center'
                    sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>
                    Keterangan
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
                    Hasil
                  </TableCell>
                  <TableCell align='center'
                    sx={{ border: "1px solid" }}>
                    Nilai MOR
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
                    Hasil
                  </TableCell>
                  <TableCell align='center'
                    sx={{ border: "1px solid" }}>
                    Nilai MOR
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
                    Hasil
                  </TableCell>
                  <TableCell align='center'
                    sx={{ border: "1px solid" }}>
                    Nilai MOR
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
                    sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>

                  </TableCell>
                  <TableCell align='center'
                    sx={{ borderLeft: "1px solid", borderRight: "1px solid" }}>

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
                        {customer.hours_meter_hasil}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.hours_meter_nilai_mor}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.pencapaian_produksi_hasil}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.pencapaian_produksi_nilai_mor}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.hmxproduksi_hasil}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.hmxproduksi_nilai_mor}
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
                        {customer.hazard_report_hasil}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.hazard_report_nilai_mor}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.ifrxhazard_hasil}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.ifrxhazard_nilai_mor}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.total_nilai_akhir}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid", borderBottom: "0px solid" }}
                        align='center' >
                        {customer.total_keterangan.kategori}
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
            <PrintPdf value={value}
              tglEfektif={tglEfektif}
              tglEfektifString={tglEfektifString} />
          </Box>
        </Modal>
      </Card >
    </>

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
