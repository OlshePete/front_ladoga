FROM node:lts as dependencies
WORKDIR /next_landing_ladoga
COPY package.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /next_landing_ladoga
COPY . .
COPY --from=dependencies /next_landing_ladoga/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /next_landing_ladoga
ENV NODE_ENV production

COPY --from=builder /next_landing_ladoga/public ./public
COPY --from=builder /next_landing_ladoga/package.json ./package.json
COPY --from=builder /next_landing_ladoga/.next ./.next
COPY --from=builder /next_landing_ladoga/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]