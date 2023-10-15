require('dotenv').config();
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const helpers = require('./utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const path = require('path');

const exphbs = require('express-handlebars');

const app = express();




// Incorporate the custom helper methods
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'proccess.env.SECRET',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => console.log(`Now listening on port ${process.env.PORT}`));
});