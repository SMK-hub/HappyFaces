/* eslint-disable no-unused-vars */
// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilHome,
  UilCalendarAlt,
  UilCreditCard,
  UilSetting,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilHome,
    heading: "Dashboard",
    path: "/",
  },
  {
    icon: UilHome,
    heading: "Orphanages",
    path: "/orphanages",
  },
  {
    icon: UilUsersAlt,
    heading: "Donors",
  },
  {
    icon: UilCalendarAlt,
    heading: 'Events',
  },
  {
    icon: UilCreditCard,
    heading: 'Payments',
  },
  {
    icon: UilSetting,
    heading: 'Settings',
  }
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Orphanages",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 50,
    value: "59",
    png: UilHome,
    series: [
      {
        name: "Orphanage",
        data: [11, 22, 28, 51, 42, 47, 59],
      },
    ],
  },
  {
    title: "Donors",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 23,
    value: "40",
    png: UilUsersAlt,
    series: [
      {
        name: "Donors",
        data: [10, 15, 35, 70, 60, 25, 40],
      },
    ],
  },
  {
    title: "Donations",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 43,
    value: "97",
    png: UilCreditCard,
    series: [
      {
        name: "Donations",
        data: [10, 30, 50, 25, 33, 27, 97],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];

export const orphanagesData = [

  {
    name: "Orphanage 1",
    director: "Leo",
    establishedDate: "12-01-2022",
    location: "Marathalli",
    contact: "123-456-7890",
    images: [
      "https://th.bing.com/th/id/OIP.Gc2MgkiJTYmOBrv0HqpE1AHaFj?rs=1&pid=ImgDetMain",
    ],
  },

  {
    name: "Orphanage 2",
    director: "Vikram",
    establishedDate: "07-01-2023",
    location: "Tin Factory",
    contact: "123-456-4557",
    images: [
      "https://th.bing.com/th/id/OIP.Gc2MgkiJTYmOBrv0HqpE1AHaFj?rs=1&pid=ImgDetMain",
    ],
  },

  {
    name: "Orphanage 3",
    director: "Kaithi",
    establishedDate: "05-05-2020",
    location: "RR Nagar",
    contact: "723-456-1560",
    images: [
      "https://th.bing.com/th/id/OIP.Gc2MgkiJTYmOBrv0HqpE1AHaFj?rs=1&pid=ImgDetMain",
    ],
  },

  {
    name: "Orphanage 4",
    director: "Master",
    establishedDate: "11-07-2019",
    location: "Church Street",
    contact: "123-456-7890",
    images: [
      "https://th.bing.com/th/id/OIP.Gc2MgkiJTYmOBrv0HqpE1AHaFj?rs=1&pid=ImgDetMain",
    ],
  },

  {
    name: "Orphanage 5",
    director: "JD",
    establishedDate: "06-08-2022",
    location: "Lalbagh",
    contact: "223-656-7690",
    images: [
      "https://th.bing.com/th/id/OIP.Gc2MgkiJTYmOBrv0HqpE1AHaFj?rs=1&pid=ImgDetMain",
    ],
  },

];