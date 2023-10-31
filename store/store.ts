import { atom } from 'recoil';

export const userState = atom({
  key: 'user', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    createdAt: '',
    updatedAt: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: ''
  }, // default value (aka initial value)
});