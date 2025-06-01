/**
 * @module shared.messages
 * @description
 * Centralized message map used for consistent error and success responses throughout the application.
 * 
 * Structure:
 * - Grouped by type: ERROR and SUCCESS
 * - Organized by domain: SHARED, MODULE, MIDDLEWARE, etc.
 * - Nested by functional areas: REPO, SERVICE, CONTROLLER
 * 
 * Usage Example:
 *   throw new AppError(MessageMap.ERROR.MODULE.USER.REPO.NOT_FOUND);
 *   res.json({ message: MessageMap.SUCCESS.MODULE.AUTH.LOGIN });
 * 
 * Benefits:
 * - Centralized and consistent messaging
 * - Easily maintainable and extendable
 * - Supports typed access with `as const`
 */
export const MessageMap = {
  ERROR: {
    SHARED: {
      TOKEN: {
        NO_SECRET: "jwt_secret_environment_variable_not_set",
        INVALID: "invalid_token",
      },
      PASSWORD: {
        NOT_UPDATE: "password_not_update",
        NOT_ENCRYPTED: "password_could_not_be_encrypted",
        COMPARISON_FAILED: "password_comparison_failed",
        NOT_EXIST: "user_password_not_found",
      },
    },
    MODULE: {
      DATABASE: "internal_error_database",

      LICENSE: {
        REPO: {
          NOT_FOUND: "license_not_found",
        },
        SERVICE: {
          ALREADY_EXISTS: "license_already_exists",
        },
      },

      PLAN: {
        REPO: {
          NOT_FOUND: "plan_not_found",
        },
        SERVICE: {
          ALREADY_EXISTS: "plan_already_exists",
        },
      },

      COMPANY: {
        REPO: {
          CREATE_CONFLICT: "company_documentId_already_in_use",
        },
        SERVICE: {
          ALREADY_EXISTS: "company_document_already_in_use",
        },
        NOT_FOUND: "company_not_found",
      },

      USER: {
        REPO: {
          NOT_FOUND: "user_not_found",
          CREATE_CONFLICT: "user_documentId_already_in_use",
        },
        SERVICE: {
          EMAIL_IN_USE: "user_email_already_in_use",
        },
      },

      REGISTER: {
        ALREADY: {
          COMPANY: "company_documentId_already_registered",
          USER: "user_email_already_registered",
        },
      },

      AUTH: {
        INVALID_CREDENTIALS: "email_password_incorrect",
        NOT_FOUND: "user_not_found",
      },
    },
    MIDDLEWARE: {
      AUTH: {
        UNAUTHORIZED: "invalid_or_inactive_user",
      },
      AUTHORIZE: {
        FORBIDDEN: "forbidden_access",
      },
      COMPANY: {
        INACTIVE: "company_inactive_or_not_found",
      },
    },
  },

  SUCCESS: {
    MODULE: {
      AUTH: {
        LOGIN: "logged_in_successfully",
      },
      COMPANY: {
        REPO: {
          REGISTER: "company_and_user_registered_successfully",
          SUSPEND: "company_suspend_with_sucess"
        },
      },
    },
    REPO: {
      PLAN: {
        REGISTER: "plan_registered_successfully",
      },
      REGISTER: "registered_successfully",
    },
    CONTROLLER: {
      COMPANY: {
        REGISTER: "company_and_user_registered_successfully",
      },
      AUTH: {
        LOGIN: "logged_in_successfully",
      },
    },
  },
} as const;
