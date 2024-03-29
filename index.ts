import express, {json, Router} from 'express';
import 'express-async-errors';
import cors from 'cors';
import {handleError} from './utils/errors';
import {infoRouter} from "./routers/info-router";
import './utils/db';
import {mapRouter} from "./routers/map-router";
import {menuRouter} from "./routers/menu-router";
import {loginRouter} from "./routers/login-router";
import {registerRouter} from "./routers/register-router";

const app = express();

app.use(express.static('./public'));
app.use(json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

const router = Router();


app.use('/info', infoRouter);
app.use('/menu', menuRouter);
app.use('/map', mapRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// app.use('/api', router);

app.use(handleError);

app.listen(3001, 'localhost', () => {
    console.log(`Server listening on port: http://localhost:3001`);
});
