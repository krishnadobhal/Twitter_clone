import {initServer} from './app'


async function init() {
    const app=await initServer();
    app.listen(process.env.PORT || 80);
} 

init()