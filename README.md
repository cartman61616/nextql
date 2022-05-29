# Next-QL 

Project using NextJS, Typescript, Postgres and Prisma following [this article](https://prisma.io/blog/fullstack-nextjs-graphql-prisma-oklidw1rhw)

The database is using postgres in a docker container. To start the database run `docker-compose up -d` in the root directory
To start the application run `npm run dev`

When running locally run `npx ngrok http 3000` to expose localhost then update auth0 with new url