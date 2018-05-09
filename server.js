const http = require('http');
const npm = require('npm-programmatic');
const port = 3000;

const requestHandler = (request, response) => {
    console.log(request.url)
    let filter = 'install/';
    let filterLength = filter.length;

    let installIndex = request.url.indexOf(filter);
    if (installIndex > -1) {
        let packageName = request.url.substr(installIndex + filterLength, request.url.length - (installIndex + filterLength));
        let successMsg = `Successfully installed ${packageName}`;
        let errorMsg = `Unable to install package ${packageName}`;

        npm.install([packageName], {
            cwd:'./',
            save:true
        })
        .then(function(){
            console.log(successMsg);
            response.end(successMsg);
        })
        .catch(function(){
            console.log(errorMsg);
            response.end(errorMsg);
        });
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})