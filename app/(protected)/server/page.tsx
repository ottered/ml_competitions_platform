import { PrismaClient } from '@prisma/client';
import { UserInfo } from '@/components/user-info';
const prisma = new PrismaClient();

async function getAllItems() {
  const items = await prisma.user.findMany()
  return items.map(item => <UserInfo user={item} label="Сервер"/>)
}

const ServerPage = async () => {
    return (
        getAllItems()
    )
}

export default ServerPage;
