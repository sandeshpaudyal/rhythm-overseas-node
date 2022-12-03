const customMessages = {
  // users
  ERROR_LISTING_USERS: "Error on listing users.",
  ERROR_FETCHING_USER_ID: "Error while fetching user with ID.",
  EMAIL_ALREADY_USED: "Email has already been taken.",
  ERROR_CREATING_USER: "Error while creating new user.",
  ERROR_SIGN_IN: "Invalid email or password.",
  NO_USER_FOUND: "No user found.",
  SUCCESS_USER_UPDATE: "User updated successfully.",
  FAILURE_USER_UPDATE: "User update failed.",
  INVALID_PASSWORD: "Invalid password.",
  SUCCESS_PASSWORD_UPDATE: "Password updated successfully.",
  FAILURE_PASSWORD_UPDATE: "Password update failed.",
  INVALID_EMAIL: "Invalid email.",
  FORGOT_PASSWORD_SUCCESS: "Password recovery email has been sent.",
  FORGOT_PASSWORD_FAILURE: "Password recovery failed.",
  INVALID_TOKEN: "Given token was not valid.",
  RESET_PASSWORD_FAILURE: "Password reset has failed.",
  RESET_PASSWORD_SUCCESS: "Password reset successfully.",

  // clients
  ERROR_LISTING_CLIENTS: "Error on listing clients.",
  ERROR_FETCHING_CLIENT_ID: "Error while fetching client with ID.",
  ERROR_CREATING_CLIENT: "Error while creating new client.",
  NO_CLIENT_FOUND: "No client found.",
  SUCCESS_CLIENT_UPDATE: "Client updated successfully.",
  FAILURE_CLIENT_UPDATE: "Client update failed.",

  // clients
  ERROR_LISTING_CANDIDATES: "Error on listing candidates.",
  ERROR_FETCHING_CANDIDATE_ID: "Error while fetching candidate with ID.",
  ERROR_CREATING_CANDIDATE: "Error while creating new candidate.",
  NO_CANDIDATE_FOUND: "No candidate found.",
  SUCCESS_CANDIDATE_UPDATE: "Candidate updated successfully.",
  FAILURE_CANDIDATE_UPDATE: "Candidate update failed.",

  // smtp
  SMTP_ERROR: "SMTP ERROR: unable to send email.",
  EMAIL_SUBJECT_RESET: "Reset-password",
  EMAIL_SUBJECT_RESET_SUCCESS: "Password Reset Successful",

  // email body
  EMAIL_BODY_RESET_SUCCESS:
    "Your email was successfully reset. Feel free to login and continue with your work.",
};

export default customMessages;
