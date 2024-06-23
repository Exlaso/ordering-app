cd ./apps

cd ./auth
prisma generate

cd ../billing
prisma generate

cd ../orders
prisma generate