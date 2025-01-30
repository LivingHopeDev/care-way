/*
  Warnings:

  - You are about to drop the column `appointmentTime` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `dayOfWeek` on the `availabilities` table. All the data in the column will be lost.
  - Added the required column `date` to the `availabilities` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "appointmentTime";

-- AlterTable
ALTER TABLE "availabilities" DROP COLUMN "dayOfWeek",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
