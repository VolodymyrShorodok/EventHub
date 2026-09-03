DO $$
BEGIN
    IF to_regclass('"User"') IS NULL THEN
        CREATE TABLE "User" (
            "id" SERIAL NOT NULL,
            "email" TEXT NOT NULL,
            "password" TEXT NOT NULL,
            "firstName" TEXT NOT NULL,
            "lastName" TEXT NOT NULL,
            "phone" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT "User_pkey" PRIMARY KEY ("id")
        );
    ELSE
        ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "firstName" TEXT;
        ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastName" TEXT;
        ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;

        IF EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = current_schema()
              AND table_name = 'User'
              AND column_name = 'name'
        ) THEN
            UPDATE "User"
            SET
                "firstName" = COALESCE(NULLIF("firstName", ''), NULLIF("name", ''), split_part("email", '@', 1)),
                "lastName" = COALESCE(NULLIF("lastName", ''), 'User'),
                "phone" = COALESCE(NULLIF("phone", ''), 'Not provided');
            ALTER TABLE "User" DROP COLUMN "name";
        ELSE
            UPDATE "User"
            SET
                "firstName" = COALESCE(NULLIF("firstName", ''), split_part("email", '@', 1)),
                "lastName" = COALESCE(NULLIF("lastName", ''), 'User'),
                "phone" = COALESCE(NULLIF("phone", ''), 'Not provided');
        END IF;

        ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
        ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;
        ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;
    END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
