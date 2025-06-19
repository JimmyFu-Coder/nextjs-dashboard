const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// 种子数据
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', // customers[0].id
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a', // customers[1].id
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', // customers[4].id
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2', // customers[3].id
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB', // customers[5].id
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a', // customers[2].id
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', // customers[0].id
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2', // customers[3].id
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', // customers[4].id
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB', // customers[5].id
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a', // customers[1].id
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB', // customers[5].id
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a', // customers[2].id
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

async function seedUsers() {
  console.log('🌱 正在种植用户数据...');
  
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: hashedPassword,
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }
  
  console.log(`✅ 创建了 ${users.length} 个用户`);
}

async function seedCustomers() {
  console.log('🌱 正在种植客户数据...');
  
  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: {
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
      },
      create: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
      },
    });
  }
  
  console.log(`✅ 创建了 ${customers.length} 个客户`);
}

async function seedRevenue() {
  console.log('🌱 正在种植收入数据...');
  
  for (const rev of revenue) {
    await prisma.revenue.upsert({
      where: { month: rev.month },
      update: {
        revenue: rev.revenue,
      },
      create: {
        month: rev.month,
        revenue: rev.revenue,
      },
    });
  }
  
  console.log(`✅ 创建了 ${revenue.length} 条收入记录`);
}

async function seedInvoices() {
  console.log('🌱 正在种植发票数据...');
  
  // 先删除现有的发票数据以避免重复
  await prisma.invoice.deleteMany({});
  
  for (const invoice of invoices) {
    await prisma.invoice.create({
      data: {
        customer_id: invoice.customer_id,
        amount: invoice.amount,
        status: invoice.status,
        date: new Date(invoice.date),
      },
    });
  }
  
  console.log(`✅ 创建了 ${invoices.length} 张发票`);
}

async function main() {
  console.log('🚀 开始数据库种子操作...\n');
  
  try {
    // 按照依赖关系的顺序执行 seed
    await seedUsers();
    await seedCustomers();
    await seedRevenue();
    await seedInvoices();
    
    console.log('\n🎉 数据库种子操作成功完成！');
  } catch (error) {
    console.error('❌ 种子操作失败:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 数据库连接已断开');
  });