module.exports = {
  servers: {
    one: {
      host: '104.131.129.29',
      username: 'root',
      //password: 'password'
      pem: '~/.ssh/id_rsa'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'kuzu',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {/*
      serverOnly: true,*/
    },
    docker: {
      image: 'abernix/meteord:node-8.4.0-base'
    },
    env: {
      ROOT_URL: 'https://producer.kuzu.fm',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    ssl: {
       //pem: './producer.kuzu.fm.pem'
      crt: './producer.kuzu.fm.crt', // this is a bundle of certificates
      key: './producer.kuzu.fm.key', // this is the private key of the certificate
    },
    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
