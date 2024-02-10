import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Unstable_Grid2 as Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs(props) {

    const {
        open = false,
        setOpen,
        nama,
        nrp,
        hasil,
        hasilMor,
        hasilAkhir,
        setHasil,
        confirm
    } = props;

    // const [newHasil, setNewHasil] = useState(hasil);
    // const [newHasilMor, setNewHasilMor] = useState("");
    // const [newHasilAkhir, setNewHasilAkhir] = useState("");

    // useEffect(() => {
    //     setNewHasil(hasil)
    //     setNewHasilAkhir(hasilAkhir)
    //     setNewHasilMor(hasilMor)
    // }, [hasil,
    //     hasilMor,
    //     hasilAkhir,])


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined"
                onClick={handleClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <DialogTitle sx={{ m: 0, p: 2, pr: 8 }}
                    id="customized-dialog-title">
                    Tingkat Kehadiran Karyawan
                </DialogTitle>
                {/* <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
x
                </IconButton> */}
                <DialogContent dividers>
                    <Typography sx={{ pb: 2 }} gutterBottom>
                        {nama} ({nrp})
                    </Typography>
                    <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 2 }}
                    >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                            Masukkan Hasil
                        </Typography>
                        <form noValidate>
                            <FormControl sx={{ width: '100%' }}>
                                <OutlinedInput onChange={(e) => {
                                    setHasil(e.target.value)
                                }}
                                    value={hasil} />
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 2 }}
                    >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                            Hasil Mor
                        </Typography>
                        <form noValidate>
                            <FormControl sx={{ width: '100%' }}>
                                <OutlinedInput disabled={true} value={hasilMor} />
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                        sx={{ pb: 2 }}
                    >
                        <Typography sx={{ pb: 1, fontSize: 13 }}>
                            Hasil Akhir
                        </Typography>
                        <form noValidate>
                            <FormControl sx={{ width: '100%' }}>
                                <OutlinedInput disabled={true} value={hasilAkhir} />
                            </FormControl>
                        </form>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus
                        disabled={
                            !hasil || hasilMor == "error" || hasilAkhir == "error"
                        }
                        onClick={() => {
                            confirm()
                            handleClose()
                        }}>
                        Simpan Perubahan
                    </Button>
                    <Button autoFocus
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                        onClick={handleClose}>
                        Batalkan Perubahan
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

CustomizedDialogs.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    nama: PropTypes.string,
    nrp: PropTypes.string,
    hasil: PropTypes.any,
    hasilMor: PropTypes.any,
    hasilAkhir: PropTypes.any,
    setHasil: PropTypes.any,
    confirm: PropTypes.any
};