export const MessageMap = {
  ERROR: {
    SHARED: {
      TOKEN: {
        NO_SECRET: "jwt_secret_environment_variable_not_set",
        INVALID: "invalid_token"
      },
      PASSWORD: {
        NOT_UPDATE: "password_not_update",
        NOT_ENCRYPTED: "password_not_can_was_encripted",
        COMPARISON_FAILED: "password_comparison_failed",
        NOT_EXIST: "password_not_exist_in_your_user"
      }
    },
    MODULE: {
      DATABASE: "internal_error_database",
      LICENSE: {
        REPO: {
          NOT_LICENSE: "license_not_found"
        },
        SERVICE: {
          HAS: "already_has_created"
        }
      },
      PLAN: {
        REPO: {
          NOT_PLAN: "plan_not_found"
        },
        SERVICE: {
          HAS: "already_has_created"
        }
      },
      COMPANY: {
        REPO: {
          NOT_COMPANY: "company_not_found",
          CREATE: "documentId_already_in_use"
        },
        CONTROLLER: {
        }
      },
      USER: {
        REPO: {
          NOT_USER: "user_not_found",
          CREATE: "documentId_already_in_use"
        },
        CONTROLLER: {
        },
        SERVICE: {
          IN_USE: "email_already_in_use"
        }
      },
      REGISTER: {
        ALREADY: {
          COMPANY: "documentId_already_in_use",
          USER: "email_already_in_use"
        }
      },
      LOGIN: {
        INCORRECT: "email_password_incorrect",
      }
    },
    MIDDLEWARE: {
      AUTH: {
        UNAUTHORIZED: "Invalid_or_inactive_user"
      }
    }
  },
  SUCCESS: {
    MODULE: {
      COMPANY: {
        REPO: {
          REGISTER: "company_and_user_registred_with_sucess"
        }
      }
    },
    REPO: {
      PLAN: {
        REGISTER: "plan_registered_successfully",
      },
      REGISTER: "registered_successfully",
    },
    CONTROLLER: {
      COMPANY: {
        REGISTER: "company_and_user_registred_with_sucess"
      },
      USER: {
        LOGIN: "loged_with_success"
      }
    }
  }
} as const;
