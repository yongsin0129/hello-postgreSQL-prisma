import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient({ log: ['query'] })
const prisma = new PrismaClient()

async function main () {
  /********************************************************************************
  *
            create
  *
  *********************************************************************************/
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Alice'
  //   }
  // })

  // const users = await prisma.user.findMany()
  // console.log(users)

  // delete 指定資料庫之前會檢查有沒有其他的 table 欄位為 require 並且跟此資料庫有 relation
  await prisma.user.deleteMany()
  await prisma.userPreferences.deleteMany()
  const user = await prisma.user.create({
    data: {
      name: 'kyle',
      email: 'kyle@example.com',
      age: 27,
      UserPreferences: {
        create: {
          emailUpdates: true
        }
      }
    },
    include: {
      UserPreferences: true
    }
    // 可指定部份欄位
    // select:{
    //   name: true,
    //   UserPreferences: {select : { id : true }}
    // }
  })
  console.log(user)

  /********************************************************************************
  *
            create Many
  *
  *********************************************************************************/

  await prisma.user.deleteMany()
  await prisma.userPreferences.deleteMany()
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'kyle',
        email: 'kyle@example.com',
        age: 27
      },
      {
        name: 'sally',
        email: 'sally@example.com',
        age: 22
      }
    ]
  })
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
