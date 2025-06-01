/**
 * CompanyController
 *
 * Provides HTTP endpoints for company operations.
 *
 * @method create
 *   – Handles company registration requests.
 *
 * @method get
 *   – Handles company retrieval requests by document ID.
 *
 * @method update
 *   – Handles company update requests.
 *
 * @method suspend
 *   – Handles company suspension requests.
 */


import { create } from "./company.create.controller";
import { get } from "./company.get.controller";
import { suspend } from "./company.suspend.controller";
import { update } from "./company.update.controller";

export class CompanyController {
  create = create;
  get = get;
  update = update;
  suspend = suspend;
}

export const companyController = new CompanyController();