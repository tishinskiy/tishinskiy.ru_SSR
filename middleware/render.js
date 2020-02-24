import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable';

// const App = Loadable({
// 	loader: () => import('../../app/src/App'),
// 	loading: () => <div>loading...</div>,
// })

import App from '../../app/src/App'

import path from "path"
import fs from "fs"
import manifest from '../../app/build/asset-manifest.json'

const indexPath = path.resolve(__dirname, '..', '..', 'app', 'build', 'index.html');

const extractAssets = (assets, chunks) => Object.keys(assets)
	.filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
	.map(k => assets[k]);

export default (req, res, next) => {

	fs.readFile(indexPath, 'utf8', (err, htmlData) => {
		if (err) {
			console.error('err', err);
			return res.status(404).end()
		}

		const modules = [];

		const html = ReactDOMServer.renderToString(
			<Loadable.Capture report={m => modules.push(m)}>
				<App/>
			</Loadable.Capture>
		);

		const extraChunks = extractAssets(manifest, modules)
			.map(c => `<script type="text/javascript" src="/${c}"></script>`);

		const js = extraChunks.join('')
		console.log(js);

		return res.send(
			htmlData
				.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
				// .replace('</body>', js + '</body>')
		)
	})

}