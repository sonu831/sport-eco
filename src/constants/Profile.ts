import phoneIcon from "../assets/images/phone.png";
import crownIcon from "../assets/images/crown.png";
import calendarIcon from "../assets/images/dob_calendar.png";
import emailIcon from "../assets/images/email.png";
import locationIcon from "../assets/images/location.png";

export const mockUser = {
  id: 1,
  Name: "Konstance Walworth",
  age: 32,
  phone: "428 594 1882",
  gender: "Female",
  email: "kwalworth0@guardian.co.uk",
  dob: "2022-08-22",
  city: "Palmas De Gran Canaria, Las",
  state: "Canarias",
  image: "http://dummyimage.com/128x100.png/cc0000/ffffff",
};

export const UserDetailsFields = (user: any) =>
  !!user.id
    ? [
        {
          title: "Phone",
          value: user.phNum,
          icon: phoneIcon,
        },
        {
          title: "E-Mail",
          value: user.email,
          icon: emailIcon,
        },
        {
          title: "Date of Birth",
          value: user.dob,
          icon: calendarIcon,
        },
        {
          title: "Gender",
          value: user.gender,
          icon: crownIcon,
        },
      ]
    : [];

export const locations = (user: any) =>
  user?.id
    ? [
        {
          value: `${user.city}, ${user.state}`,
          icon: locationIcon,
        },
      ]
    : [];
