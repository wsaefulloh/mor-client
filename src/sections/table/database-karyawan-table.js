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

function PrintPdf({ value, tglEfektif, tglEfektifString }) {
  const { toPDF, targetRef } = usePDF({ filename: `${value.name}/${value.nrp} - ${value.bulan}/${value.tahun}.pdf` });
  const jumlahAkhir = (value.hazard_report_nilai_akhir + value.keseringan_insiden_nilai_akhir + value.productivity_individu_nilai_akhir + value.tingkat_kehadiran_nilai_akhir + value.hours_meter_nilai_akhir + value.disiplin_kerja_nilai_akhir).toFixed(2)
  const kategori = jumlahAkhir >= 0 && jumlahAkhir <= 1.99 ? "K" : jumlahAkhir >= 2.00 && jumlahAkhir <= 2.99 ? "C" : jumlahAkhir >= 3.00 && jumlahAkhir <= 3.99 ? "B" : jumlahAkhir >= 4.00 && jumlahAkhir <= 4.75 ? "BS" : jumlahAkhir >= 4.76 && jumlahAkhir <= 10 ? "IST" : "error"

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

  const addPencapaian = () => {
    let prev = pencapaianHourMeter
    let init = [{
      alatEquipment: "",
      periode: "",
      shift: "",
      hourMeter: ""
    }]
    prev = prev.concat(init)
    setPencapaianHourMeter(prev)
  }

  const deletePencapaian = (index) => {
    let prev = pencapaianHourMeter
    if (index > -1) {
      prev.splice(index, 1)
    }
    prev = prev.concat([])
    setPencapaianHourMeter(prev)
  }

  const addRencana = () => {
    let prev = rencanaTraining
    let init = [{
      tglBulan: "",
      JenisTraining: "",
    }]
    prev = prev.concat(init)
    setRencanaTraining(prev)
  }

  const deleteRencana = (index) => {
    let prev = rencanaTraining
    if (index > -1) {
      prev.splice(index, 1)
    }
    prev = prev.concat([])
    setRencanaTraining(prev)
  }

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
      ) : page === 2 ? (
        <>
          <button style={{ marginTop: '40px', marginLeft: '50px', width: "200px", padding: "10px" }}
            onClick={() => setPage(1)}>Previous</button>
          <button style={{ marginTop: '40px', marginLeft: '50px', width: "200px", padding: "10px" }}
            onClick={() => setPage(3)}>Next</button>
          <div style={{ width: "95%", display: "flex", justifyContent: "space-between", marginTop: '40px', marginLeft: '50px', }}>
            <div style={{ width: "100%", paddingRight: "20px" }}>
              <div style={{ marginBottom: "10px", fontWeight: "900" }}>List Pencapaian Hour Meter</div>
              {pencapaianHourMeter.map((e, index) => {
                return (
                  <>
                    <div style={{ border: "1px solid black", padding: "30px", marginBottom: "30px" }}>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 3 }}
                      >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                          Alat / Equipment
                        </Typography>
                        <form noValidate>
                          <FormControl sx={{ width: '100%' }}>
                            <OutlinedInput
                              onChange={(ev) => {
                                let pencapaian = pencapaianHourMeter.concat([])
                                pencapaian[index] = {
                                  ...e,
                                  alatEquipment: ev.target.value
                                }
                                setPencapaianHourMeter(pencapaian)
                              }}
                              value={pencapaianHourMeter[index].alatEquipment}
                            />
                          </FormControl>
                        </form>
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 3 }}
                      >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                          Periode
                        </Typography>
                        <form noValidate>
                          <FormControl sx={{ width: '100%' }}>
                            <OutlinedInput
                              onChange={(ev) => {
                                let pencapaian = pencapaianHourMeter.concat([])
                                pencapaian[index] = {
                                  ...e,
                                  periode: ev.target.value
                                }
                                setPencapaianHourMeter(pencapaian)
                              }}
                              value={pencapaianHourMeter[index].periode}
                            />
                          </FormControl>
                        </form>
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 3 }}
                      >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                          Shift
                        </Typography>
                        <form noValidate>
                          <FormControl sx={{ width: '100%' }}>
                            <OutlinedInput
                              onChange={(ev) => {
                                let pencapaian = pencapaianHourMeter.concat([])
                                pencapaian[index] = {
                                  ...e,
                                  shift: ev.target.value
                                }
                                setPencapaianHourMeter(pencapaian)
                              }}
                              value={pencapaianHourMeter[index].shift}
                            />
                          </FormControl>
                        </form>
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 3 }}
                      >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                          Hour Meter
                        </Typography>
                        <form noValidate>
                          <FormControl sx={{ width: '100%' }}>
                            <OutlinedInput
                              onChange={(ev) => {
                                let pencapaian = pencapaianHourMeter.concat([])
                                pencapaian[index] = {
                                  ...e,
                                  hourMeter: ev.target.value
                                }
                                setPencapaianHourMeter(pencapaian)
                              }}
                              value={pencapaianHourMeter[index].hourMeter}
                            />
                          </FormControl>
                        </form>
                      </Grid>
                      {pencapaianHourMeter.length > 1 ? (
                        <button style={{ marginRight: "30px", width: "200px", padding: "10px" }}
                          onClick={() => deletePencapaian(index)}>Delete</button>
                      ) : (
                        <></>
                      )}
                      <button style={{ width: "200px", padding: "10px" }}
                        onClick={() => addPencapaian()}>Add</button>
                    </div>

                  </>

                )
              })
              }
              <div style={{ marginBottom: "10px", fontWeight: "900" }}>Total Pencapaian Hour Meter</div>
              <div style={{ border: "1px solid black", padding: "30px", marginBottom: "30px" }}>
                <Grid
                  xs={12}
                  md={6}
                  sx={{ pb: 3 }}
                >
                  <Typography sx={{ pb: 1, fontSize: 13 }}>
                    Total Periode
                  </Typography>
                  <form noValidate>
                    <FormControl sx={{ width: '100%' }}>
                      <OutlinedInput
                        onChange={(ev) => {
                          let pencapaian = pencapaianHourMeterTotal
                          pencapaian = {
                            ...pencapaian,
                            periode: ev.target.value
                          }
                          setPencapaianHourMeterTotal(pencapaian)
                        }}
                        value={pencapaianHourMeterTotal.periode}
                      />
                    </FormControl>
                  </form>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  sx={{ pb: 3 }}
                >
                  <Typography sx={{ pb: 1, fontSize: 13 }}>
                    Total Shift
                  </Typography>
                  <form noValidate>
                    <FormControl sx={{ width: '100%' }}>
                      <OutlinedInput
                        onChange={(ev) => {
                          let pencapaian = pencapaianHourMeterTotal
                          pencapaian = {
                            ...pencapaian,
                            shift: ev.target.value
                          }
                          setPencapaianHourMeterTotal(pencapaian)
                        }}
                        value={pencapaianHourMeterTotal.shift}
                      />
                    </FormControl>
                  </form>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Typography sx={{ pb: 1, fontSize: 13 }}>
                    Total Hour Meter
                  </Typography>
                  <form noValidate>
                    <FormControl sx={{ width: '100%' }}>
                      <OutlinedInput
                        onChange={(ev) => {
                          let pencapaian = pencapaianHourMeterTotal
                          pencapaian = {
                            ...pencapaian,
                            hourMeter: ev.target.value
                          }
                          setPencapaianHourMeterTotal(pencapaian)
                        }}
                        value={pencapaianHourMeterTotal.hourMeter}
                      />
                    </FormControl>
                  </form>
                </Grid>
              </div>
            </div>
            <div style={{ width: "100%", paddingLeft: "20px" }}>
              <div style={{ marginBottom: "10px", fontWeight: "900" }}>List Rencana Training</div>
              {rencanaTraining.map((e, index) => {
                return (
                  <>
                    <div style={{ border: "1px solid black", padding: "30px", marginBottom: "30px" }}>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 3 }}
                      >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                          Jenis Training
                        </Typography>
                        <form noValidate>
                          <FormControl sx={{ width: '100%' }}>
                            <OutlinedInput
                              onChange={(ev) => {
                                let rencana = rencanaTraining.concat([])
                                rencana[index] = {
                                  ...e,
                                  JenisTraining: ev.target.value
                                }
                                setRencanaTraining(rencana)
                              }}
                              value={rencanaTraining[index].JenisTraining}
                            />
                          </FormControl>
                        </form>
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 3 }}
                      >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                          Tanggal / Bulan
                        </Typography>
                        <form noValidate>
                          <FormControl sx={{ width: '100%' }}>
                            <OutlinedInput
                              onChange={(ev) => {
                                let rencana = rencanaTraining.concat([])
                                rencana[index] = {
                                  ...e,
                                  tglBulan: ev.target.value
                                }
                                setRencanaTraining(rencana)
                              }}
                              value={rencanaTraining[index].tglBulan}
                            />
                          </FormControl>
                        </form>
                      </Grid>
                      {pencapaianHourMeter.length > 1 ? (
                        <button style={{ marginRight: "30px", width: "200px", padding: "10px" }}
                          onClick={() => deleteRencana(index)}>Delete</button>
                      ) : (
                        <></>
                      )}
                      <button style={{ width: "200px", padding: "10px" }}
                        onClick={() => addRencana()}>Add</button>
                    </div>
                  </>
                )
              })}


            </div>
          </div>
        </>
      ) : (
        <>
          <button style={{ marginTop: '40px', marginLeft: '50px', width: "200px", padding: "10px" }}
            onClick={() => setPage(2)}>Previous</button>
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
                        PERIODE BULAN
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
                        {`${value.bulan} ${value.tahun}`}
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
                  borderLeft: "1px solid black",
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
                    <th style={{ fontSize: 20, fontWeight: 900 }}>
                      TANGGAL PENILAIAN
                    </th>
                    <th
                      colSpan={2}
                      style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderBottom: "unset", borderTop: "unset" }}
                    >
                      PARAMETER PENILAIAN
                    </th>
                    <th style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderBottom: "unset", borderTop: "unset" }}>
                      BOBOT
                    </th>
                    <th colSpan={3}
                      style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderBottom: "unset", borderTop: "unset" }}>
                      SKOR
                    </th>
                    <th style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderBottom: "unset", borderTop: "unset" }}>
                      KATEGORI
                    </th>
                    <th style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderBottom: "unset", borderTop: "unset" }}>
                      KETERANGAN
                    </th>
                  </tr>
                  <tr
                    style={{
                      border: "unset",
                      textAlign: "left",
                      backgroundColor: "yellow"
                    }}
                  >
                    <td style={{ fontSize: 20, fontWeight: 900, borderBottom: "1px solid black" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderBottom: "1px solid black", borderLeft: "1px solid black" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderTop: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderTop: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset" }}>HASIL</td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset" }}>NILAI MOR</td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset" }}>NILAI</td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderTop: "unset" }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, border: "1px solid black", borderLeft: "unset", borderTop: "unset" }}></td>
                  </tr>
                  <tr>
                    <td
                      rowSpan={9}
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        border: "unset"
                      }}
                    >
                      <div style={{ transform: "rotate(270deg)" }}>{tglEfektifStringState}</div>
                    </td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>A.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      DISIPLIN
                    </td>
                    <td
                      colSpan={7}
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderRight: "1px solid black", borderBottom: "1px solid black"
                      }}
                    />
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>1.</td>
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
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>20%</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{`${value.tingkat_kehadiran_hasil} %`}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.tingkat_kehadiran_nilai_mor}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.tingkat_kehadiran_nilai_akhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.tingkat_kehadiran_kategori}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{keterangan(value.tingkat_kehadiran_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>2.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      Tepat Waktu dan Disiplin Kerja
                    </td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>10%</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.disiplin_kerja_nilai_mor}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.disiplin_kerja_nilai_mor}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.disiplin_kerja_nilai_akhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{value.disiplin_kerja_kategori}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{keterangan(value.disiplin_kerja_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>B.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderRight: "unset",
                        textAlign: "left", borderLeft: "1px solid black", borderBottom: "1px solid black",
                      }}
                    >
                      UPAYA PENCAPAIAN TERBAIK
                    </td>
                    <td
                      colSpan={7}
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "unset",
                        borderRight: "1px solid black", borderBottom: "1px solid black",
                      }}
                    />
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>1.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                        textAlign: "left"
                      }}
                    >
                      Pencapaian Hours Meter (HM)
                    </td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>20%</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.hours_meter_hasil}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.hours_meter_nilai_mor}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.hours_meter_nilai_akhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.hours_meter_kategori}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{keterangan(value.hours_meter_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>2.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderRight: "unset",
                        textAlign: "left", borderLeft: "1px solid black", borderBottom: "1px solid black",
                      }}
                    >
                      Pencapaian Produktifitas Individu
                    </td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>25%</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{`${value.productivity_individu_hasil} %`}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.productivity_individu_nilai_mor}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.productivity_individu_nilai_akhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.productivity_individu_kategori}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{keterangan(value.productivity_individu_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>C.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderRight: "unset",
                        textAlign: "left",
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                      }}
                    >
                      SAFETY AWARENESS
                    </td>
                    <td
                      colSpan={7}
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderLeft: "unset",
                        borderRight: "1px solid black", borderBottom: "1px solid black",
                      }}
                    />
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>1.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderRight: "unset",
                        textAlign: "left",
                        borderLeft: "1px solid black", borderBottom: "1px solid black",
                      }}
                    >
                      Tingkat Keseringan Insiden
                    </td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>20%</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.keseringan_insiden_hasil}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.keseringan_insiden_nilai_mor}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.keseringan_insiden_nilai_akhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", }}>{value.keseringan_insiden_kategori}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{keterangan(value.keseringan_insiden_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset" }}>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black" }}>2.</td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        borderRight: "unset",
                        textAlign: "left"
                        , borderLeft: "1px solid black",
                      }}
                    >
                      Hazard Report
                    </td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", }}>5%</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", }}>{value.hazard_report_hasil}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", }}>{value.hazard_report_nilai_mor}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", }}>{value.hazard_report_nilai_akhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", }}>{value.hazard_report_kategori}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderRight: "1px solid black", }}>{keterangan(value.hazard_report_kategori)}</td>
                  </tr>
                  <tr style={{ border: "unset", backgroundColor: "yellow" }}>
                    <td colSpan={3}
                      style={{ fontSize: 20, fontWeight: 900, borderLeft: "unset", borderRight: "unset", border: "1px solid black", }}>
                      Jumlah
                    </td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderTop: "1px solid black", }}>100%</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderTop: "1px solid black", }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderTop: "1px solid black", }}></td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderTop: "1px solid black", }}>{jumlahAkhir}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderTop: "1px solid black", }}>{kategori}</td>
                    <td style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderBottom: "1px solid black", borderTop: "1px solid black", borderRight: "1px solid black" }}>{keterangan(kategori)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ paddingTop: 80 }}>
              <div style={{ display: "flex" }}>
                <div style={{ width: "60%" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
                    PENCAPAIAN HOUR METER
                  </div>
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
                          textAlign: "left",
                          backgroundColor: "yellow"
                        }}
                      >
                        <th style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                          ALAT/EQUIPMENT
                        </th>
                        <th style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black" }}>PERIODE</th>
                        <th style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black" }}>SHIFT</th>
                        <th style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black", }}>HOUR METER</th>
                      </tr>
                      {pencapaianHourMeter.map((e) => {
                        return (
                          <>
                            <tr
                              style={{
                                border: "unset",
                                textAlign: "left"
                              }}
                            >
                              <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{e.alatEquipment}</td>
                              <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{e.periode}</td>
                              <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{e.shift}</td>
                              <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{e.hourMeter}</td>
                            </tr>
                          </>
                        )
                      })}
                      <tr
                        style={{
                          border: "unset",
                          textAlign: "left",
                          backgroundColor: "yellow"
                        }}
                      >
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>TOTAL</td>
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{pencapaianHourMeterTotal.periode}</td>
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{pencapaianHourMeterTotal.shift}</td>
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>{pencapaianHourMeterTotal.hourMeter}</td>
                      </tr>
                      {/* <tr
                        style={{
                          border: "unset",
                          textAlign: "left"
                        }}
                      >
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }} />
                      </tr>
                      <tr
                        style={{
                          border: "unset",
                          textAlign: "left"
                        }}
                      >
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }} />
                      </tr>
                      <tr
                        style={{
                          border: "unset",
                          textAlign: "left"
                        }}
                      >
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }} />
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                <div style={{ width: "5%" }} />
                <div style={{ width: "35%" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
                    RENCANA TRAINING
                  </div>
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
                          textAlign: "left",
                          backgroundColor: "yellow"
                        }}
                      >
                        <th style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black" }}>TGL/BULAN</th>
                        <th style={{ fontSize: 20, fontWeight: 900, borderLeft: "1px solid black", borderTop: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }}>
                          JENIS TRAINING
                        </th>
                      </tr>
                      {rencanaTraining.map((e) => {
                        return (
                          <>
                            <tr
                              style={{
                                border: "unset",
                                textAlign: "left"
                              }}
                            >
                              <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>{e.tglBulan}</td>
                              <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }} >{e.JenisTraining}</td>
                            </tr>
                          </>
                        )
                      })}

                      <tr
                        style={{
                          border: "unset",
                          textAlign: "left",
                          backgroundColor: "yellow"
                        }}
                      >
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }} />
                      </tr>
                      {/* <tr
                        style={{
                          border: "unset",
                          textAlign: "left"
                        }}
                      >
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black" }} />
                        <td style={{ fontSize: 20, fontWeight: 900, height: 40, borderLeft: "1px solid black", borderBottom: "1px solid black", borderRight: "1px solid black" }} />
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 120 }}>
              <table style={{ width: "100%", border: "unset" }}>
                <tbody>
                  <tr
                    style={{ textAlign: "left", border: "unset" }}
                  >
                    <td
                      style={{
                        width: "50%",
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Diketahui,
                    </td>
                    <td
                      style={{
                        width: "50%",
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Penilai,
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
                      <img width="150px" src={"../assets/Yogi Aditya Widodo.jpeg"} />
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <img width="150px" src={"../assets/Ali Zakaria.jpeg"} />
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
                      <u>Yogi Aditya Widodo</u>
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      <u>Ali Zakaria</u>
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
                      Production Dept. Head
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        height: 20,
                        border: "unset"
                      }}
                    >
                      Learning Academy Section Head
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
                    NILAI
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
                    NILAI
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
                    NILAI
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
                    NILAI
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
                    NILAI
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
                    NILAI
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
