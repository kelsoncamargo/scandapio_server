export const MessageMap = {
  ERROR: {
    TOKEN: {
      NO_SECRET: "jwt_secret_environment_variable_not_set",
      INVALID: "invalid_token"
    },
    REPO: {
      DATABASE: "internal_error_database",
      REGISTER: {
        ALREADY: {
          COMPANY: "documentId_already_in_use",
          USER: "email_already_in_use"

        }
      }
    }
  },
  SUCCESS: {
    REPO: {
      REGISTER: "registered_successfully"
    },
    CONTROLLER: {
      COMPANY: {
        REGISTER: "company_and_user_registred_with_sucess"
      }
    }
  }
} as const;
