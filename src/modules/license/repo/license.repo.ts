/**
 * LicenseRepository
 * 
 * Handles database operations related to predefined license definitions.
 * 
 * Methods:
 * - get(data: ILicenseGet): Promise<ILicenseGetDto>
 *   => Retrieves a license by its name from the companyLicense table.
 *   => Returns license metadata such as limits and permissions.
 *   => Throws an error if the license is not found or if a database error occurs.
 */

import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  ILicenseGet,
  ILicenseGetDto
} from "../interface/license.interface";
import { License } from "@prisma/client";

export class LicenseRepository {
  async get({ licenseName }: ILicenseGet): Promise<ILicenseGetDto> {
    try {
      const license = await database.companyLicense.findUnique({
        where: { name: licenseName as License },
        select: {
          id: true,
          name: true,
          description: true,
          canAccessOrders: true,
          maxUsers: true,
          maxMenus: true,
          maxItems: true,
          priceMonthly: true,
          apiAccess: true,
          createdAt: true
        }
      });

      if (!license) {
        throw new Error(MessageMap.ERROR.MODULE.LICENSE.REPO.NOT_LICENSE);
      };

      return { ...license }
    } catch (err) {
      throw new Error(MessageMap.ERROR.MODULE.DATABASE);
    }
  }
}