-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "dailyWage" INTEGER,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "pincode" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "skill" TEXT,
ADD COLUMN     "state" TEXT;
