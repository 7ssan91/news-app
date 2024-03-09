export const getDecodedToken = ({ state }: { state: any }) =>
  state.auth.decodedToken;
export const getIsLoginLoading = ({ state }: { state: any }) =>
  state.auth.isLoading;
export const getIsPending = ({ state }: { state: any }) =>
  Number(state.auth.decodedToken.organizationId) <= 0;
export const getIsVerified = ({ state }: { state: any }) =>
  state.auth.decodedToken?.verified === "True";
