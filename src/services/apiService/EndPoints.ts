//api end points
export const endPoints = {
  //test api
  getProducts: `products`,
  //dashboard
  getCompanyInfo: `app/Company/dashboard`,
  updateComapnyInfo: `app/Company`,
  //auth
  identity: {
    getLoginUser: `app/Identity/login`,
    registerUser: `app/Identity/register`,
    addCompanyAccount: `app/company`,
    forgetPassword: `app/Identity/forget-password`,
    resetPassword: `app/Identity/reset-password`,
    verifyToken: `app/Identity/verify`,
    sendEmailToVerify: `app/Identity/send-verification-email`,
  },
};
