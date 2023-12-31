FROM    node AS builder
RUN     mkdir /my-app
WORKDIR /my-app
COPY    .  .
RUN     npm install
RUN     npm run build

FROM    nginx AS runtime
COPY    --from=builder /my-app/build/ /usr/share/nginx/html/
CMD     [ "nginx", "-g", "daemon off;" ]