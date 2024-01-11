-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "status" TEXT,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
