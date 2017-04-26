FROM node:argon

RUN mkdir /app

# The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile. 
# WORKDIR /path/to/workdir
WORKDIR /app

# The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.
# COPY <src> <dest>
COPY package.json /app

RUN npm install

# The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.
# COPY <src> <dest>
COPY . /app

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime.
# EXPOSE 3000
# Didn't work, used docker run -p 3000:3000 instead

ENV MONGO_URI=mongodb://mongo:27017/prueba

# The main purpose of a CMD is to provide defaults for an executing container.
CMD ["npm", "start"]