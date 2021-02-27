export default {
  password: {
    pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    minLength: 8,
    maxLength: 20,
  },
  username: {
    minLength: 4,
    maxLength: 20,
  },
};
