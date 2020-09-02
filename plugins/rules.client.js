export default ({ app }, inject) => {
  inject('validationRules', {
    required: (value) => value != null || 'Required!',
    positiveInteger: (value) => value > 0 || 'Invalid!',
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid Email!'
    },
    phoneNumber: (value) => {
      const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
      return pattern.test(value) || 'Invalid PhoneNumber!'
    },
    name: (value) => {
      const pattern = /^[a-z ĂăÂâÎîȘșȚț,.'-]+$/i
      return pattern.test(value) || 'Invalid!'
    }
  })
}
