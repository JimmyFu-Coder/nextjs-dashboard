const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  log: ['query'],
});

async function checkDatabaseConnection() {
  try {
    // 查看当前数据库名称
    const currentDb = await prisma.$queryRaw`SELECT current_database()`;
    console.log('当前数据库:', currentDb);
    
    // 查看当前用户
    const currentUser = await prisma.$queryRaw`SELECT current_user`;
    console.log('当前用户:', currentUser);
    
    // 查看数据库版本
    const version = await prisma.$queryRaw`SELECT version()`;
    console.log('数据库版本:', version);
    
    // 查看当前 schema
    const currentSchema = await prisma.$queryRaw`SELECT current_schema()`;
    console.log('当前 schema:', currentSchema);
    
    // 查看所有表
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('所有表:', tables);
    
    // 检查 revenue 表是否存在
    const revenueTable = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'revenue'
    `;
    console.log('Revenue表存在:', revenueTable);
    
  } catch (error) {
    console.error('查询失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseConnection();