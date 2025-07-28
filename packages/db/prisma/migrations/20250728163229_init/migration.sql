-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "keyword" VARCHAR(100) NOT NULL DEFAULT '',
    "status" VARCHAR(15) NOT NULL DEFAULT '',
    "phone" VARCHAR(20) NOT NULL DEFAULT '',
    "email" VARCHAR(50) NOT NULL DEFAULT '',
    "address" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
