import { MongoClient } from 'mongodb';

const sourceUri = 'mongodb+srv://playeronline4076_db_user:3e6Kc6Ikodz6vXGs@cluster0.yau7gwg.mongodb.net/Quick_commerce?retryWrites=true&w=majority&appName=Cluster0';
const targetUri = 'mongodb+srv://prachi:7694900512@cluster0.nd3xlri.mongodb.net/Gobee?retryWrites=true&w=majority';

async function main() {
  const sourceClient = new MongoClient(sourceUri);
  await sourceClient.connect();
  const sourceDb = sourceClient.db('Quick_commerce');

  console.log('--- SOURCE DATABASE COLLECTIONS AND COUNTS ---');
  const sourceCollections = await sourceDb.listCollections().toArray();
  for (const c of sourceCollections) {
    const count = await sourceDb.collection(c.name).countDocuments();
    console.log(`${c.name}: ${count} documents`);
  }

  const targetClient = new MongoClient(targetUri);
  await targetClient.connect();
  const targetDb = targetClient.db('Gobee');

  console.log('\n--- TARGET DATABASE COLLECTIONS AND COUNTS ---');
  const targetCollections = await targetDb.listCollections().toArray();
  for (const c of targetCollections) {
    const count = await targetDb.collection(c.name).countDocuments();
    console.log(`${c.name}: ${count} documents`);
  }

  await sourceClient.close();
  await targetClient.close();
}

main().catch(console.error);
