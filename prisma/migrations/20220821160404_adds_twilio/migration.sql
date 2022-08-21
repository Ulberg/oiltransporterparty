-- CreateTable
CREATE TABLE "WebOTP" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL DEFAULT (now() + '15 minutes'::interval),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebOTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebOTP_phone_password_key" ON "WebOTP"("phone", "password");
