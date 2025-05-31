FROM public.ecr.aws/docker/library/node:20-alpine

# Install apk alpine
RUN apk --update --no-cache add curl tzdata nginx

# Set Timezone
RUN ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime

# Set Environment
ENV PATH /app/node_modules/.bin:$PATH

# Set Working Directory
WORKDIR /app

# Install package
COPY ./source/package.json .
RUN npm install --legacy-peer-deps

# Copy your files to container
COPY ./source .
COPY ./conf/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/nginx/default.conf /etc/nginx/conf.d/default.conf 

EXPOSE 3000