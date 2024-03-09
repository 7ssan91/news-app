export const getLoginPageUrl = (locale: string): string => `/${locale}/login`;
export const getForgetPasswordPageUrl = (locale: string): string =>
  `/${locale}/forget-password`;
export const getResetPasswordPageUrl = (locale: string): string =>
  `/${locale}/reset-password`;
export const getVerifyPageUrl = (locale: string): string => `/${locale}/verify`;
export const getVerifyUserPageUrl = (locale: string): string =>
  `/${locale}/verify-email`;
export const getSuccessPageUrl = (locale: string): string =>
  `/${locale}/success`;
export const getHomePageUrl = (locale: string): string => `/${locale}/`;

// Invoices details page
export const getInvoiceDetailsById = ({
  locale,
  id,
}: {
  locale: string;
  id?: string;
}): string => {
  if (id) {
    return `/${locale}/invoice/${id}`;
  }
  return `/${locale}/invoice/:id`;
};

export const getReportsPageUrl = (locale: string): string =>
  `/${locale}/reports`;
export const getProfilePageUrl = (locale: string): string =>
  `/${locale}/profile`;
export const getAddBranchPageUrl = (locale: string): string =>
  `/${locale}/branch/add`;

export const getEditBranchPageUrl = ({
  locale,
  id,
}: {
  locale: string;
  id?: string;
}): string => {
  if (id) {
    return `/${locale}/branch/${id}/edit`;
  }
  return `/${locale}/branch/:id/edit`;
};

export const getAddVehiclePageUrl = (locale: string): string =>
  `/${locale}/vehicle/add`;

export const getEditVehiclePageUrl = ({
  locale,
  id,
}: {
  locale: string;
  id?: string;
}): string => {
  if (id) {
    return `/${locale}/vehicle/${id}/edit`;
  }
  return `/${locale}/vehicle/:id/edit`;
};

export const getAddUserPageUrl = (locale: string): string =>
  `/${locale}/user/add`;

export const getEditUserPageUrl = ({
  locale,
  id,
}: {
  locale: string;
  id?: string;
}): string => {
  if (id) {
    return `/${locale}/user/${id}/edit`;
  }
  return `/${locale}/user/:id/edit`;
};

export const getAddDriverPageUrl = (locale: string): string =>
  `/${locale}/driver/add`;

export const getEditDriverPageUrl = ({
  locale,
  id,
}: {
  locale: string;
  id?: string;
}): string => {
  if (id) {
    return `/${locale}/driver/${id}/edit`;
  }
  return `/${locale}/driver/:id/edit`;
};

export const getUserProfilePageUrl = ({
  locale,
  id,
}: {
  locale: string;
  id?: string;
}): string => {
  if (id) {
    return `/${locale}/user/${id}`;
  }
  return `/${locale}/user/:id`;
};

// Reports
export const getTotalSpendingReportPageUrl = (locale: string): string =>
  `/${locale}/reports/total-spending`;
