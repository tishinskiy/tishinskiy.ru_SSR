import "@babel/polyfill";
import express from 'express';
import { PORT } from './config'
import bodyParser from 'body-parser';
import Loadable from 'react-loadable';
import compression from 'compression'
import path from "path"
import render from './middleware/render'
// import indexController from './controllers/index';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression())

app.use('/static',  express.static(path.resolve(__dirname, '..', 'app', 'build', 'static')))
app.get(/manifest/, express.static(path.resolve(__dirname, '..', 'app', 'build')));
app.get('/', async (req, res, next) => {

	// await indexController(req, res, next)
	await render(req, res, next)
})

Loadable.preloadAll().then(() => {
	app.listen(PORT, (error) => {

		if (error) {
			return console.log('Server bad happened', error);
		}

		console.log(`Server running on port ${ PORT }...`);
	});
});
