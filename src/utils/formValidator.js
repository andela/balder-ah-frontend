export default {
  _required: value => (value && value.trim() ? undefined : 'This field is required'),
  _email: value => (value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? undefined
    : 'Invalid email address'),
};
