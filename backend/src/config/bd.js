const {PrismaClient} = require('@prisma/client')
const {PrismaPg} = require('@prisma/adapter-pg')

const adapter = new PrismaPg({connectionString:process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter})

async function connectDB() {

    try{
        await prisma.$connect()
        console.log('Base de datos conectada')
    }catch{
        console.error("Error: ",error)
        proccess.exit(1)
    }
    
}

module.exports={prisma, connectDB}