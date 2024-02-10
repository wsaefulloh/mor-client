import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = () => {
  let auth = localStorage.getItem("role")
  if (auth == "Karyawan") {
    return [{
      title: 'Account',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      )
    },]
  } else {
    return [
      {
        title: 'Account',
        path: '/account',
        icon: (
          <SvgIcon fontSize="small">
            <UserIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Tingkat Kehadiran (ATR)',
        path: '/tingkat-kehadiran',
        icon: (
          <SvgIcon fontSize="small">
            <ChartBarIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Disiplin Waktu dan Kerja',
        path: '/disiplin-waktu-dan-kerja',
        icon: (
          <SvgIcon fontSize="small">
            <UsersIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Pencapaian Hours Meter',
        path: '/hours-meter',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Productivity Individu',
        path: '/productivity-individu',
        icon: (
          <SvgIcon fontSize="small">
            <CogIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Tingkat Keseringan Insiden',
        path: '/tingkat-keseringan-insiden',
        icon: (
          <SvgIcon fontSize="small">
            <LockClosedIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Hazard Report',
        path: '/hazard-report',
        icon: (
          <SvgIcon fontSize="small">
            <ChartBarIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Karyawan Database',
        path: '/database-karyawan',
        icon: (
          <SvgIcon fontSize="small">
            <UserPlusIcon />
          </SvgIcon>
        )
      },
      // {
      //   title: 'All Report',
      //   path: '/companies',
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <ShoppingBagIcon />
      //     </SvgIcon>
      //   )
      // },

      // {
      //   title: 'Login',
      //   path: '/auth/login',
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <LockClosedIcon />
      //     </SvgIcon>
      //   )
      // },
      // {
      //   title: 'Register',
      //   path: '/auth/register',
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <UserPlusIcon />
      //     </SvgIcon>
      //   )
      // },
      // {
      //   title: 'Error',
      //   path: '/404',
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <XCircleIcon />
      //     </SvgIcon>
      //   )
      // }
    ]
  }
};
