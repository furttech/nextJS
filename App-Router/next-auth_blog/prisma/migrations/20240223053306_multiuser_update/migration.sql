-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "postDate" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "FollowedAccount" (
    "id" TEXT NOT NULL,
    "f_AccountName" TEXT,
    "f_Date" DATE NOT NULL,
    "f_accountId" TEXT NOT NULL,
    "f_accountEmail" TEXT,
    "f_accountUserName" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FollowedAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedAccount" (
    "id" TEXT NOT NULL,
    "b_AccountName" TEXT,
    "b_Date" DATE NOT NULL,
    "b_accountId" TEXT NOT NULL,
    "b_accountEmail" TEXT,
    "b_accountUserName" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BlockedAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowedAccount_f_AccountName_key" ON "FollowedAccount"("f_AccountName");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedAccount_b_AccountName_key" ON "BlockedAccount"("b_AccountName");

-- AddForeignKey
ALTER TABLE "FollowedAccount" ADD CONSTRAINT "FollowedAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedAccount" ADD CONSTRAINT "BlockedAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
