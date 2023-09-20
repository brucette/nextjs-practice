import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

// in this object we have access to the models we have defined in our schema
// prisma cli regenerates it everytime we define or update our models so it is in sync
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// and methods for creating, deleting, updating users etc
// prisma.user...

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma