-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "keyword" VARCHAR(100) NOT NULL,
    "status" VARCHAR(15) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
