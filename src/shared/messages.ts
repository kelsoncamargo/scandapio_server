/**
 * @module shared.messages
 * @description Centralized message map for consistent error and success responses.
 * Structure: Grouped by type (ERROR, SUCCESS), with reusable fragments for entities, actions, and states.
 * Usage: throw new AppError(MessageMap.ERROR.USER.NOT_FOUND);
 * Benefits: Compact, reusable, maintainable, type-safe with as const.
 */

const MessFrag = {
  ENTITIES: {
    COMPANY: "company",
    USER: "user",
    PLAN: "plan",
    LICENSE: "license",
    PASSWORD: "password",
    TOKEN: "token",
  },
  ACTIONS: {
    REGISTER: "registered",
    LOGIN: "logged_in",
    SUSPEND: "suspended",
    UPDATE: "updated",
    ENCRYPT: "encrypted",
    COMPARE: "compared",
    REMOVE: "removed"
  },
  STATES: {
    NOT_FOUND: "not_found",
    EXISTS: "already_exists",
    IN_USE: "in_use",
    INVALID: "invalid",
    INACTIVE: "inactive",
    FORBIDDEN: "forbidden",
    INCORRECT: "incorrect",
  },
} as const;

export const MessageMap = {
  ERROR: {
    DATABASE: "internal_error_database",
    TOKEN: {
      NO_SECRET: `${MessFrag.ENTITIES.TOKEN}_secret_not_set`,
      INVALID: `${MessFrag.ENTITIES.TOKEN}_${MessFrag.STATES.INVALID}`,
    },
    PASSWORD: {
      NOT_UPDATE: `${MessFrag.ENTITIES.PASSWORD}_not_${MessFrag.ACTIONS.UPDATE}`,
      NOT_ENCRYPTED: `${MessFrag.ENTITIES.PASSWORD}_not_${MessFrag.ACTIONS.ENCRYPT}`,
      COMPARISON_FAILED: `${MessFrag.ENTITIES.PASSWORD}_${MessFrag.ACTIONS.COMPARE}_failed`,
      NOT_FOUND: `${MessFrag.ENTITIES.PASSWORD}_${MessFrag.STATES.NOT_FOUND}`,
    },
    LICENSE: {
      NOT_FOUND: `${MessFrag.ENTITIES.LICENSE}_${MessFrag.STATES.NOT_FOUND}`,
      EXISTS: `${MessFrag.ENTITIES.LICENSE}_${MessFrag.STATES.EXISTS}`,
    },
    PLAN: {
      NOT_FOUND: `${MessFrag.ENTITIES.PLAN}_${MessFrag.STATES.NOT_FOUND}`,
      EXISTS: `${MessFrag.ENTITIES.PLAN}_${MessFrag.STATES.EXISTS}`,
    },
    COMPANY: {
      NOT_FOUND: `${MessFrag.ENTITIES.COMPANY}_${MessFrag.STATES.NOT_FOUND}`,
      IN_USE: `${MessFrag.ENTITIES.COMPANY}_document_${MessFrag.STATES.IN_USE}`,
      INACTIVE: `${MessFrag.ENTITIES.COMPANY}_${MessFrag.STATES.INACTIVE}_or_${MessFrag.STATES.NOT_FOUND}`,
      REGISTERED: `${MessFrag.ENTITIES.COMPANY}_document_already_${MessFrag.ACTIONS.REGISTER}`,
    },
    USER: {
      NOT_FOUND: `${MessFrag.ENTITIES.USER}_${MessFrag.STATES.NOT_FOUND}`,
      IN_USE: `${MessFrag.ENTITIES.USER}_email_${MessFrag.STATES.IN_USE}`,
      REGISTERED: `${MessFrag.ENTITIES.USER}_email_already_${MessFrag.ACTIONS.REGISTER}`,
      INVALID: `${MessFrag.ENTITIES.USER}_${MessFrag.STATES.INVALID}_or_${MessFrag.STATES.INACTIVE}`,
      REMOVE: `${MessFrag.ENTITIES.USER}_${MessFrag.ACTIONS.REMOVE}`
    },
    AUTH: {
      INVALID_CREDENTIALS: `email_${MessFrag.ENTITIES.PASSWORD}_${MessFrag.STATES.INCORRECT}`,
    },
    AUTHORIZE: {
      FORBIDDEN: `${MessFrag.STATES.FORBIDDEN}_access`,
    },
  },
  SUCCESS: {
    REGISTER: `${MessFrag.ACTIONS.REGISTER}_successfully`,
    LOGIN: `${MessFrag.ACTIONS.LOGIN}_successfully`,
    COMPANY: {
      REGISTER: `${MessFrag.ENTITIES.COMPANY}_and_${MessFrag.ENTITIES.USER}_${MessFrag.ACTIONS.REGISTER}_successfully`,
      SUSPEND: `${MessFrag.ENTITIES.COMPANY}_${MessFrag.ACTIONS.SUSPEND}_successfully`,
    },
    PLAN: {
      REGISTER: `${MessFrag.ENTITIES.PLAN}_${MessFrag.ACTIONS.REGISTER}_successfully`,
    },
    USER: {
      REMOVED: `${MessFrag.ENTITIES.USER}_${MessFrag.ACTIONS.REMOVE}`,
      SUSPEND: `${MessFrag.ENTITIES.USER}_${MessFrag.ACTIONS.SUSPEND}_successfully`,
    }
  },
} as const;