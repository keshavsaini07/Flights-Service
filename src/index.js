const express = require('express');

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
// app.use('/flightService/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server successfully started on port : ${ServerConfig.PORT}`);
});

 