/**
 * LicenseService
 * 
 * Contains business logic for retrieving predefined license configurations.
 * 
 * Methods:
 * - get(data: ILicenseGet): Promise<ILicenseGetDto>
 *   => Retrieves license details by license name via LicenseRepository.
 *   => Returns information such as limits, features, and pricing.
 */

import {
  LicenseRepository
} from "../repo/license.repo";
import {
  ILicenseGet,
} from "../interface/license.interface";

export class LicenseService {
  private licenseRepository = new LicenseRepository();

  async get({
    licenseName
  }: ILicenseGet) {
    return await this.licenseRepository.get({ licenseName });
  }
}